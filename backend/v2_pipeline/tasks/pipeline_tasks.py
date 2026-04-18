from v2_pipeline.celery_app import celery_app
from v2_pipeline.tasks.collector_tasks import run_collector_job
from v2_pipeline.tasks.enrich_tasks import enrich_game_task
from v2_pipeline.tasks.scoring_tasks import score_game_task


@celery_app.task
def run_pipeline(limit=100):

    print("🚀 PIPELINE START")

    # PRIORITY: collect dulu
    run_collector_job.delay(limit)

    # lanjut enrich
    enrich_game_task.delay(limit)

    # lanjut scoring
    score_game_task.delay(limit)

    print("🏁 PIPELINE DISPATCHED")

    return "done"