from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
import models
from database import get_db
import schema
from auth import get_current_user

admin = APIRouter(prefix="", tags=["Authentication"])


