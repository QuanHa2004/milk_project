from sqlalchemy import (
    Column, Integer, String, ForeignKey, DateTime, Text,
    DECIMAL, Enum, Boolean, Date
)
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
import enum


# ======================
# ENUM DEFINITIONS
# ======================

class DiscountType(enum.Enum):
    percent = "percent"
    fixed = "fixed"


class FeedbackStatus(enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    resolved = "resolved"


class OrderStatus(enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    delivered = "delivered"
    cancelled = "cancelled"


# ======================
# TABLE DEFINITIONS
# ======================

class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True, autoincrement=True)
    role_name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))

    users = relationship("User", back_populates="role")


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone = Column(String(20))
    address = Column(String(255))
    password_hash = Column(String(255), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.role_id"), nullable=False)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

    role = relationship("Role", back_populates="users")
    promotions = relationship("Promotion", back_populates="creator")
    carts = relationship("Cart", back_populates="user")
    feedbacks = relationship("Feedback", back_populates="user")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")


class Promotion(Base):
    __tablename__ = "promotions"

    promo_id = Column(Integer, primary_key=True, autoincrement=True)
    promo_code = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))
    discount_type = Column(Enum(DiscountType))
    discount_value = Column(DECIMAL(10, 2), nullable=False)
    min_order_value = Column(DECIMAL(12, 2))
    max_uses = Column(Integer)
    uses_count = Column(Integer, default=0)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("users.user_id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("User", back_populates="promotions")
    carts = relationship("Cart", back_populates="promotion")
    orders = relationship("Order", back_populates="promotion")
    promotion_products = relationship("PromotionProduct", back_populates="promotion")


class Category(Base):
    __tablename__ = "categories"

    category_id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String(100), nullable=False)

    products = relationship("Product", back_populates="category")


class Supplier(Base):
    __tablename__ = "suppliers"

    supplier_id = Column(Integer, primary_key=True, autoincrement=True)
    supplier_name = Column(String(100), nullable=False)
    email = Column(String(150))
    phone = Column(String(20))
    address = Column(String(255))

    products = relationship("Product", back_populates="supplier")
    invoices = relationship("Invoice", back_populates="supplier")


class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String(150), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.category_id"), nullable=False)
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id"))
    price = Column(DECIMAL(12, 2), nullable=False)
    discount_percent = Column(Integer)
    image_url = Column(String(500))
    description = Column(Text)
    stock_quantity = Column(Integer)
    expiration_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)
    is_deleted = Column(Boolean, default=False)
    is_hot = Column(Boolean, default=False)

    category = relationship("Category", back_populates="products")
    supplier = relationship("Supplier", back_populates="products")
    cart_items = relationship("CartItem", back_populates="product")
    order_details = relationship("OrderDetail", back_populates="product")
    invoice_details = relationship("InvoiceDetail", back_populates="product")
    reviews = relationship("Review", back_populates="product")


class Cart(Base):
    __tablename__ = "carts"

    cart_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False, unique=True)
    promo_id = Column(Integer, ForeignKey("promotions.promo_id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

    user = relationship("User", back_populates="carts")
    promotion = relationship("Promotion", back_populates="carts")
    items = relationship("CartItem", back_populates="cart", cascade="all, delete")


class CartItem(Base):
    __tablename__ = "cart_items"

    cart_item_id = Column(Integer, primary_key=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey("carts.cart_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    price = Column(DECIMAL(12, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    cart = relationship("Cart", back_populates="items")
    product = relationship("Product", back_populates="cart_items")


class Feedback(Base):
    __tablename__ = "feedbacks"

    feedback_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    subject = Column(String(200))
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum(FeedbackStatus))

    user = relationship("User", back_populates="feedbacks")


class Invoice(Base):
    __tablename__ = "invoices"

    invoice_id = Column(Integer, primary_key=True, autoincrement=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    supplier = relationship("Supplier", back_populates="invoices")
    details = relationship("InvoiceDetail", back_populates="invoice")


class InvoiceDetail(Base):
    __tablename__ = "invoice_details"

    invoice_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    invoice_id = Column(Integer, ForeignKey("invoices.invoice_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    product_name = Column(String(150), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(DECIMAL(12, 2), nullable=False)
    subtotal = Column(DECIMAL(12, 2))

    invoice = relationship("Invoice", back_populates="details")
    product = relationship("Product", back_populates="invoice_details")


class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotions.promo_id"))
    status = Column(Enum(OrderStatus))
    delivery_address = Column(String(255))
    delivery_date = Column(DateTime)
    order_date = Column(DateTime, default=datetime.utcnow)
    total_amount = Column(DECIMAL(12, 2))
    is_paid = Column(Boolean, default=False)

    user = relationship("User", back_populates="orders")
    promotion = relationship("Promotion", back_populates="orders")
    order_details = relationship("OrderDetail", back_populates="order")


class OrderDetail(Base):
    __tablename__ = "order_details"

    order_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    product_name = Column(String(150), nullable=False)
    unit_price = Column(DECIMAL(12, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    subtotal = Column(DECIMAL(12, 2))

    order = relationship("Order", back_populates="order_details")
    product = relationship("Product", back_populates="order_details")


class PromotionProduct(Base):
    __tablename__ = "promotion_products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    promo_id = Column(Integer, ForeignKey("promotions.promo_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)

    promotion = relationship("Promotion", back_populates="promotion_products")
    product = relationship("Product")


class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")


class UserPromotion(Base):
    __tablename__ = "user_promotions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotions.promo_id"), nullable=False)
    used_at = Column(DateTime, default=datetime.utcnow)
