from database import SessionLocal
from models.game import Game
from models.game_stats import GameStats
from models.game_scores import GameScores

def run_scheduler_logic():
    db = SessionLocal()

    print("🔍 CHECKING PIPELINE STATE...")


    # =========================
    # 1. NEW GAME → ENRICH
    # =========================
    new_games = (
        db.query(Game)
        .outerjoin(GameStats, Game.appid == GameStats.appid)
        .filter(GameStats.appid == None)
        .limit(50)
        .all()
    )

    if new_games:
        print(f"🆕 FOUND {len(new_games)} NEW GAMES")

        from v2_pipeline.tasks.enrich_tasks import enrich_game_task

        for game in new_games:
            enrich_game_task.delay(game.appid)

        db.close()
        return "ENRICH"

    # =========================
    # 2. BACKLOG → SCORING
    # =========================
    backlog = (
        db.query(GameStats)
        .outerjoin(GameScores, GameStats.appid == GameScores.appid)
        .filter(GameScores.appid == None)
        .limit(50)
        .all()
    )

    if backlog:
        print(f"📊 FOUND {len(backlog)} NEED SCORING")

        from v2_pipeline.tasks.scoring_tasks import scoring_task

        for stat in backlog:
            scoring_task.delay(stat.appid)

        db.close()
        return "SCORING"

    print("✅ IDLE")
    db.close()
    return "IDLE"