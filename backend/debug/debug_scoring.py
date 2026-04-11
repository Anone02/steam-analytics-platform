from database import SessionLocal
from models.game_stats import GameStats
from models.game_scores import GameScores


def debug_scoring(limit=10):
    db = SessionLocal()

    print("\n🧠 ===== DEBUG SCORING START =====")

    stats = db.query(GameStats).limit(limit).all()

    print("📦 GameStats found:", len(stats))

    for s in stats:
        print("\n👉", s.appid, s.name)


if __name__ == "__main__":
    debug_scoring()