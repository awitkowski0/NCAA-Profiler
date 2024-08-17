from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create a PostgreSQL engine instance
engine = create_engine(DATABASE_URL)

# Create declarative base meta instance
Base = declarative_base()

# Create session local class for session maken
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)