from services.collector import run_collector
from services.enrich import run_enrichment
from services.scoring import run_scoring


def run_init_pipeline():
    print("🚀 INIT PIPELINE START")

    # =========================
    # 1. COLLECTOR
    # =========================
    print("🚀 RUN COLLECTOR")

    inserted = run_collector(
        max_games=30000,
        pages_per_genre=3
    )

    print(f"📦 COLLECTED: {inserted}")

    # =========================
    # 2. ENRICH
    # =========================
    print("🔥 ENRICH START")

    # 🔥 NORMAL MODE (SAFE)
    enriched = run_enrichment(
        limit=2000
    )

    print(f"🔥 ENRICHED (normal): {enriched}")

    # =========================
    # 2B. ENRICH FAST MODE (OPTIONAL TOGGLE)
    # =========================
    print("⚡ ENRICH FAST MODE")

    enriched_fast = run_enrichment(
        limit=500,
        workers=10
    )

    print(f"⚡ ENRICHED (fast): {enriched_fast}")

    # =========================
    # 3. SCORING
    # =========================
    print("📊 SCORING START")

    scored = run_scoring(
        limit=2000
    )

    print(f"📊 SCORED: {scored}")

    print("🏁 INIT PIPELINE DONE")


if __name__ == "__main__":
    run_init_pipeline()