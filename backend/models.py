from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, DECIMAL, Enum, Date, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Role(Base):
    __tablename__ = "role"

    role_id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))

    users = relationship("User", back_populates="role")

class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone = Column(String(20))
    address = Column(String(255))
    password_hash = Column(String(255), nullable=False)
    role_id = Column(Integer, ForeignKey("role.role_id"), nullable=False)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)

    role = relationship("Role", back_populates="users")
    cart = relationship("Cart", back_populates="user", uselist=False)
    reviews = relationship("Review", back_populates="user")
    orders = relationship("Order", back_populates="user")
    promotions_created = relationship("Promotion", back_populates="creator")
    user_promotions = relationship("UserPromotion", back_populates="user")

class Cart(Base):
    __tablename__ = "cart"

    cart_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="cart")
    items = relationship("CartItem", back_populates="cart", cascade="all, delete")

class Category(Base):
    __tablename__ = "category"

    category_id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(100), unique=True, nullable=False)

    products = relationship("Product", back_populates="category")

class Manufacturer(Base):
    __tablename__ = "manufacturer"

    manufacturer_id = Column(Integer, primary_key=True)
    manufacturer_name = Column(String(150), unique=True, nullable=False)
    email = Column(String(150))
    phone = Column(String(20))
    address = Column(String(255))

    products = relationship("Product", back_populates="manufacturer")

class Product(Base):
    __tablename__ = "product"

    product_id = Column(Integer, primary_key=True)
    product_name = Column(String(150), nullable=False)
    category_id = Column(Integer, ForeignKey("category.category_id"), nullable=False)
    manufacturer_id = Column(Integer, ForeignKey("manufacturer.manufacturer_id"))
    price = Column(DECIMAL(12, 2), nullable=False)
    discount_percent = Column(Integer, default=0)
    image_url = Column(String(500))
    description = Column(Text)
    stock_quantity = Column(Integer, default=0)
    expiration_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)
    is_hot = Column(Boolean, default=False)

    category = relationship("Category", back_populates="products")
    manufacturer = relationship("Manufacturer", back_populates="products")
    cart_items = relationship("CartItem", back_populates="product")
    invoice_details = relationship("InvoiceDetail", back_populates="product")
    order_details = relationship("OrderDetail", back_populates="product")
    details = relationship("ProductDetail", back_populates="product", uselist=False)
    reviews = relationship("Review", back_populates="product")

class CartItem(Base):
    __tablename__ = "cart_item"

    cart_id = Column(Integer, ForeignKey("cart.cart_id"), primary_key=True)
    product_id = Column(Integer, ForeignKey("product.product_id"), primary_key=True)
    quantity = Column(Integer, default=1)
    is_checked = Column(Boolean, default=False)

    cart = relationship("Cart", back_populates="items")
    product = relationship("Product", back_populates="cart_items")

class Supplier(Base):
    __tablename__ = "supplier"

    supplier_id = Column(Integer, primary_key=True)
    supplier_name = Column(String(100), unique=True, nullable=False)
    email = Column(String(150))
    phone = Column(String(20))
    address = Column(String(255))

    invoices = relationship("Invoice", back_populates="supplier")

class Invoice(Base):
    __tablename__ = "invoice"

    import_id = Column(Integer, primary_key=True)
    supplier_id = Column(Integer, ForeignKey("supplier.supplier_id"))
    total_amount = Column(DECIMAL(12, 2), default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    supplier = relationship("Supplier", back_populates="invoices")
    details = relationship("InvoiceDetail", back_populates="invoice", cascade="all, delete")

class InvoiceDetail(Base):
    __tablename__ = "invoice_detail"

    invoice_detail_id = Column(Integer, primary_key=True)
    invoice_id = Column(Integer, ForeignKey("invoice.import_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.product_id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(DECIMAL(12, 2), nullable=False)

    invoice = relationship("Invoice", back_populates="details")
    product = relationship("Product", back_populates="invoice_details")

class Promotion(Base):
    __tablename__ = "promotion"

    promo_id = Column(Integer, primary_key=True)
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
    created_by = Column(Integer, ForeignKey("user.user_id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("User", back_populates="promotions_created")
    orders = relationship("Order", back_populates="promotion")
    user_promotions = relationship("UserPromotion", back_populates="promotion")

class Order(Base):
    __tablename__ = "order"

    order_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotion.promo_id"))
    status = Column(Enum("pending", "confirmed", "delivered", "cancelled"), default="pending")
    delivery_address = Column(String(255))
    delivery_date = Column(DateTime)
    order_date = Column(DateTime, default=datetime.utcnow)
    total_amount = Column(DECIMAL(12, 2))
    is_paid = Column(Boolean)

    user = relationship("User", back_populates="orders")
    promotion = relationship("Promotion", back_populates="orders")
    details = relationship("OrderDetail", back_populates="order", cascade="all, delete")

class OrderDetail(Base):
    __tablename__ = "order_detail"

    order_detail_id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("order.order_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.product_id"), nullable=False)
    price = Column(DECIMAL(12, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_amount = Column(DECIMAL(12, 2))

    order = relationship("Order", back_populates="details")
    product = relationship("Product", back_populates="order_details")

class ProductDetail(Base):
    __tablename__ = "product_detail"

    product_id = Column(Integer, ForeignKey("product.product_id"), primary_key=True)
    ingredients = Column(Text)
    usage = Column(Text)
    storage = Column(Text)
    nutrition_info = Column(Text)
    origin = Column(String(255))

    product = relationship("Product", back_populates="details")

class Review(Base):
    __tablename__ = "review"

    review_id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("product.product_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")

class UserPromotion(Base):
    __tablename__ = "user_promotion"

    user_promotion_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    promo_id = Column(Integer, ForeignKey("promotion.promo_id"), nullable=False)
    used_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="user_promotions")
    promotion = relationship("Promotion", back_populates="user_promotions")
