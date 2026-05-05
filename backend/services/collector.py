import requests
from database import SessionLocal
from models.game import Game

STEAMSPY = "https://steamspy.com/api.php"


# =========================
# HTTP FETCH
# =========================
def fetch_json(params):
    try:
        res = requests.get(STEAMSPY, params=params, timeout=30)
        return res.json()
    except Exception as e:
        print(f"❌ Request failed: {e}")
        return {}


def fetch_top():
    return fetch_json({"request": "top100in2weeks"})


def fetch_by_genre(genre, pages):
    results = {}

    for page in range(pages):
        data = fetch_json({
            "request": "genre",
            "genre": genre,
            "page": page
        })

        if data:
            results.update(data)

    return results


# =========================
# FILTER
# =========================
def is_valid_game(game):
    name = (game.get("name") or "").lower()

    blacklist = ["demo", "dlc", "soundtrack", "trailer", "tool", "sdk"]

    if any(x in name for x in blacklist):
        return False

    owners = game.get("owners") or ""
    if owners.startswith("0"):
        return False

    return True


# =========================
# COLLECTOR
# =========================
def run_collector(max_games=50000, pages_per_genre=50):

    print("🚀 COLLECTOR START")

    db = SessionLocal()

    games = {}

    # 1. TOP GAMES
    print("🔥 fetching TOP...")
    games.update(fetch_top())

    # 2. GENRES
    genres = ["action", "rpg", "indie", "simulation", "strategy", "adventure", "casual", "horror", "sports", "racing"]

    for g in genres:
        print(f"📊 fetching {g}...")
        data = fetch_by_genre(g, pages_per_genre)
        games.update(data)

    print(f"📦 RAW SIZE: {len(games)}")

    # =========================
    # INSERT
    # =========================
    inserted = 0
    skipped = 0

    for appid, game in games.items():

        if inserted >= max_games:
            break

        try:
            appid = int(appid)
        except:
            skipped += 1
            continue

        if not is_valid_game(game):
            skipped += 1
            continue

        exists = db.query(Game).filter(Game.appid == appid).first()
        if exists:
            skipped += 1
            continue

        db.add(Game(
            appid=appid,
            name=game.get("name"),
            type=game.get("genre", "game")
        ))

        inserted += 1

    db.commit()
    db.close()

    print("🏁 COLLECTOR DONE")
    print(f"📦 INSERTED: {inserted}")
    print(f"❌ SKIPPED: {skipped}")

    return inserted


# =========================
# ENTRY POINT
# =========================
if __name__ == "__main__":
    run_collector()