from tasks.pipeline_tasks import run_pipeline

if __name__ == "__main__":
    print("🚀 INIT PIPELINE")

    run_pipeline.delay(limit=500)

    print("✅ PIPELINE SENT TO CELERY")