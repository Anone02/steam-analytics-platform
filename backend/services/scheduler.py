from apscheduler.schedulers.background import BackgroundScheduler
from services.collector import run_collector
from services.enrich import run_enrichment
from services.scoring import run_scoring
import time

scheduler = BackgroundScheduler()


# 🔥 periodic collector (rare)
scheduler.add_job(run_collector, "interval", hours=6)

# 🔥 incremental enrichment
scheduler.add_job(lambda: run_enrichment(limit=200), "interval", minutes=10)

# 🔥 incremental scoring
scheduler.add_job(lambda: run_scoring(limit=200), "interval", minutes=10)


scheduler.start()

print("🚀 SCHEDULER RUNNING (CTRL+C to stop)")

try:
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    print("\n🛑 STOPPING...")
    scheduler.shutdown()
    print("✅ STOPPED CLEANLY")