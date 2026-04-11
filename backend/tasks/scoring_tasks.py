from celery_app import celery_app
from services.scoring import run_scoring


@celery_app.task(bind=True, max_retries=3)
def score_game_task(self, limit=500):
    return run_scoring(limit)