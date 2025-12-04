from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
import model
from database import get_db
import schema_customer as schema_customer
from auth import get_current_user

customer = APIRouter(prefix="", tags=["Authentication"])


# hien thi danh sanh danh muc, san pham, tim kiem san pham, thong tin chi tiet
@customer.get("/categories", response_model=list[schema_customer.CategoryList])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(model.Category).all()
    return categories

@customer.get("/{category_id}/products", response_model=list[schema_customer.ProductList])
def get_products_by_category(category_id: int, db: Session = Depends(get_db)):
    category = (
        db.query(model.Category)
        .filter(model.Category.category_id == category_id)
        .first()
    )
    if not category:
        raise HTTPException(status_code=404, detail="Không tìm thấy danh mục")

    products = (
        db.query(model.Product).filter(model.Product.category_id == category_id).all()
    )
    results = []
    for product in products:
        item = {
            "product_id": product.product_id,
            "product_name": product.product_name,
            "price": product.price,
            "image_url": product.image_url,
            "description": product.description,
        }
        results.append(item)

    return results


@customer.get("/products", response_model=list[schema_customer.ProductList])
def get_products(db: Session = Depends(get_db)):
    products = db.query(model.Product).all()

    results = []
    for product in products:
        item = {
            "product_id": product.product_id,
            "product_name": product.product_name,
            "price": product.price,
            "image_url": product.image_url,
            "description": product.description,
        }
        results.append(item)

    return results


@customer.get("/products/{product_id}")
def get_product_detail(product_id: int, db: Session = Depends(get_db)):
    product = (
        db.query(model.Product).filter(model.Product.product_id == product_id).first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    return {
        "product_id": product.product_id,
        "product_name": product.product_name,
        "price": product.price,
        "image_url": product.image_url,
        "description": product.description,
    }


@customer.get("/products/search/{search_name}", response_model=list[schema_customer.ProductList],)
def get_products_by_search(search_name: str, db: Session = Depends(get_db)):
    products = (
        db.query(model.Product)
        .filter(model.Product.product_name.ilike(f"%{search_name}%"))
        .all()
    )
    if not products:
        raise HTTPException(status_code=404, detail="Không tìm thấy sản phẩm")

    return products


# cac thao tac ve gio hang
@customer.post("/carts/add")
def add_to_cart(
    item: schema_customer.CartItemCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user_id = current_user.user_id

    cart = db.query(model.Cart).filter(model.Cart.user_id == user_id).first()
    if not cart:
        cart = model.Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)

    product = (
        db.query(model.Product)
        .filter(model.Product.product_id == item.product_id)
        .first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")

    cart_item = (
        db.query(model.CartItem)
        .filter(
            model.CartItem.cart_id == cart.cart_id,
            model.CartItem.product_id == item.product_id,
        )
        .first()
    )

    if cart_item:
        cart_item.quantity += item.quantity
    else:
        new_item = model.CartItem(
            cart_id=cart.cart_id,
            product_id=item.product_id,
            quantity=item.quantity,
            is_checked=False,
        )
        db.add(new_item)

    db.commit()

    return {
        "message": "Đã thêm sản phẩm vào giỏ hàng",
        "cart_id": cart.cart_id,
        "product_id": item.product_id,
        "quantity": item.quantity,
    }


@customer.delete("/carts/remove/{product_id}")
def remove_from_cart(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    cart = (
        db.query(model.Cart).filter(model.Cart.user_id == current_user.user_id).first()
    )
    if not cart:
        raise HTTPException(status_code=404, detail="Giỏ hàng không tồn tại")

    cart_item = (
        db.query(model.CartItem)
        .filter(
            model.CartItem.cart_id == cart.cart_id,
            model.CartItem.product_id == product_id,
        )
        .first()
    )

    if not cart_item:
        raise HTTPException(status_code=404, detail="Sản phẩm không có trong giỏ hàng")

    db.delete(cart_item)
    db.commit()
    return {"message": f"Đã xóa sản phẩm {product_id} khỏi giỏ hàng"}


@customer.put("/carts/update", response_model=schema_customer.CartItemResponse)
def update_cart_item(
    item: schema_customer.CartItemUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    cart = (
        db.query(model.Cart).filter(model.Cart.user_id == current_user.user_id).first()
    )
    if not cart:
        raise HTTPException(status_code=404, detail="Giỏ hàng không tồn tại")

    cart_item = (
        db.query(model.CartItem)
        .filter(
            model.CartItem.cart_id == cart.cart_id,
            model.CartItem.product_id == item.product_id,
        )
        .first()
    )
    if not cart_item:
        raise HTTPException(status_code=404, detail="Sản phẩm không có trong giỏ hàng")

    if item.quantity <= 0:
        db.delete(cart_item)
        db.commit()
        raise HTTPException(
            status_code=200,
            detail=f"Đã xóa sản phẩm {item.product_id} khỏi giỏ hàng do số lượng <= 0",
        )

    cart_item.quantity = item.quantity
    db.commit()
    db.refresh(cart_item)  

    return cart_item


@customer.get("/carts/current_user")
def get_my_cart(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    user_id = current_user.user_id

    cart = db.query(model.Cart).filter(model.Cart.user_id == user_id).first()
    if not cart:
        return {
            "user_id": user_id,
            "cart_id": None,
            "items": [],
            "total_price": 0,
        }

    cart_items = (
        db.query(model.CartItem, model.Product)
        .join(model.Product, model.CartItem.product_id == model.Product.product_id)
        .filter(model.CartItem.cart_id == cart.cart_id)
        .all()
    )

    items = []
    total_price = 0

    for cart_item, product in cart_items:
        total_amount = float(product.price) * cart_item.quantity
        total_price += total_amount

        items.append(
            {
                "product_id": product.product_id,
                "product_name": product.product_name,
                "description": product.description,
                "image_url": product.image_url,
                "price": product.price,
                "quantity": cart_item.quantity,
                "total": total_amount,
                "selected": False,
            }
        )

    return {
        "user_id": user_id,
        "cart_id": cart.cart_id,
        "items": items,
        "total_price": total_price,
    }

@customer.put("/cart/item/{product_id}/status")
def update_cart_item_status(
    product_id: int,
    status_update: schema_customer.CartItemStatusUpdate,
    db: Session = Depends(get_db),
    current_user: model.User = Depends(get_current_user) # Giả sử bạn có hàm lấy user hiện tại
):
    # 1. Tìm giỏ hàng của user
    cart = db.query(model.Cart).filter(model.Cart.user_id == current_user.user_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    # 2. Tìm sản phẩm trong giỏ hàng (CartItem)
    cart_item = db.query(model.CartItem).filter(
        model.CartItem.cart_id == cart.cart_id,
        model.CartItem.product_id == product_id
    ).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Product not in cart")

    # 3. Cập nhật trạng thái
    cart_item.is_checked = status_update.is_checked # Map với cột is_checked trong DB
    db.commit()
    
    return {"message": "Status updated successfully"}
