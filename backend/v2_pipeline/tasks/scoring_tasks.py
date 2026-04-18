from v2_pipeline.celery_app import celery_app
from v2_pipeline.services.scoring import run_scoring_single


@celery_app.task
def scoring_task(appid):
    print(f"📊 SCORING TASK {appid}")
    return run_scoring_single(appid)