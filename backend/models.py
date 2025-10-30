from sqlalchemy import (
    Column, Integer, String, Text, DECIMAL, DateTime, ForeignKey, Boolean, Enum, UniqueConstraint
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import enum


# ---------------- ENUMS ----------------
class OrderStatusEnum(enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    delivered = "delivered"
    cancelled = "cancelled"


class PromotionDiscountType(enum.Enum):
    percent = "percent"
    fixed = "fixed"


class FeedbackStatusEnum(enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    resolved = "resolved"


# ---------------- MODELS ----------------

class Category(Base):
    __tablename__ = "categories"

    category_id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String(100), nullable=False)

    products = relationship("Product", back_populates="category")


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone = Column(String(20))
    address = Column(String(255))
    password_hash = Column(String(255), nullable=False)
    role_name = Column(String(20), nullable=False)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    feedbacks = relationship("Feedback", back_populates="user")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    promotions = relationship("Promotion", back_populates="creator")
    user_promotions = relationship("UserPromotion", back_populates="user")


class Supplier(Base):
    __tablename__ = "suppliers"

    supplier_id = Column(Integer, primary_key=True, autoincrement=True)
    supplier_name = Column(String(100), nullable=False)
    email = Column(String(150))
    phone = Column(String(20))
    address = Column(String(255))

    invoices = relationship("Invoice", back_populates="supplier")
    products = relationship("Product", back_populates="supplier")


class Invoice(Base):
    __tablename__ = "invoices"

    invoice_id = Column(Integer, primary_key=True, autoincrement=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    supplier = relationship("Supplier", back_populates="invoices")
    invoice_details = relationship("InvoiceDetail", back_populates="invoice")


class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String(150), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.category_id"), nullable=False)
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id"))
    price = Column(DECIMAL(12, 2), nullable=False)
    discount_percent = Column(Integer, default=0)
    image_url = Column(String(500))
    description = Column(Text)
    stock_quantity = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    is_deleted = Column(Boolean, default=False)
    is_hot = Column(Boolean, default=False)

    category = relationship("Category", back_populates="products")
    supplier = relationship("Supplier", back_populates="products")
    invoice_details = relationship("InvoiceDetail", back_populates="product")
    order_details = relationship("OrderDetail", back_populates="product")
    promotion_products = relationship("PromotionProduct", back_populates="product")
    reviews = relationship("Review", back_populates="product")


class InvoiceDetail(Base):
    __tablename__ = "invoice_details"

    invoice_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    invoice_id = Column(Integer, ForeignKey("invoices.invoice_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    product_name = Column(String(150), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(DECIMAL(12, 2), nullable=False)
    subtotal = Column(DECIMAL(12, 2))

    invoice = relationship("Invoice", back_populates="invoice_details")
    product = relationship("Product", back_populates="invoice_details")


class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotions.promo_id"))
    status = Column(Enum(OrderStatusEnum), default=OrderStatusEnum.pending)
    delivery_address = Column(String(255))
    delivery_date = Column(DateTime)
    order_date = Column(DateTime, server_default=func.now())
    total_amount = Column(DECIMAL(12, 2), default=0.00)
    is_paid = Column(Boolean, default=False)

    user = relationship("User", back_populates="orders")
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


class Promotion(Base):
    __tablename__ = "promotions"

    promo_id = Column(Integer, primary_key=True, autoincrement=True)
    promo_code = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))
    discount_type = Column(Enum(PromotionDiscountType), default=PromotionDiscountType.percent)
    discount_value = Column(DECIMAL(10, 2), nullable=False)
    min_order_value = Column(DECIMAL(12, 2), default=0.00)
    max_uses = Column(Integer, default=0)
    uses_count = Column(Integer, default=0)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("users.user_id"))
    created_at = Column(DateTime, server_default=func.now())

    creator = relationship("User", back_populates="promotions")
    promotion_products = relationship("PromotionProduct", back_populates="promotion")
    user_promotions = relationship("UserPromotion", back_populates="promotion")


class PromotionProduct(Base):
    __tablename__ = "promotion_products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    promo_id = Column(Integer, ForeignKey("promotions.promo_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)

    __table_args__ = (UniqueConstraint("promo_id", "product_id"),)

    promotion = relationship("Promotion", back_populates="promotion_products")
    product = relationship("Product", back_populates="promotion_products")


class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    is_deleted = Column(Boolean, default=False)

    __table_args__ = (UniqueConstraint("product_id", "user_id"),)

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")


class UserPromotion(Base):
    __tablename__ = "user_promotions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotions.promo_id"), nullable=False)
    used_at = Column(DateTime, server_default=func.now())

    __table_args__ = (UniqueConstraint("user_id", "promo_id"),)

    user = relationship("User", back_populates="user_promotions")
    promotion = relationship("Promotion", back_populates="user_promotions")


class Feedback(Base):
    __tablename__ = "feedbacks"

    feedback_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    subject = Column(String(200))
    message = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    status = Column(Enum(FeedbackStatusEnum), default=FeedbackStatusEnum.pending)

    user = relationship("User", back_populates="feedbacks")
