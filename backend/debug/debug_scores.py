from database import SessionLocal
from models.game_scores import GameScores


def debug_scores():
    db = SessionLocal()

    print("\n🧠 ===== DEBUG GAME SCORES =====")

    count = db.query(GameScores).count()
    print("📊 GameScores count:", count)

    sample = db.query(GameScores).limit(5).all()

    print("\n🔍 SAMPLE DATA:")

    for s in sample:
        print(
            s.appid,
            s.name,
            s.hidden_gem_score,
            s.value_score,
            s.toxic_score,
            s.popularity_score
        )


if __name__ == "__main__":
    debug_scores()