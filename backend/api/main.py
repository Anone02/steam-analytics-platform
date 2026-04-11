from fastapi import FastAPI
from database import SessionLocal

from models.game import Game
from models.game_stats import GameStats
from models.game_scores import GameScores

app = FastAPI(title="Steam Analytics API")


# =========================
# BASIC DATA
# =========================

@app.get("/games")
def get_games(limit: int = 50):
    db = SessionLocal()
    data = db.query(Game).limit(limit).all()
    db.close()
    return data


@app.get("/games/{appid}")
def get_game(appid: int):
    db = SessionLocal()

    game = db.query(Game).filter(Game.appid == appid).first()
    stats = db.query(GameStats).filter(GameStats.appid == appid).first()
    score = db.query(GameScores).filter(GameScores.appid == appid).first()

    db.close()

    return {
        "game": game,
        "stats": stats,
        "score": score
    }


# =========================
# SCORES (WOW PART)
# =========================

@app.get("/scores/top")
def top_scores(limit: int = 50):
    db = SessionLocal()

    data = db.query(GameScores)\
        .order_by(GameScores.hidden_gem_score.desc())\
        .limit(limit)\
        .all()

    db.close()
    return data


@app.get("/scores/hidden-gems")
def hidden_gems(limit: int = 50):
    db = SessionLocal()

    data = db.query(GameScores)\
        .order_by(GameScores.hidden_gem_score.desc())\
        .limit(limit)\
        .all()

    db.close()
    return data


@app.get("/scores/value")
def value_games(limit: int = 50):
    db = SessionLocal()

    data = db.query(GameScores)\
        .order_by(GameScores.value_score.desc())\
        .limit(limit)\
        .all()

    db.close()
    return data


@app.get("/scores/toxic")
def toxic_games(limit: int = 50):
    db = SessionLocal()

    data = db.query(GameScores)\
        .order_by(GameScores.toxic_score.desc())\
        .limit(limit)\
        .all()

    db.close()
    return data


# =========================
# SEARCH (BIAR PRO)
# =========================

@app.get("/search")
def search_game(q: str):
    db = SessionLocal()

    data = db.query(Game)\
        .filter(Game.name.ilike(f"%{q}%"))\
        .limit(20)\
        .all()

    db.close()
    return data


# =========================
# SUMMARY DASHBOARD (WOW MOMENT)
# =========================

@app.get("/summary")
def summary():
    db = SessionLocal()

    total_games = db.query(Game).count()
    total_stats = db.query(GameStats).count()
    total_scores = db.query(GameScores).count()

    top_game = db.query(GameScores)\
        .order_by(GameScores.hidden_gem_score.desc())\
        .first()

    db.close()

    return {
        "total_games": total_games,
        "total_stats": total_stats,
        "total_scores": total_scores,
        "top_hidden_gem": top_game
    }