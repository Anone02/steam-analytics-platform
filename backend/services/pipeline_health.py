from database import SessionLocal
from models.game import Game
from models.game_stats import GameStats
from models.game_scores import GameScores


def run_pipeline_health():
    db = SessionLocal()

    try:
        game_count = db.query(Game).count()
        stats_count = db.query(GameStats).count()
        scores_count = db.query(GameScores).count()

        print("\n🧠 PIPELINE HEALTH CHECK")
        print("=" * 40)

        print(f"🎮 Games       : {game_count}")
        print(f"📊 GameStats   : {stats_count}")
        print(f"🏆 GameScores  : {scores_count}")

        # --------------------------
        # ANALISIS LOGIC
        # --------------------------

        if game_count == 0:
            print("\n❌ COLLECTOR BELUM JALAN")
            return

        if stats_count == 0:
            print("\n❌ ENRICH BELUM JALAN / GAGAL")
            return

        if scores_count == 0:
            print("\n❌ SCORING BELUM JALAN / GAGAL")
            return

        pending_stats = game_count - stats_count
        pending_scores = stats_count - scores_count

        print("\n📌 GAP ANALYSIS")
        print(f"🧩 Belum Enrich : {pending_stats}")
        print(f"🧮 Belum Score  : {pending_scores}")

        # --------------------------
        # STATUS PIPELINE
        # --------------------------

        if pending_stats == 0 and pending_scores == 0:
            print("\n✅ PIPELINE 100% HEALTHY")
        else:
            print("\n⚠️ PIPELINE PARTIALLY DONE")

    finally:
        db.close()


if __name__ == "__main__":
    run_pipeline_health()