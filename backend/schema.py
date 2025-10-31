# ================================
# schema.py
# ================================
from pydantic import BaseModel, EmailStr, Field, validator
from typing import List, Optional
from datetime import datetime, date
from enum import Enum


# ======================
# ENUMS
# ======================
class DiscountType(str, Enum):
    percent = "percent"
    fixed = "fixed"


class FeedbackStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    resolved = "resolved"


class OrderStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    delivered = "delivered"
    cancelled = "cancelled"


# ======================
# ROLE
# ======================
class RoleBase(BaseModel):
    role_name: str
    description: Optional[str] = None


class RoleCreate(RoleBase):
    pass


class RoleOut(RoleBase):
    role_id: int

    class Config:
        from_attributes = True


# ======================
# USER
# ======================
class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


class UserOut(UserBase):
    user_id: int
    role_id: int
    created_at: datetime
    is_deleted: bool

    class Config:
        from_attributes = True

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    phone: str | None = None
    address: str | None = None
    password: str


# ======================
# CATEGORY
# ======================
class CategoryBase(BaseModel):
    category_name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    category_id: int

    class Config:
        from_attributes = True


# ======================
# SUPPLIER
# ======================
class SupplierBase(BaseModel):
    supplier_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class SupplierCreate(SupplierBase):
    pass


class SupplierOut(SupplierBase):
    supplier_id: int

    class Config:
        from_attributes = True


# ======================
# PRODUCT
# ======================
class ProductBase(BaseModel):
    product_name: str
    category_id: int
    supplier_id: Optional[int]
    price: float
    discount_percent: Optional[int] = 0
    image_url: Optional[str] = None
    description: Optional[str] = None
    stock_quantity: int = Field(ge=0)
    expiration_date: Optional[date] = None


class ProductCreate(ProductBase):
    pass


class ProductOut(ProductBase):
    product_id: int
    created_at: datetime
    is_deleted: bool
    is_hot: bool

    class Config:
        from_attributes = True


# ======================
# PROMOTION
# ======================
class PromotionBase(BaseModel):
    promo_code: str
    description: Optional[str] = None
    discount_type: DiscountType
    discount_value: float
    min_order_value: Optional[float] = None
    max_uses: Optional[int] = None
    start_date: datetime
    end_date: datetime
    is_active: Optional[bool] = True


class PromotionCreate(PromotionBase):
    created_by: int


class PromotionOut(PromotionBase):
    promo_id: int
    uses_count: int
    created_at: datetime

    class Config:
        from_attributes = True


# ======================
# CART & CART ITEM
# ======================
class CartItemBase(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)
    price: float


class CartItemCreate(CartItemBase):
    pass


class CartItemOut(CartItemBase):
    cart_item_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CartBase(BaseModel):
    promo_id: Optional[int] = None


class CartCreate(CartBase):
    user_id: int


class CartOut(CartBase):
    cart_id: int
    user_id: int
    created_at: datetime
    items: List[CartItemOut] = []

    class Config:
        from_attributes = True


# ======================
# ORDER & ORDER DETAIL
# ======================
class OrderDetailBase(BaseModel):
    product_id: int
    product_name: str
    unit_price: float
    quantity: int = Field(gt=0)
    subtotal: float


class OrderDetailOut(OrderDetailBase):
    order_detail_id: int

    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    user_id: int
    promo_id: Optional[int]
    status: Optional[OrderStatus] = OrderStatus.pending
    delivery_address: Optional[str]
    total_amount: float
    delivery_date: Optional[datetime]


class OrderCreate(OrderBase):
    order_details: List[OrderDetailBase]


class OrderOut(OrderBase):
    order_id: int
    order_date: datetime
    is_paid: bool
    order_details: List[OrderDetailOut]

    class Config:
        from_attributes = True


# ======================
# FEEDBACK
# ======================
class FeedbackBase(BaseModel):
    subject: Optional[str]
    message: str


class FeedbackCreate(FeedbackBase):
    user_id: int


class FeedbackOut(FeedbackBase):
    feedback_id: int
    user_id: int
    created_at: datetime
    status: FeedbackStatus

    class Config:
        from_attributes = True


# ======================
# REVIEW
# ======================
class ReviewBase(BaseModel):
    product_id: int
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None


class ReviewCreate(ReviewBase):
    user_id: int


class ReviewOut(ReviewBase):
    review_id: int
    user_id: int
    created_at: datetime
    is_deleted: bool

    class Config:
        from_attributes = True
