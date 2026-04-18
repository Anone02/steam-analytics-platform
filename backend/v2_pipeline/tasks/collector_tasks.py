from v2_pipeline.celery_app import celery_app
from v2_pipeline.services.collector import run_collector


@celery_app.task
def collect_games_task(max_games=200):
    print("🌐 COLLECT TASK RUNNING")
    return run_collector(max_games=max_games)