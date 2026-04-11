from database import SessionLocal
from models.game_stats import GameStats
from models.game_scores import GameScores


def score(stats):
    hidden = (stats.positive_ratio or 0) * 100 - (stats.negative or 0) / 1000
    value = (stats.avg_playtime or 1) / max(stats.price or 1, 1)
    toxic = (stats.negative or 0) / max(stats.positive or 1, 1)
    pop = stats.positive or 0

    return hidden, value, toxic, pop


def run_scoring(limit=200):
    db = SessionLocal()

    stats = db.query(GameStats).limit(limit).all()

    count = 0

    for s in stats:
        h, v, t, p = score(s)

        existing = db.query(GameScores).filter(GameScores.appid == s.appid).first()

        if existing:
            existing.name = s.name
            existing.hidden_gem_score = h
            existing.value_score = v
            existing.toxic_score = t
            existing.popularity_score = p
        else:
            db.add(GameScores(
                appid=s.appid,
                name=s.name,
                hidden_gem_score=h,
                value_score=v,
                toxic_score=t,
                popularity_score=p
            ))

        count += 1

    db.commit()
    db.close()

    return count