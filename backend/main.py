from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models.game import Base, Game
from routes.games import router as games_router

app = FastAPI(title="Steam Analytics API")


# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# ROUTER
# =========================
app.include_router(games_router, prefix="/api")


# =========================
# DB SESSION
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================
# HEALTH CHECK
# =========================
@app.get("/")
def root():
    return {"status": "ok", "message": "Steam API running 🚀"}


# =========================
# INIT DB ON STARTUP
# =========================
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    print("✅ Database ready")


# =========================
# DIRECT API (OPTIONAL)
# =========================
@app.get("/games")
def get_games(db: Session = Depends(get_db)):
    return db.query(Game).limit(100).all()