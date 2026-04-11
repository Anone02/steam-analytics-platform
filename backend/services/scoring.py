from database import SessionLocal
from models.game_stats import GameStats
from models.game_scores import GameScores


def run_scoring(limit=500):

    db = SessionLocal()

    print("📊 SCORING START | LIMIT:", limit)

    stats = db.query(GameStats).limit(limit).all()

    print("📦 GAMESTATS FOUND:", len(stats))

    inserted = 0

    for s in stats:

        print(f"👉 SCORING {s.appid} | {s.name}")

        # SAFE COMPUTE (NO NULL DEPENDENCY)
        positive = s.positive or 0
        negative = s.negative or 0
        review_count = positive + negative

        exists = db.query(GameScores).filter_by(appid=s.appid).first()

        if exists:
            print("⏭️ ALREADY EXISTS")
            continue

        hidden = (s.positive_ratio or 0) * 100
        value = review_count / 1000
        toxic = negative
        popularity = review_count

        db.add(GameScores(
            appid=s.appid,
            name=s.name,
            hidden_gem_score=hidden,
            value_score=value,
            toxic_score=toxic,
            popularity_score=popularity
        ))

        inserted += 1

        if inserted % 25 == 0:
            db.commit()
            print("💾 BATCH COMMIT")

    db.commit()
    db.close()

    print("🏁 SCORING DONE | inserted =", inserted)

    return inserted