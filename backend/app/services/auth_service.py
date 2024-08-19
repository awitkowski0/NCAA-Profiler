from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
import schemas
from models.user import User
from database import get_session
from utils import create_access_token, create_refresh_token, verify_password, get_hashed_password
from models.token_table import TokenTable
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
import os

# Load environment variables
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def register_user(user: schemas.UserCreate, session: Session = Depends(get_session)):
    existing_user = session.query(User).filter_by(username=user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    encrypted_password = get_hashed_password(user.password)
    new_user = User(username=user.username, password=encrypted_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"message": "User Created Successfully."}


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

    existing_token = db.query(TokenTable).filter_by(user_id=user.id).first()
    if existing_token:
        existing_token.access_token = access
        existing_token.refresh_token = refresh
        existing_token.status = True
        db.commit()
        db.refresh(existing_token)
    else:
        token_db = TokenTable(user_id=user.id, access_token=access, refresh_token=refresh, status=True)
        db.add(token_db)
        db.commit()
        db.refresh(token_db)

    return {
        "access_token": access,
        "refresh_token": refresh,
    }


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user
