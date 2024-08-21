import asyncio
from http.client import HTTPException
from auth_bearer import JWTBearer
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from services.season_service import get_season_data, pre_cache_seasons
from services.auth_service import register_user, login, get_current_user
from services.report_service import create_report, get_report, get_reports
from schemas import Report, UserResponse

from models.user import User
from database import Base, engine, SessionLocal, get_session
from services.season_service import get_season_data, pre_cache_seasons, get_team_data, get_game_data
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
    asyncio.create_task(pre_cache_seasons())

# Routes
app.post("/api/register")(register_user)
app.post('/api/login', response_model=schemas.TokenSchema)(login)


@app.get("/api/team/{team_id}")
async def get_team(team_id: str):
    return await get_team_data(team_id)

@app.get("/api/game/{game_id}")
async def get_team(game_id: str):
    return await get_game_data(game_id)

@app.get("/api/season/{year}")
async def get_season(year: int):
    return await get_season_data(year)

@app.get("/api/reports/", response_model=list[Report])
def list_user_reports(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    return get_reports(user, session)

@app.get("/api/reports/{report_id}", response_model=Report)
def get_user_report(report_id: int, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    return get_report(report_id, user, session)

@app.post("/api/reports/", response_model=schemas.Report)
def create_user_report(report: schemas.ReportCreate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    return create_report(report, user, session)


@app.put("/api/reports/{report_id}", response_model=schemas.Report)
def update_report(report_id: int, report: schemas.ReportCreate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    db_report = get_report(report_id, user, session)
    if db_report:
        for key, value in report.dict(exclude_unset=True).items():
            setattr(db_report, key, value)
        session.commit()
        session.refresh(db_report)
        return db_report
    raise HTTPException(status_code=404, detail="Report not found")


@app.delete("/reports/{report_id}")
def delete_report(report_id: int, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    db_report = get_report(report_id, user, session)
    if db_report:
        session.delete(db_report)
        session.commit()
        return {"message": "Report deleted successfully"}
    raise HTTPException(status_code=404, detail="Report not found")


@app.post("/api/validate_token", response_model=UserResponse)
def validate_token(user: User = Depends(get_current_user), token: str = Depends(JWTBearer)):
    return user

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