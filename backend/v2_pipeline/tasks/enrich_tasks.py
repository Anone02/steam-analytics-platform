from v2_pipeline.celery_app import celery_app
from v2_pipeline.services.enrich import run_enrichment_single


@celery_app.task
def enrich_game_task(appid):
    print(f"🔥 ENRICH TASK {appid}")
    return run_enrichment_single(appid)