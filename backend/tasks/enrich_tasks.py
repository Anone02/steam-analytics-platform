from celery_app import celery_app
from services.enrich import run_enrichment


@celery_app.task(bind=True)
def enrich_game_task(self, limit=500):
    print("🔥 ENRICH TASK START")
    return run_enrichment(limit=limit)