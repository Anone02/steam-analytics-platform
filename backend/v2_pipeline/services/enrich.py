from database import SessionLocal
from models.game import Game
from models.game_stats import GameStats


def run_enrichment_single(appid):
    db = SessionLocal()

    print(f"🔥 ENRICH GAME {appid}")

    # ambil game
    game = db.query(Game).filter(Game.appid == appid).first()

    if not game:
        print("❌ GAME NOT FOUND")
        db.close()
        return "NOT FOUND"

    # cek kalau udah ada stats → skip
    existing = db.query(GameStats).filter(GameStats.appid == appid).first()
    if existing:
        print("⚠️ ALREADY ENRICHED")
        db.close()
        return "SKIPPED"

    # =========================
    # REAL ENRICH (minimal viable)
    # =========================
    stats = GameStats(
        appid=game.appid,
        name=game.name,
        price=None,
        genres=None,
        owners=None,
        avg_playtime=None,
        positive=None,
        negative=None,
        review_count=None,
        positive_ratio=None,
    )

    db.add(stats)
    db.commit()

    print(f"✅ ENRICHED {appid}")

    db.close()
    return "ENRICHED"