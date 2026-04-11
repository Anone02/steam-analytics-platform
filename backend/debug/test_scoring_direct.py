from database import SessionLocal
from models.game_stats import GameStats
from models.game_scores import GameScores


def test_scoring(limit=10):

    db = SessionLocal()

    print("\n🧪 ===== DIRECT SCORING TEST =====")

    stats = db.query(GameStats).limit(limit).all()

    print("📦 GameStats found:", len(stats))

    inserted = 0

    for s in stats:

        print("\n👉 TEST:", s.appid, s.name)

        positive = s.positive or 0
        negative = s.negative or 0
        review_count = positive + negative

        print("RAW:")
        print("positive:", positive)
        print("negative:", negative)

        exists = db.query(GameScores).filter_by(appid=s.appid).first()

        if exists:
            print("⏭️ already exists")
            continue

        score = GameScores(
            appid=s.appid,
            name=s.name,
            hidden_gem_score=(s.positive_ratio or 0) * 100,
            value_score=review_count / 1000,
            toxic_score=negative,
            popularity_score=review_count
        )

        db.add(score)
        inserted += 1

        print("✅ inserted into session")

    db.commit()

    total = db.query(GameScores).count()

    db.close()

    print("\n🏁 DONE")
    print("INSERTED:", inserted)
    print("TOTAL GameScores:", total)


if __name__ == "__main__":
    test_scoring(10)