from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from jose.exceptions import ExpiredSignatureError
from datetime import datetime, timedelta
from passlib.context import CryptContext

import models
import schema
from database import get_db

from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="../.env")

# ====================================================
# CẤU HÌNH TOKEN
# ====================================================
SECRET_KEY = os.getenv("SECRET_KEY")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7))

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Tạo router riêng cho auth
router = APIRouter(prefix="", tags=["Authentication"])

# ====================================================
# HÀM HỖ TRỢ
# ====================================================


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password: str):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Không thể xác thực người dùng",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user is None:
        raise credentials_exception

    return user


# ====================================================
# ENDPOINTS
# ====================================================


@router.post("/register")
def register(request: schema.UserCreate, db: Session = Depends(get_db)):
    if not request.password:
        raise HTTPException(status_code=400, detail="Mật khẩu không được để trống")

    existing_user = (
        db.query(models.User).filter(models.User.email == request.email).first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="Email đã tồn tại")

    new_user = models.User(
        full_name=request.full_name,
        email=request.email,
        phone=request.phone,
        address=request.address,
        password_hash=hash_password(request.password),
        role_id=2,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message" : "Đăng ký thành công"}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):

    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Sai email hoặc mật khẩu")

    access_token = create_access_token(
        data={"sub": str(user.user_id), "email": user.email, "role_id": user.role_id}
    )
    refresh_token = create_refresh_token(
        data={"sub": str(user.user_id), "email": user.email, "role_id": user.role_id}
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "role_id": user.role_id,
        "email": user.email,
    }


@router.post("/refresh")
def refresh_token(token: str = Depends(oauth2_scheme)):

    try:
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        new_access_token = create_access_token(
            {
                "sub": payload["sub"],
                "email": payload["email"],
                "role_id": payload["role_id"],
            }
        )
        return {"access_token": new_access_token, "token_type": "bearer"}
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=401, detail="Refresh token đã hết hạn, vui lòng đăng nhập lại"
        )
    except JWTError:
        raise HTTPException(status_code=401, detail="Refresh token không hợp lệ")


@router.get("/current_user", response_model=schema.UserResponse)
def read_users_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token không hợp lệ")
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token đã hết hạn")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token không hợp lệ")

    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")

    return user
