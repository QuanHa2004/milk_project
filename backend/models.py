from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, DateTime, DECIMAL, Enum,
    ForeignKey, Boolean, Date, UniqueConstraint
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


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
    role_id = Column(Integer, ForeignKey("roles.role_id", ondelete="RESTRICT"), nullable=False)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

    role = relationship("Role", back_populates="users")
    carts = relationship("Cart", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    orders = relationship("Order", back_populates="user")
    promotions_created = relationship("Promotion", back_populates="creator")
    user_promotions = relationship("UserPromotion", back_populates="user")


class Promotion(Base):
    __tablename__ = "promotions"

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
    created_by = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"))
    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("User", back_populates="promotions_created")
    orders = relationship("Order", back_populates="promotion")
    user_promotions = relationship("UserPromotion", back_populates="promotion")


class Cart(Base):
    __tablename__ = "carts"

    cart_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

    user = relationship("User", back_populates="carts")
    items = relationship("CartItem", back_populates="cart", cascade="all, delete")


class CartItem(Base):
    __tablename__ = "cart_items"
    __table_args__ = (UniqueConstraint("cart_id", "product_id", name="uq_cart_items_cart_product"),)

    cart_item_id = Column(Integer, primary_key=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey("carts.cart_id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    price = Column(DECIMAL(12, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_checked = Column(Boolean, default=False)

    cart = relationship("Cart", back_populates="items")
    product = relationship("Product", back_populates="cart_items")


class Category(Base):
    __tablename__ = "categories"

    category_id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String(100), unique=True, nullable=False)

    products = relationship("Product", back_populates="category")


class Manufacturer(Base):
    __tablename__ = "manufacturers"

    manufacturer_id = Column(Integer, primary_key=True, autoincrement=True)
    manufacturer_name = Column(String(150), unique=True, nullable=False)
    email = Column(String(150))
    phone = Column(String(20))
    address = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    products = relationship("Product", back_populates="manufacturer")
    product_sources = relationship("ProductSource", back_populates="manufacturer")


class Supplier(Base):
    __tablename__ = "suppliers"

    supplier_id = Column(Integer, primary_key=True, autoincrement=True)
    supplier_name = Column(String(100), unique=True, nullable=False)
    email = Column(String(150))
    phone = Column(String(20))
    address = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    product_sources = relationship("ProductSource", back_populates="supplier")


class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String(150), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.category_id", ondelete="RESTRICT"), nullable=False)
    manufacturer_id = Column(Integer, ForeignKey("manufacturers.manufacturer_id", ondelete="SET NULL"))
    price = Column(DECIMAL(12, 2), nullable=False)
    discount_percent = Column(Integer, default=0)
    image_url = Column(String(500))
    description = Column(Text)
    stock_quantity = Column(Integer, default=0)
    expiration_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)
    is_deleted = Column(Boolean, default=False)
    is_hot = Column(Boolean, default=False)

    category = relationship("Category", back_populates="products")
    manufacturer = relationship("Manufacturer", back_populates="products")
    product_detail = relationship("ProductDetail", back_populates="product", uselist=False)
    product_source = relationship("ProductSource", back_populates="product")
    order_details = relationship("OrderDetail", back_populates="product")
    invoice_details = relationship("InvoiceDetail", back_populates="product")
    reviews = relationship("Review", back_populates="product")
    cart_items = relationship("CartItem", back_populates="product")


class ProductSource(Base):
    __tablename__ = "product_sources"

    product_source_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    manufacturer_id = Column(Integer, ForeignKey("manufacturers.manufacturer_id", ondelete="SET NULL", onupdate="CASCADE"))
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id", ondelete="SET NULL", onupdate="CASCADE"))

    product = relationship("Product", back_populates="product_source")
    manufacturer = relationship("Manufacturer", back_populates="product_sources")
    supplier = relationship("Supplier", back_populates="product_sources")
    invoices = relationship("Invoice", back_populates="product_source")


class Invoice(Base):
    __tablename__ = "invoices"

    invoice_id = Column(Integer, primary_key=True, autoincrement=True)
    product_source_id = Column(Integer, ForeignKey("product_sources.product_source_id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    total_amount = Column(DECIMAL(12, 2), default=0.00)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

    product_source = relationship("ProductSource", back_populates="invoices")
    details = relationship("InvoiceDetail", back_populates="invoice", cascade="all, delete")


class InvoiceDetail(Base):
    __tablename__ = "invoice_details"

    invoice_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    invoice_id = Column(Integer, ForeignKey("invoices.invoice_id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE"), nullable=False)
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
    status = Column(Enum("pending", "confirmed", "delivered", "cancelled"), default="pending")
    delivery_address = Column(String(255))
    delivery_date = Column(DateTime)
    order_date = Column(DateTime, default=datetime.utcnow)
    total_amount = Column(DECIMAL(12, 2))
    is_paid = Column(Boolean, default=False)

    user = relationship("User", back_populates="orders")
    promotion = relationship("Promotion", back_populates="orders")
    order_details = relationship("OrderDetail", back_populates="order", cascade="all, delete")


class OrderDetail(Base):
    __tablename__ = "order_details"

    order_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.order_id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE"), nullable=False)
    product_name = Column(String(150), nullable=False)
    unit_price = Column(DECIMAL(12, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    subtotal = Column(DECIMAL(12, 2))

    order = relationship("Order", back_populates="order_details")
    product = relationship("Product", back_populates="order_details")


class ProductDetail(Base):
    __tablename__ = "product_details"

    product_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    ingredients = Column(Text)
    usage = Column(Text)
    storage = Column(Text)
    nutrition_info = Column(Text)
    origin = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

    product = relationship("Product", back_populates="product_detail")


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = (UniqueConstraint("product_id", "user_id", name="uq_reviews_product_user"),)

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")


class UserPromotion(Base):
    __tablename__ = "user_promotions"
    __table_args__ = (UniqueConstraint("user_id", "promo_id", name="uq_user_promotions_user_promo"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotions.promo_id"), nullable=False)
    used_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="user_promotions")
    promotion = relationship("Promotion", back_populates="user_promotions")
