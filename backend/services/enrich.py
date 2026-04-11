import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from database import SessionLocal
from models.game import Game
from models.game_stats import GameStats

STEAM_STORE = "https://store.steampowered.com/api/appdetails"
STEAM_REVIEWS = "https://store.steampowered.com/appreviews/{}"
STEAMSPY = "https://steamspy.com/api.php"


# =========================
# SAFE REQUEST WRAPPER
# =========================
def safe_get(url, params=None, timeout=10):
    try:
        res = requests.get(url, params=params, timeout=timeout)
        if res.status_code != 200:
            return None
        return res.json()
    except:
        return None


# =========================
# ENRICH SINGLE GAME
# =========================
def enrich_game(appid, name):
    store_raw = safe_get(STEAM_STORE, {"appids": appid})
    store = (store_raw or {}).get(str(appid), {}).get("data") or {}

    spy = safe_get(STEAMSPY, {"request": "appdetails", "appid": appid}) or {}

    reviews_raw = safe_get(STEAM_REVIEWS.format(appid), {"json": 1}) or {}
    qs = reviews_raw.get("query_summary") or {}

    return {
        "appid": appid,
        "name": name,

        "price": store.get("price_overview", {}).get("final", 0),
        "genres": ",".join([g["description"] for g in store.get("genres", [])]) if store else "",

        "owners": spy.get("owners"),
        "avg_playtime": spy.get("average_forever"),
        "positive": spy.get("positive"),
        "negative": spy.get("negative"),

        "review_count": qs.get("total_reviews", 0),
        "positive_ratio": qs.get("total_positive", 0) / max(qs.get("total_reviews", 1), 1)
    }


# =========================
# WORKER FUNCTION (THREAD)
# =========================
def process_game(game):
    try:
        return enrich_game(game.appid, game.name)
    except:
        return None


# =========================
# MAIN FAST ENRICH
# =========================
def run_enrichment(limit=200, workers=10):
    db = SessionLocal()

    games = db.query(Game).limit(limit).all()

    results = []
    success = 0

    # =========================
    # THREAD POOL (FAST MODE)
    # =========================
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = [executor.submit(process_game, g) for g in games]

        for f in as_completed(futures):
            data = f.result()
            if not data:
                continue

            results.append(data)
            success += 1

    # =========================
    # UPSERT DB
    # =========================
    for data in results:
        existing = db.query(GameStats).filter(GameStats.appid == data["appid"]).first()

        if existing:
            for k, v in data.items():
                setattr(existing, k, v)
        else:
            db.add(GameStats(**data))

    db.commit()
    db.close()

    print(f"🔥 FAST ENRICH DONE | processed={success}")
    return success