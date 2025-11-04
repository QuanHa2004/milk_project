from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func 
from sqlalchemy.orm import Session, joinedload
import models
from database import engine, get_db
import schema
from auth import router
from admin import admin
from customer import customer

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(admin)
app.include_router(customer)


@app.get("/products", response_model=list[schema.ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return (
        db.query(models.Product).all()
    )


@app.get("/product/{product_id}")
def get_product_detail(product_id: int, db: Session = Depends(get_db)):
    product = (
        db.query(models.Product).filter(models.Product.product_id == product_id).first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Product not exist")
    return {
        "product_id": product.product_id,
        "name": product.product_name,
        "description": product.description,
        "price": product.price,
        "quantity": product.stock_quantity,
        "image_url": product.image_url,
    }


@app.get("/categories", response_model=list[schema.CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()

@app.get("/products/{category_id}", response_model=list[schema.ProductResponse])
def get_products_by_category(category_id: int, db: Session = Depends(get_db)):
    category = (
        db.query(models.Category)
        .filter(models.Category.category_id == category_id)
        .first()
    )
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    products = (
        db.query(models.Product).filter(models.Product.category_id == category_id).all()
    )
    return products


@app.get("/products/search/{search_name}", response_model=list[schema.ProductResponse])
def get_products_by_search(search_name: str, db: Session = Depends(get_db)):
    products = (
        db.query(models.Product)
        .filter(models.Product.product_name.ilike(f"%{search_name}%"))
        .all()
    )
    if not products:
        raise HTTPException(status_code=404, detail="Products not found")

    return products
