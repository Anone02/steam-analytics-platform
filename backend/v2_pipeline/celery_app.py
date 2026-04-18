from celery import Celery
from celery.schedules import crontab

celery_app = Celery(
    "v2_pipeline",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1",
    include=[
        "v2_pipeline.tasks.collector_tasks",
        "v2_pipeline.tasks.enrich_tasks",
        "v2_pipeline.tasks.scoring_tasks",
        "v2_pipeline.tasks.scheduler_tasks",
    ]
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
)

celery_app.conf.beat_schedule = {

    # scheduler tiap 1 menit
    "run-pipeline-every-1-minute": {
        "task": "v2_pipeline.tasks.scheduler_tasks.run_scheduler",
        "schedule": 60.0,
    },

    # collector tiap 1 jam
    "collect-games-every-1-hour": {
        "task": "v2_pipeline.tasks.collector_tasks.collect_games_task",
        "schedule": crontab(minute=0),
        "args": (200,)
    },
}