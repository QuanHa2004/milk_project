from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, DateTime, DECIMAL, Enum,
    ForeignKey, Boolean, Date, UniqueConstraint
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


class Role(Base):
    __tablename__ = "role"

    role_id = Column(Integer, primary_key=True, autoincrement=True)
    role_name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))

    user = relationship("User", back_populates="role")


class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone = Column(String(20))
    address = Column(String(255))
    password_hash = Column(String(255), nullable=False)
    role_id = Column(Integer, ForeignKey("role.role_id", ondelete="RESTRICT"), nullable=False)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

    role = relationship("Role", back_populates="user")
    cart = relationship("Cart", back_populates="user")
    review = relationship("Review", back_populates="user")
    order = relationship("Order", back_populates="user")
    promotion_created = relationship("Promotion", back_populates="creator")
    user_promotion = relationship("UserPromotion", back_populates="user")


class Promotion(Base):
    __tablename__ = "promotion"

    promo_id = Column(Integer, primary_key=True, autoincrement=True)
    promo_code = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))
    discount_type = Column(Enum("percent", "fixed"))
    discount_value = Column(DECIMAL(10, 2), nullable=False)
    min_order_value = Column(DECIMAL(12, 2))
    max_uses = Column(Integer)
    uses_count = Column(Integer, default=0)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("user.user_id", ondelete="SET NULL"))
    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("User", back_populates="promotion_created")
    order = relationship("Order", back_populates="promotion")
    user_promotion = relationship("UserPromotion", back_populates="promotion")


class Cart(Base):
    __tablename__ = "cart"

    cart_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.user_id", ondelete="CASCADE"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="cart")
    cart_item = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")


class CartItem(Base):
    __tablename__ = "cart_item"

    cart_id = Column(Integer, ForeignKey("cart.cart_id"), primary_key=True)
    product_id = Column(Integer, ForeignKey("product.product_id"), primary_key=True)
    quantity = Column(Integer, default=1)
    price = Column(DECIMAL(12, 2), nullable=False)
    is_checked = Column(Boolean, default=False)

    cart = relationship("Cart", back_populates="cart_item")
    product = relationship("Product", back_populates="cart_item")


class Category(Base):
    __tablename__ = "category"

    category_id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String(100), unique=True, nullable=False)

    product = relationship("Product", back_populates="category")


class Manufacturer(Base):
    __tablename__ = "manufacturer"

    manufacturer_id = Column(Integer, primary_key=True, autoincrement=True)
    manufacturer_name = Column(String(150), unique=True, nullable=False)
    email = Column(String(150))
    phone = Column(String(20))
    address = Column(String(255))

    product = relationship("Product", back_populates="manufacturer")
    product_source = relationship("productource", back_populates="manufacturer")


class Supplier(Base):
    __tablename__ = "supplier"

    supplier_id = Column(Integer, primary_key=True, autoincrement=True)
    supplier_name = Column(String(100), unique=True, nullable=False)
    email = Column(String(150))
    phone = Column(String(20))
    address = Column(String(255))

    product_source = relationship("productource", back_populates="supplier")


class Product(Base):
    __tablename__ = "product"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String(150), nullable=False)
    category_id = Column(Integer, ForeignKey("category.category_id", ondelete="RESTRICT"), nullable=False)
    manufacturer_id = Column(Integer, ForeignKey("manufacturer.manufacturer_id", ondelete="SET NULL"))
    price = Column(DECIMAL(12, 2), nullable=False)
    discount_percent = Column(Integer, default=0)
    image_url = Column(String(500))
    description = Column(Text)
    stock_quantity = Column(Integer, default=0)
    expiration_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)
    is_hot = Column(Boolean, default=False)

    category = relationship("Category", back_populates="product")
    manufacturer = relationship("Manufacturer", back_populates="product")
    product_detail = relationship("ProductDetail", back_populates="product", uselist=False)
    product_source = relationship("productource", back_populates="product")
    order_detail = relationship("OrderDetail", back_populates="product")
    invoice_detail = relationship("InvoiceDetail", back_populates="product")
    review = relationship("Review", back_populates="product")
    cart_item = relationship("CartItem", back_populates="product")


class productource(Base):
    __tablename__ = "product_source"

    product_source_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("product.product_id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    manufacturer_id = Column(Integer, ForeignKey("manufacturer.manufacturer_id", ondelete="SET NULL", onupdate="CASCADE"))
    supplier_id = Column(Integer, ForeignKey("supplier.supplier_id", ondelete="SET NULL", onupdate="CASCADE"))

    product = relationship("Product", back_populates="product_source")
    manufacturer = relationship("Manufacturer", back_populates="product_source")
    supplier = relationship("Supplier", back_populates="product_source")
    invoice = relationship("Invoice", back_populates="product_source")


class Invoice(Base):
    __tablename__ = "invoice"

    invoice_id = Column(Integer, primary_key=True, autoincrement=True)
    product_source_id = Column(Integer, ForeignKey("product_source.product_source_id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    total_amount = Column(DECIMAL(12, 2), default=0.00)
    created_at = Column(DateTime, default=datetime.utcnow)

    product_source = relationship("productource", back_populates="invoice")
    details = relationship("InvoiceDetail", back_populates="invoice", cascade="all, delete")


class InvoiceDetail(Base):
    __tablename__ = "invoice_detail"

    invoice_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    invoice_id = Column(Integer, ForeignKey("invoice.invoice_id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.product_id", ondelete="CASCADE"), nullable=False)
    product_name = Column(String(150), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(DECIMAL(12, 2), nullable=False)

    invoice = relationship("Invoice", back_populates="details")
    product = relationship("Product", back_populates="invoice_detail")


class Order(Base):
    __tablename__ = "order"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotion.promo_id"))
    status = Column(Enum("pending", "confirmed", "delivered", "cancelled"), default="pending")
    delivery_address = Column(String(255))
    delivery_date = Column(DateTime)
    order_date = Column(DateTime, default=datetime.utcnow)
    total_amount = Column(DECIMAL(12, 2))
    is_paid = Column(Boolean, default=False)

    user = relationship("User", back_populates="order")
    promotion = relationship("Promotion", back_populates="order")
    order_detail = relationship("OrderDetail", back_populates="order", cascade="all, delete")


class OrderDetail(Base):
    __tablename__ = "order_detail"

    order_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("order.order_id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.product_id", ondelete="CASCADE"), nullable=False)
    product_name = Column(String(150), nullable=False)
    price = Column(DECIMAL(12, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_amount = Column(DECIMAL(12, 2))

    order = relationship("Order", back_populates="order_detail")
    product = relationship("Product", back_populates="order_detail")


class ProductDetail(Base):
    __tablename__ = "product_detail"

    product_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("product.product_id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    ingredients = Column(Text)
    usage = Column(Text)
    storage = Column(Text)
    nutrition_info = Column(Text)
    origin = Column(String(255))

    product = relationship("Product", back_populates="product_detail")


class Review(Base):
    __tablename__ = "review"
    __table_args__ = (UniqueConstraint("product_id", "user_id", name="uq_review_product_user"),)

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("product.product_id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.user_id", ondelete="CASCADE"), nullable=False)
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)

    product = relationship("Product", back_populates="review")
    user = relationship("User", back_populates="review")


class UserPromotion(Base):
    __tablename__ = "user_promotion"
    __table_args__ = (UniqueConstraint("user_id", "promo_id", name="uq_user_promotion_user_promo"),)

    user_promotion_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotion.promo_id"), nullable=False)
    used_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="user_promotion")
    promotion = relationship("Promotion", back_populates="user_promotion")
