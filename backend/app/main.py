import requests, json
import os

from fastapi import FastAPI, Depends, HTTPException,status
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from io import BytesIO
from dotenv import load_dotenv

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

import schemas
import models.db_models

from models.db_models import User
from database import Base, engine, SessionLocal
from auth_bearer import JWTBearer

from functools import wraps
from utils import create_access_token,create_refresh_token,verify_password,get_hashed_password

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods, including OPTIONS
    allow_headers=["*"],  # Allows all headers
)

#This is the API Token
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

#DB .env stuff
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY")

Base.metadata.create_all(engine)
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

Base = declarative_base()

@app.post("/register")
def register_user(user: schemas.UserCreate, session: Session = Depends(get_session)):
    existing_user = session.query(models.User).filter_by(username=user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    encrypted_password = get_hashed_password(user.password)

    new_user = models.User(username=user.username, password=encrypted_password )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"message":"User Created Successfully."}


@app.post('/login', response_model=schemas.TokenSchema)
def login(request: schemas.RequestDetails, db: Session = Depends(get_session)):
    user = db.query(User).filter(User.username == request.username).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username")
    
    hashed_pass = user.password
    if not verify_password(request.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Password."
        )
    
    access = create_access_token(user.id)
    refresh = create_refresh_token(user.id)

    # Check if token already exists for the user and update it
    existing_token = db.query(models.db_models.TokenTable).filter_by(user_id=user.id).first()
    if existing_token:
        existing_token.access_token = access
        existing_token.refresh_token = refresh
        existing_token.status = True
        db.commit()
        db.refresh(existing_token)
    else:
        token_db = models.db_models.TokenTable(user_id=user.id, access_token=access, refresh_token=refresh, status=True)
        db.add(token_db)
        db.commit()
        db.refresh(token_db)
    
    return {
        "access_token": access,
        "refresh_token": refresh,
    }

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/team/{team_id}")
async def get_team(
    team_id: str
):
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    query_params = {'team_id': team_id}

    try:
        response = requests.get(
            'https://wire.telemetry.fm/ncaa/teams/', params=query_params, headers=headers
        )

        # Log the response status code and content for debugging
        print(f"Response Status Code: {response.status_code}")
        print(f"Response Content: {response.text}")

        # Check for errors in the response
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        # Check if the response is empty or not valid JSON
        if not response.content or response.content.strip() == b'':
            raise HTTPException(status_code=502, detail="Received empty response from API")

        try:
            # Attempt to parse the JSON
            data = response.json()
            return data
        except ValueError as e:
            # Handle JSON parsing error
            raise HTTPException(status_code=502, detail="Invalid JSON response from API")

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/season/{year}")
async def get_seaason(
    year: int
):
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    query_params: dict = {'season': {year}}
    stream = BytesIO()
    chunk_size = 1024 * 12  # 12KB
    with requests.get(
        'https://wire.telemetry.fm/ncaa/schedules/by-season/', params=query_params, headers=headers, stream=True
    ) as response:
        for chunk in response.iter_content(chunk_size=chunk_size):  # read in 12KB chunks
            stream.write(chunk)
    stream.seek(0)
    data = json.load(stream)

    return data


@app.get("/api/game")
async def test_api_game():
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    query_params: dict = {'game_id': 23596}
    stream = BytesIO()
    chunk_size = 1024 * 5  # 5KB
    with requests.get(
        'https://wire.telemetry.fm/ncaa/plays/game-id', params=query_params, headers=headers, stream=True
    ) as response:
        for chunk in response.iter_content(chunk_size=chunk_size):  # read in 5KB chunks
            stream.write(chunk)
    stream.seek(0)
    data = json.load(stream)
    
    return {data}

@app.get("/api/login")
async def login():
    return {}


@app.get("/api/register")
async def login():
    return {}

# Player Lookup
# https://wire.telemetry.fm/ncaa/players/?player_id=LEV77487

# Game Lookup
# https://wire.telemetry.fm/ncaa/plays/?game-id=23596

# Team Lookup
# https://wire.telemetry.fm/ncaa/teams/?team_id=kansas-st

# Season Lookup
# https://wire.telemetry.fm/ncaa/schedules/by-season/?season=2024