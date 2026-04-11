from database import engine, SessionLocal
from models.game_stats import GameStats
from models.game import Game


def debug_db():
    print("🧠 ===== DATABASE DEBUG START =====")

    # 1. cek engine
    print("📦 DB URL:", engine.url)

    db = SessionLocal()

    # 2. cek games
    game_count = db.query(Game).count()
    print("🎮 Game count:", game_count)

    # 3. cek gamestats
    stats_count = db.query(GameStats).count()
    print("📊 GameStats count:", stats_count)

    # 4. sample data gamestats
    sample = db.query(GameStats).limit(3).all()

    print("🔍 SAMPLE DATA:")
    for s in sample:
        print({
            "appid": s.appid,
            "name": s.name,
            "positive": s.positive,
            "negative": s.negative,
            "review_count": s.review_count,
            "positive_ratio": s.positive_ratio
        })

    db.close()

    print("🏁 ===== DEBUG DONE =====")


if __name__ == "__main__":
    debug_db()