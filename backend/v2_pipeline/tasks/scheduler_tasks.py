from v2_pipeline.celery_app import celery_app
from v2_pipeline.services.scheduler import run_scheduler_logic


@celery_app.task
def run_scheduler():
    print("🧠 SCHEDULER RUNNING")
    return run_scheduler_logic()