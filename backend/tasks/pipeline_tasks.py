from celery import chain
from celery_app import celery_app
from .enrich_tasks import enrich_game_task
from .scoring_tasks import score_game_task


@celery_app.task
def run_pipeline(limit=500):

    print("🚀 PIPELINE START")

    workflow = chain(
        enrich_game_task.si(limit),   # 👈 IMMUTABLE
        score_game_task.si(limit)     # 👈 IMMUTABLE
    )

    workflow.apply_async()

    print("🚀 PIPELINE DISPATCHED")

    return "ok"