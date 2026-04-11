from celery import Celery

celery_app = Celery(
    "steam_pipeline",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1",
    include=[
        "tasks.enrich_tasks",
        "tasks.scoring_tasks",
        "tasks.pipeline_tasks"
    ]
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    task_track_started=True,
    worker_prefetch_multiplier=1,
    task_acks_late=True
)