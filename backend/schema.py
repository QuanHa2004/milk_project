from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

# ------------------------------
# ENUM types
# ------------------------------
class FeedbackStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    resolved = "resolved"

class OrderStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    delivered = "delivered"
    cancelled = "cancelled"

class DiscountType(str, Enum):
    percent = "percent"
    fixed = "fixed"

# ------------------------------
# USER
# ------------------------------
class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    role_name: str
    is_deleted: Optional[bool] = False

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    role_name: Optional[str] = None
    password: Optional[str] = None

class UserOut(UserBase):
    user_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    phone: str | None = None
    address: str | None = None
    password: str



# ------------------------------
# CATEGORY
# ------------------------------
class CategoryBase(BaseModel):
    category_name: str

class CategoryOut(CategoryBase):
    category_id: int

    class Config:
        from_attributes = True


# ------------------------------
# SUPPLIER
# ------------------------------
class SupplierBase(BaseModel):
    supplier_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class SupplierOut(SupplierBase):
    supplier_id: int

    class Config:
        from_attributes = True


# ------------------------------
# PRODUCT
# ------------------------------
class ProductBase(BaseModel):
    product_name: str
    category_id: int
    supplier_id: Optional[int] = None
    price: float
    discount_percent: Optional[int] = 0
    image_url: Optional[str] = None
    description: Optional[str] = None
    stock_quantity: Optional[int] = 0
    is_deleted: Optional[bool] = False
    is_hot: Optional[bool] = False

class ProductOut(ProductBase):
    product_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ------------------------------
# PROMOTION
# ------------------------------
class PromotionBase(BaseModel):
    promo_code: str
    description: Optional[str] = None
    discount_type: DiscountType
    discount_value: float
    min_order_value: Optional[float] = 0.00
    max_uses: Optional[int] = 0
    start_date: datetime
    end_date: datetime
    is_active: Optional[bool] = True

class PromotionOut(PromotionBase):
    promo_id: int
    created_by: Optional[int] = None
    created_at: Optional[datetime] = None
    uses_count: Optional[int] = 0

    class Config:
        from_attributes = True


# ------------------------------
# FEEDBACK
# ------------------------------
class FeedbackBase(BaseModel):
    user_id: int
    subject: Optional[str] = None
    message: Optional[str] = None
    status: Optional[FeedbackStatus] = FeedbackStatus.pending

class FeedbackOut(FeedbackBase):
    feedback_id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ------------------------------
# ORDER
# ------------------------------
class OrderBase(BaseModel):
    user_id: int
    promo_id: Optional[int] = None
    status: Optional[OrderStatus] = OrderStatus.pending
    delivery_address: Optional[str] = None
    delivery_date: Optional[datetime] = None
    total_amount: Optional[float] = 0.00
    is_paid: Optional[bool] = False

class OrderOut(OrderBase):
    order_id: int
    order_date: Optional[datetime] = None

    class Config:
        from_attributes = True


# ------------------------------
# ORDER DETAIL
# ------------------------------
class OrderDetailBase(BaseModel):
    order_id: int
    product_id: int
    product_name: str
    unit_price: float
    quantity: int

class OrderDetailOut(OrderDetailBase):
    order_detail_id: int
    subtotal: Optional[float] = None

    class Config:
        from_attributes = True


# ------------------------------
# REVIEW
# ------------------------------
class ReviewBase(BaseModel):
    product_id: int
    user_id: int
    rating: Optional[int] = None
    comment: Optional[str] = None
    is_deleted: Optional[bool] = False

class ReviewOut(ReviewBase):
    review_id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ------------------------------
# INVOICE
# ------------------------------
class InvoiceBase(BaseModel):
    supplier_id: int

class InvoiceOut(InvoiceBase):
    invoice_id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ------------------------------
# INVOICE DETAIL
# ------------------------------
class InvoiceDetailBase(BaseModel):
    invoice_id: int
    product_id: int
    product_name: str
    quantity: int
    unit_price: float

class InvoiceDetailOut(InvoiceDetailBase):
    invoice_detail_id: int
    subtotal: Optional[float] = None

    class Config:
        from_attributes = True


# ------------------------------
# USER PROMOTION
# ------------------------------
class UserPromotionBase(BaseModel):
    user_id: int
    promo_id: int

class UserPromotionOut(UserPromotionBase):
    id: int
    used_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ------------------------------
# PROMOTION PRODUCT
# ------------------------------
class PromotionProductBase(BaseModel):
    promo_id: int
    product_id: int

class PromotionProductOut(PromotionProductBase):
    id: int

    class Config:
        from_attributes = True
