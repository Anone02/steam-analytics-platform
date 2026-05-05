from database import SessionLocal
from models.game_stats import GameStats
from models.game_scores import GameScores

def run_scoring(limit=500):
    db = SessionLocal()
    print(f"📊 SCORING START (Logic: Price vs Sentiment) | LIMIT: {limit}")

    stats = db.query(GameStats).limit(limit).all()
    inserted = 0

    for s in stats:
        try:
            # Skip duplicate
            exists = db.query(GameScores).filter_by(appid=s.appid).first()
            if exists:
                continue

            # Data pendukung
            ratio = float(s.positive_ratio or 0)
            reviews = float(s.review_count or 0)
            price = float(s.price or 0)
            
            # =============================================================
            # LOGIKA VALUE SCORE (WORTH-IT FACTOR)
            # =============================================================
            # 1. Kalau game GRATIS (price 0), value dasarnya tinggi (90)
            # 2. Kalau BAYAR, value dihitung dari (Sentiment / Price)
            # 3. Faktor penentu: makin tinggi positive_ratio, makin bagus valuenya.
            
            if price == 0:
                # Game gratis: Value murni dari seberapa bagus ratingnya
                base_value = ratio * 100
            else:
                # Game bayar: Makin mahal harga, makin berat syarat buat dapet score tinggi
                # Rumus: (Ratio Positif * 100) dikurangin pinalti harga
                # Game $60 (mahal) dapet pinalti lebih gede dibanding game $5 (murah)
                penalty = price / 2.0  # $60 jadi -30 poin
                base_value = (ratio * 100) - penalty

            # Pastikan score di range 0-100
            value_score = max(min(base_value, 100), 0)

            # =============================================================
            # SKOR LAINNYA
            # =============================================================
            hidden_gem = ratio * 100.0
            toxic = (1.0 - ratio) * 100.0
            popularity = min((reviews / 100000.0) * 100.0, 100.0)

            db.add(GameScores(
                appid=s.appid,
                name=s.name,
                hidden_gem_score=hidden_gem,
                value_score=value_score,
                toxic_score=toxic,
                popularity_score=popularity
            ))

            inserted += 1
            if inserted % 25 == 0:
                db.commit()

        except Exception as e:
            print(f"💥 ERROR scoring {s.appid}: {e}")
            db.rollback()
            continue

    db.commit()
    db.close()
    print(f"🏁 SCORING DONE | Total Processed: {inserted}")

if __name__ == "__main__":
    run_scoring(limit=100)