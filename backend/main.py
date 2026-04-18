from fastapi import FastAPI
from database import SessionLocal

from models.game import Game
from models.game_stats import GameStats
from models.game_scores import GameScores

from fastapi.middleware.cors import CORSMiddleware
import math

app = FastAPI(title="Steam Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# HELPERS
# =========================

def serialize(obj):
    if not obj:
        return None
    data = obj.__dict__.copy()
    data.pop("_sa_instance_state", None)
    return data


# 🔥 LOG NORMALIZATION
def normalize_log(score, min_val, max_val):
    if score is None or score <= 0:
        return 0

    score_log = math.log(score)
    min_log = math.log(min_val) if min_val > 0 else 0
    max_log = math.log(max_val) if max_val > 0 else 1

    if max_log == min_log:
        return 0

    return (score_log - min_log) / (max_log - min_log) * 100


# ambil min max global
def get_min_max(db):
    all_scores = db.query(GameScores).all()

    return {
        "hidden": (
            min(s.hidden_gem_score or 0 for s in all_scores),
            max(s.hidden_gem_score or 0 for s in all_scores),
        ),
        "value": (
            min(s.value_score or 0 for s in all_scores),
            max(s.value_score or 0 for s in all_scores),
        ),
        "toxic": (
            min(s.toxic_score or 0 for s in all_scores),
            max(s.toxic_score or 0 for s in all_scores),
        ),
        "popular": (
            min(s.popularity_score or 0 for s in all_scores),
            max(s.popularity_score or 0 for s in all_scores),
        ),
    }


# =========================
# BASIC DATA
# =========================

@app.get("/games")
def get_games(limit: int = 50):
    db = SessionLocal()
    try:
        limit = min(limit, 100)
        data = db.query(Game).limit(limit).all()

        return {
            "count": len(data),
            "data": [serialize(g) for g in data]
        }
    finally:
        db.close()


# 🔥 FIX UTAMA DI SINI
@app.get("/games/{appid}")
def get_game(appid: int):
    db = SessionLocal()

    game = db.query(Game).filter(Game.appid == appid).first()
    stats = db.query(GameStats).filter(GameStats.appid == appid).first()
    score = db.query(GameScores).filter(GameScores.appid == appid).first()

    # ambil min max global
    minmax = get_min_max(db)

    db.close()

    if not score:
        return {
            "game": serialize(game),
            "stats": serialize(stats),
            "score": None
        }

    # 🔥 NORMALIZED SCORE (INI YANG FIX N/A)
    normalized_score = {
        "hidden_gem_score": round(
            normalize_log(score.hidden_gem_score or 0, *minmax["hidden"]), 1
        ),
        "value_score": round(
            normalize_log(score.value_score or 0, *minmax["value"]), 1
        ),
        "toxic_score": round(
            normalize_log(score.toxic_score or 0, *minmax["toxic"]), 1
        ),
        "popularity_score": round(
            normalize_log(score.popularity_score or 0, *minmax["popular"]), 1
        ),
    }

    return {
        "game": serialize(game),
        "stats": serialize(stats),
        "score": normalized_score
    }


# =========================
# SCORES
# =========================

@app.get("/scores")
def get_scores(type: str = "hidden", limit: int = 50):
    db = SessionLocal()

    query = db.query(GameScores, Game)\
        .join(Game, Game.appid == GameScores.appid)

    if type == "hidden":
        query = query.order_by(GameScores.hidden_gem_score.desc())
    elif type == "value":
        query = query.order_by(GameScores.value_score.desc())
    elif type == "toxic":
        query = query.order_by(GameScores.toxic_score.desc())
    elif type == "popular":
        query = query.order_by(GameScores.popularity_score.desc())

    data = query.limit(limit).all()

    minmax = get_min_max(db)

    db.close()

    result = []

    for score, game in data:
        result.append({
            "appid": game.appid,
            "name": game.name,

            "hidden_gem_score": round(
                normalize_log(score.hidden_gem_score or 0, *minmax["hidden"]), 1
            ),
            "value_score": round(
                normalize_log(score.value_score or 0, *minmax["value"]), 1
            ),
            "toxic_score": round(
                normalize_log(score.toxic_score or 0, *minmax["toxic"]), 1
            ),
            "popularity_score": round(
                normalize_log(score.popularity_score or 0, *minmax["popular"]), 1
            )
        })

    return result


# =========================
# SEARCH
# =========================

@app.get("/search")
def search_game(q: str):
    db = SessionLocal()

    data = db.query(Game)\
        .filter(Game.name.ilike(f"%{q}%"))\
        .limit(20)\
        .all()

    db.close()

    return [serialize(g) for g in data]


# =========================
# SUMMARY
# =========================

@app.get("/summary")
def summary():
    db = SessionLocal()

    total_games = db.query(Game).count()
    total_stats = db.query(GameStats).count()
    total_scores = db.query(GameScores).count()

    top_hidden = db.query(GameScores)\
        .order_by(GameScores.hidden_gem_score.desc())\
        .first()

    most_toxic = db.query(GameScores)\
        .order_by(GameScores.toxic_score.desc())\
        .first()

    most_popular = db.query(GameScores)\
        .order_by(GameScores.popularity_score.desc())\
        .first()

    best_value = db.query(GameScores)\
        .order_by(GameScores.value_score.desc())\
        .first()

    minmax = get_min_max(db)

    db.close()

    return {
        "total_games": total_games,
        "total_stats": total_stats,
        "total_scores": total_scores,

        "top_hidden_gem": {
            **serialize(top_hidden),
            "hidden_gem_score": round(
                normalize_log(top_hidden.hidden_gem_score or 0, *minmax["hidden"]), 1
            )
        },

        "most_toxic_game": {
            **serialize(most_toxic),
            "toxic_score": round(
                normalize_log(most_toxic.toxic_score or 0, *minmax["toxic"]), 1
            )
        },

        "most_popular_game": {
            **serialize(most_popular),
            "popularity_score": round(
                normalize_log(most_popular.popularity_score or 0, *minmax["popular"]), 1
            )
        },

        "best_value_game": {
            **serialize(best_value),
            "value_score": round(
                normalize_log(best_value.value_score or 0, *minmax["value"]), 1
            )
        }
    }