from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from passlib.context import CryptContext

import models
from database import SessionLocal, engine
import schema

# ---------------------- Cấu hình bảo mật ----------------------
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ---------------------- Khởi tạo app ----------------------
app = FastAPI()

models.Base.metadata.create_all(bind=engine)

# Cho phép React frontend truy cập API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hoặc ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------- Database Dependency ----------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------- Utility ----------------------
def verify_password(plain_password: str, hashed_password: str):
    """Kiểm tra mật khẩu có khớp với bản mã hóa không"""
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password: str):
    """Mã hóa mật khẩu trước khi lưu DB"""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Tạo JWT token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# ---------------------- Auth APIs ----------------------

@app.post("/register")
def register(request: schema.RegisterRequest, db: Session = Depends(get_db)):
    if not request.password:
        raise HTTPException(status_code=400, detail="Password không được để trống")

    existing_user = db.query(models.User).filter(models.User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email đã tồn tại")

    new_user = models.User(
        full_name=request.full_name,
        email=request.email,
        password_hash=hash_password(request.password),
        role_name="customer",
        phone=request.phone,
        address=request.address
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Đăng ký thành công", "email": new_user.email}



@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Lấy user theo email
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Sai email hoặc mật khẩu")

    # Tạo token
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role_name},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role_name,
        "email": user.email,
    }


@app.get("/users/me", response_model=schema.UserOut)
def read_users_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Trả về thông tin người dùng hiện tại"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token không hợp lệ")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token không hợp lệ")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")

    return user



# @app.get("/products", response_model=list[schema.ProductOut])
# def get_products(db: Session = Depends(get_db)):
#     return db.query(models.Product).all()


# @app.get("/product/{product_id}")
# def get_product_detail(product_id: int, db: Session = Depends(get_db)):
#     product = (
#         db.query(models.Product).filter(models.Product.product_id == product_id).first()
#     )
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not exist")
#     return {
#         "product_id": product.product_id,
#         "name": product.name,
#         "description": product.description,
#         "price": product.price,
#         "quantity": product.quantity,
#         "image_url": product.image_url,
#     }


# @app.get("/categories", response_model=list[schema.CategoryOut])
# def get_categories(db: Session = Depends(get_db)):
#     categories = db.query(models.Category).all()
#     return categories


# @app.get("/products/{category_id}", response_model=list[schema.ProductOut])
# def get_products_by_category(category_id: int, db: Session = Depends(get_db)):
#     category = (
#         db.query(models.Category)
#         .filter(models.Category.category_id == category_id)
#         .first()
#     )
#     if not category:
#         raise HTTPException(status_code=404, detail="Category not found")

#     products = (
#         db.query(models.Product).filter(models.Product.category_id == category_id).all()
#     )
#     return products


# @app.get("/products/search/{search_name}", response_model=list[schema.ProductOut])
# def get_products_by_search(search_name: str, db: Session = Depends(get_db)):
#     products = (
#         db.query(models.Product)
#         .filter(models.Product.name.ilike(f"%{search_name}%"))
#         .all()
#     )
#     if not products:
#         raise HTTPException(status_code=404, detail="Products not found")

#     return products
