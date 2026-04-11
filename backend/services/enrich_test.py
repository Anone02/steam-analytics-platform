import requests
from database import SessionLocal
from models.game import Game
from models.game_stats import GameStats

STEAMSPY = "https://steamspy.com/api.php"


def safe_int(v):
    try:
        return int(v)
    except:
        return 0


def run_enrich_test(limit=5):
    db = SessionLocal()

    games = db.query(Game).limit(limit).all()

    print("🧪 TEST ENRICH START")
    print("🎮 GAMES:", len(games))

    inserted = 0

    for g in games:

        print(f"\n👉 TEST GAME {g.appid} | {g.name}")

        try:
            res = requests.get(
                STEAMSPY,
                params={
                    "request": "appdetails",
                    "appid": g.appid
                },
                timeout=10
            )

            print("📡 STATUS:", res.status_code)

            data = res.json()

            print("📦 RESPONSE KEYS:", list(data.keys())[:5])

            positive = safe_int(data.get("positive"))
            negative = safe_int(data.get("negative"))

            total = positive + negative
            ratio = (positive / total) if total > 0 else 0

            stats = GameStats(
                appid=g.appid,
                name=data.get("name", g.name),
                price=0,
                genres=data.get("genre", "unknown"),
                owners=data.get("owners", "0"),
                avg_playtime=data.get("average_forever", 0),
                positive=positive,
                negative=negative,
                review_count=total,
                positive_ratio=ratio
            )

            db.add(stats)
            db.flush()  # 🔥 langsung test insert

            print("💾 INSERT OK:", g.appid)

            inserted += 1

        except Exception as e:
            print("💥 ERROR:", e)

    print("\n💾 COMMITTING...")
    db.commit()

    total = db.query(GameStats).count()
    print("📊 TOTAL GAME_STATS:", total)

    db.close()

    print("\n🏁 TEST DONE")
    print("✅ INSERTED:", inserted)


if __name__ == "__main__":
    run_enrich_test(5)