from fastapi import APIRouter
from services.steam_service import get_owned_games

router = APIRouter()

@router.get("/games/{76561198844748935}")
def games(steam_id: str):
    return get_owned_games(steam_id)