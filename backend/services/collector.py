import requests
from database import SessionLocal
from models.game import Game

STEAMSPY = "https://steamspy.com/api.php"


def fetch_top():
    return requests.get(
        STEAMSPY,
        params={"request": "top100in2weeks"},
        timeout=30
    ).json()


def fetch_by_genre(genre, pages):
    results = {}

    for page in range(pages):
        res = requests.get(
            STEAMSPY,
            params={
                "request": "genre",
                "genre": genre,
                "page": page
            },
            timeout=30
        ).json()

        if res:
            results.update(res)

    return results


def is_real_game(game):
    name = (game.get("name") or "").lower()

    junk = [
        "server", "tool", "sdk", "soundtrack",
        "video", "demo", "dlc", "trailer"
    ]

    if any(j in name for j in junk):
        return False

    owners = game.get("owners") or ""
    if owners.startswith("0"):
        return False

    return True


def run_collector(max_games=30000, pages_per_genre=3):
    db = SessionLocal()

    all_games = {}

    # TOP
    all_games.update(fetch_top())

    # GENRES
    genres = ["action", "rpg", "indie", "simulation", "strategy"]

    for g in genres:
        data = fetch_by_genre(g, pages=pages_per_genre)
        all_games.update(data)

    print(f"RAW SIZE: {len(all_games)}")

    inserted = 0

    for appid, game in all_games.items():
        if inserted >= max_games:
            break

        try:
            appid = int(appid)
        except:
            continue

        if not is_real_game(game):
            continue

        exists = db.query(Game).filter(Game.appid == appid).first()

        if exists:
            continue

        db.add(Game(
            appid=appid,
            name=game.get("name"),
            type=game.get("genre", "game")
        ))

        inserted += 1

    db.commit()
    db.close()

    return inserted