from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
import models
from database import get_db
import schema
from auth import get_current_user

customer = APIRouter(prefix="", tags=["Authentication"])


@customer.get("/products", response_model=list[schema.ProductOut])
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()


@customer.get("/product/{product_id}")
def get_product_detail(product_id: int, db: Session = Depends(get_db)):
    product = (
        db.query(models.Product).filter(models.Product.product_id == product_id).first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    return {
        "product_id": product.product_id,
        "name": product.product_name,
        "description": product.description,
        "price": product.price,
        "quantity": product.stock_quantity,
        "image_url": product.image_url,
    }


@customer.get("/categories", response_model=list[schema.CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Category).all()
    return categories


@customer.get("/products/{category_id}", response_model=list[schema.ProductOut])
def get_products_by_category(category_id: int, db: Session = Depends(get_db)):
    category = (
        db.query(models.Category)
        .filter(models.Category.category_id == category_id)
        .first()
    )
    if not category:
        raise HTTPException(status_code=404, detail="Không tìm thấy danh mục")

    products = (
        db.query(models.Product).filter(models.Product.category_id == category_id).all()
    )
    return products


@customer.get("/products/search/{search_name}", response_model=list[schema.ProductOut])
def get_products_by_search(search_name: str, db: Session = Depends(get_db)):
    products = (
        db.query(models.Product)
        .filter(models.Product.product_name.ilike(f"%{search_name}%"))
        .all()
    )
    if not products:
        raise HTTPException(status_code=404, detail="Không tìm thấy sản phẩm")

    return products


@customer.post("/cart/add")
def add_to_cart(
    item: schema.CartItemCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user_id = current_user.user_id

    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        cart = models.Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    product = (
        db.query(models.Product)
        .filter(models.Product.product_id == item.product_id)
        .first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")

    cart_item = (
        db.query(models.CartItem)
        .filter(
            models.CartItem.cart_id == cart.cart_id,
            models.CartItem.product_id == item.product_id,
        )
        .first()
    )
    if cart_item:
        cart_item.quantity += item.quantity
        cart_item.price = product.price
    else:
        new_item = models.CartItem(
            cart_id=cart.cart_id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=product.price,
        )
        db.add(new_item)

    db.commit()
    return {"message": "Đã thêm sản phẩm vào giỏ hàng", "cart_id": cart.cart_id}


@customer.delete("/cart/remove/{product_id}")
def remove_from_cart(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    cart = (
        db.query(models.Cart)
        .filter(models.Cart.user_id == current_user.user_id)
        .first()
    )
    if not cart:
        raise HTTPException(status_code=404, detail="Giỏ hàng không tồn tại")

    cart_item = (
        db.query(models.CartItem)
        .filter(
            models.CartItem.cart_id == cart.cart_id,
            models.CartItem.product_id == product_id,
        )
        .first()
    )

    if not cart_item:
        raise HTTPException(status_code=404, detail="Sản phẩm không có trong giỏ hàng")

    db.delete(cart_item)
    db.commit()
    return {"message": f"Đã xóa sản phẩm {product_id} khỏi giỏ hàng"}


@customer.put("/cart/update")
def update_cart_item(
    item: schema.CartItemUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    cart = (
        db.query(models.Cart)
        .filter(models.Cart.user_id == current_user.user_id)
        .first()
    )
    if not cart:
        raise HTTPException(status_code=404, detail="Giỏ hàng không tồn tại")

    cart_item = (
        db.query(models.CartItem)
        .filter(
            models.CartItem.cart_id == cart.cart_id,
            models.CartItem.product_id == item.product_id,
        )
        .first()
    )

    if not cart_item:
        raise HTTPException(status_code=404, detail="Sản phẩm không có trong giỏ hàng")

    if item.quantity <= 0:
        db.delete(cart_item)
        db.commit()
        return {
            "message": f"Đã xóa sản phẩm {item.product_id} khỏi giỏ hàng do số lượng <= 0"
        }

    cart_item.quantity = item.quantity
    db.commit()
    return {
        "message": "Cập nhật sản phẩm thành công",
        "product_id": item.product_id,
        "quantity": item.quantity,
    }


@customer.get("/cart/me")
def get_my_cart(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    user_id = current_user.user_id

    cart = db.query(models.Cart).filter(models.Cart.user_id == user_id).first()
    if not cart:
        return {
            "user_id": user_id,
            "cart_id": None,
            "items": [],
            "total_price": 0,
        }

    cart_items = (
        db.query(models.CartItem, models.Product)
        .join(models.Product, models.CartItem.product_id == models.Product.product_id)
        .filter(models.CartItem.cart_id == cart.cart_id)
        .all()
    )

    items = []
    total_price = 0

    for cart_item, product in cart_items:
        subtotal = float(cart_item.price) * cart_item.quantity
        total_price += subtotal

        items.append(
            {
                "product_id": product.product_id,
                "product_name": product.product_name,
                "description": product.description,
                "image_url": product.image_url,
                "price": float(cart_item.price),
                "quantity": cart_item.quantity,
                "total": subtotal,
            }
        )

    return {
        "user_id": user_id,
        "cart_id": cart.cart_id,
        "items": items,
        "total_price": total_price,
    }
