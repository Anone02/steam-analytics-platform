from database import SessionLocal
from models.game_stats import GameStats
from models.game_scores import GameScores


def run_scoring_single(appid):
    db = SessionLocal()

    print(f"📊 SCORING GAME {appid}")

    stats = db.query(GameStats).filter(GameStats.appid == appid).first()

    if not stats:
        print("❌ NO STATS FOUND")
        db.close()
        return "NO STATS"

    existing = db.query(GameScores).filter(GameScores.appid == appid).first()
    if existing:
        print("⚠️ ALREADY SCORED")
        db.close()
        return "SKIPPED"

    # =========================
    # BASIC SCORING LOGIC
    # =========================

    positive_ratio = stats.positive_ratio or 0
    review_count = stats.review_count or 0
    avg_playtime = stats.avg_playtime or 0

    hidden_gem_score = positive_ratio * (1 / (review_count + 1))
    value_score = avg_playtime / 10 if avg_playtime else 0
    popularity_score = review_count
    toxic_score = 1 - positive_ratio

    score = GameScores(
        appid=appid,
        name=stats.name,
        hidden_gem_score=hidden_gem_score,
        value_score=value_score,
        toxic_score=toxic_score,
        popularity_score=popularity_score,
    )

    db.add(score)
    db.commit()

    print(f"✅ SCORED {appid}")

    db.close()
    return "SCORED"