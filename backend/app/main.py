from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from services.team_service import get_team_data
from services.season_service import get_season_data, pre_cache_seasons
from services.auth_service import register_user, login, get_current_user
from services.report_service import create_report, get_report, get_reports
from schemas import ReportCreate, Report
from database import get_session
from models.user import User

from models import token_table, report

from database import Base, engine, SessionLocal
from services.team_service import get_team_data
from services.season_service import get_season_data, pre_cache_seasons
from services.auth_service import register_user, login
import schemas

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

@app.on_event("startup")
async def startup_event():
    # Pre-cache the seasons from 2024 to 2018
    await pre_cache_seasons()


# Routes
app.post("/register")(register_user)
app.post('/login', response_model=schemas.TokenSchema)(login)


@app.get("/api/team/{team_id}")
async def get_team(team_id: str):
    return await get_team_data(team_id)

@app.get("/api/season/{year}")
async def get_season(year: int):
    return await get_season_data(year)

# Report Routes
@app.post("/reports/", response_model=Report)
def create_user_report(report: ReportCreate, user: User = Depends(get_current_user)):
    return create_report(report, user)

@app.get("/reports/{report_id}", response_model=Report)
def get_user_report(report_id: int, user: User = Depends(get_current_user)):
    return get_report(report_id, user)

@app.get("/reports/", response_model=list[Report])
def list_user_reports(user: User = Depends(get_current_user)):
    return get_reports(user)


@app.get("/")
async def root():
    return {"message": "Hello World"}

# Player Lookup
# https://wire.telemetry.fm/ncaa/players/?player_id=LEV77487

# Game Lookup
# https://wire.telemetry.fm/ncaa/plays/?game-id=23596

# Team Lookup
# https://wire.telemetry.fm/ncaa/teams/?team_id=kansas-st

# Season Lookup
# https://wire.telemetry.fm/ncaa/schedules/by-season/?season=2024