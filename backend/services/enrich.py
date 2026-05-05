import requests
import time
from database import SessionLocal
from models.game import Game
from models.game_stats import GameStats

STEAMSPY = "https://steamspy.com/api.php"

def safe_int(v):
    try:
        return int(v)
    except:
        return 0

def run_enrichment(limit=500):
    db = SessionLocal()
    # Mencari game yang belum ada di game_stats agar tidak kerja dua kali
    games = db.query(Game).limit(limit).all()

    print(f"🎮 ENRICH START | LIMIT: {limit}")
    
    inserted = 0
    failed = 0

    for g in games:
        try:
            # Skip jika sudah ada
            exists = db.query(GameStats).filter(GameStats.appid == g.appid).first()
            if exists:
                continue

            print(f"👉 FETCHING: {g.appid} | {g.name}")
            
            res = requests.get(STEAMSPY, params={"request": "appdetails", "appid": g.appid}, timeout=15)
            data = res.json()

            if not isinstance(data, dict) or not data.get("name"):
                failed += 1
                continue

            pos = safe_int(data.get("positive"))
            neg = safe_int(data.get("negative"))
            total = pos + neg
            
            # Ambil rata-rata waktu main (dalam menit)
            playtime = safe_int(data.get("average_forever"))

            stats = GameStats(
                appid=g.appid,
                name=data.get("name", g.name),
                price=safe_int(data.get("price")) / 100,
                genres=data.get("genre", "unknown"),
                owners=data.get("owners", "0"),
                avg_playtime=playtime,
                positive=pos,
                negative=neg,
                review_count=total,
                positive_ratio=(pos / total) if total > 0 else 0
            )

            db.add(stats)
            inserted += 1
            
            # Jeda 1 detik agar tidak diblokir API
            time.sleep(1)

            if inserted % 25 == 0:
                db.commit()
                print(f"💾 BATCH COMMIT | {inserted} games saved")

        except Exception as e:
            print(f"💥 ERROR {g.appid}: {e}")
            db.rollback()
            continue

    db.commit()
    db.close()
    print(f"🏁 ENRICH DONE | Inserted: {inserted}, Failed: {failed}")

if __name__ == "__main__":
    run_enrichment(100)