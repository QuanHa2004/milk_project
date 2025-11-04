from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from decimal import Decimal


# ==========================
# 1️⃣ Roles
# ==========================
class RoleBase(BaseModel):
    role_name: str
    description: Optional[str] = None

class RoleCreate(RoleBase):
    pass

class RoleResponse(RoleBase):
    role_id: int
    class Config:
        orm_mode = True


# ==========================
# 2️⃣ Users
# ==========================
class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    role_id: int

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    user_id: int
    is_deleted: bool = False
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 3️⃣ Promotions
# ==========================
class PromotionBase(BaseModel):
    promo_code: str
    description: Optional[str] = None
    discount_type: Optional[str] = None
    discount_value: Decimal
    min_order_value: Optional[Decimal] = None
    max_uses: Optional[int] = None
    start_date: datetime
    end_date: datetime
    is_active: bool = True

class PromotionCreate(PromotionBase):
    created_by: Optional[int] = None

class PromotionResponse(PromotionBase):
    promo_id: int
    uses_count: int = 0
    created_at: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 4️⃣ Categories
# ==========================
class CategoryBase(BaseModel):
    category_name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    category_id: int
    class Config:
        orm_mode = True


# ==========================
# 5️⃣ Manufacturers
# ==========================
class ManufacturerBase(BaseModel):
    manufacturer_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class ManufacturerCreate(ManufacturerBase):
    pass

class ManufacturerResponse(ManufacturerBase):
    manufacturer_id: int
    created_at: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 6️⃣ Suppliers
# ==========================
class SupplierBase(BaseModel):
    supplier_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class SupplierCreate(SupplierBase):
    pass

class SupplierResponse(SupplierBase):
    supplier_id: int
    created_at: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 7️⃣ Products
# ==========================
class ProductBase(BaseModel):
    product_name: str
    category_id: int
    manufacturer_id: Optional[int] = None
    price: float
    discount_percent: Optional[int] = 0
    image_url: Optional[str] = None
    description: Optional[str] = None
    stock_quantity: Optional[int] = 0
    expiration_date: Optional[date] = None
    is_deleted: Optional[bool] = False
    is_hot: Optional[bool] = False

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    product_id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 8️⃣ Product Details
# ==========================
class ProductDetailBase(BaseModel):
    product_id: int
    ingredients: Optional[str] = None
    usage: Optional[str] = None
    storage: Optional[str] = None
    nutrition_info: Optional[str] = None
    origin: Optional[str] = None

class ProductDetailCreate(ProductDetailBase):
    pass

class ProductDetailResponse(ProductDetailBase):
    product_detail_id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 9️⃣ Product Sources
# ==========================
class ProductSourceBase(BaseModel):
    product_id: int
    manufacturer_id: Optional[int] = None
    supplier_id: Optional[int] = None

class ProductSourceCreate(ProductSourceBase):
    pass

class ProductSourceResponse(ProductSourceBase):
    product_source_id: int
    class Config:
        orm_mode = True


# ==========================
# 🔟 Orders
# ==========================
class OrderBase(BaseModel):
    user_id: int
    promo_id: Optional[int] = None
    status: Optional[str] = "pending"
    delivery_address: Optional[str] = None
    delivery_date: Optional[datetime] = None
    total_amount: Optional[Decimal] = None
    is_paid: Optional[bool] = False

class OrderCreate(OrderBase):
    pass

class OrderResponse(OrderBase):
    order_id: int
    order_date: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 11️⃣ Order Details
# ==========================
class OrderDetailBase(BaseModel):
    order_id: int
    product_id: int
    product_name: str
    unit_price: Decimal
    quantity: int
    subtotal: Optional[Decimal] = None

class OrderDetailCreate(OrderDetailBase):
    pass

class OrderDetailResponse(OrderDetailBase):
    order_detail_id: int
    class Config:
        orm_mode = True


# ==========================
# 12️⃣ Invoices
# ==========================
class InvoiceBase(BaseModel):
    product_source_id: int
    total_amount: Optional[Decimal] = Decimal("0.00")

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceResponse(InvoiceBase):
    invoice_id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 13️⃣ Invoice Details
# ==========================
class InvoiceDetailBase(BaseModel):
    invoice_id: int
    product_id: int
    product_name: str
    quantity: int
    unit_price: Decimal
    subtotal: Optional[Decimal] = None

class InvoiceDetailCreate(InvoiceDetailBase):
    pass

class InvoiceDetailResponse(InvoiceDetailBase):
    invoice_detail_id: int
    class Config:
        orm_mode = True


# ==========================
# 14️⃣ Feedbacks
# ==========================
class FeedbackBase(BaseModel):
    user_id: int
    product_id: Optional[int] = None
    subject: Optional[str] = None
    message: Optional[str] = None
    status: Optional[str] = "pending"

class FeedbackCreate(FeedbackBase):
    pass

class FeedbackResponse(FeedbackBase):
    feedback_id: int
    created_at: Optional[datetime]
    class Config:
        orm_mode = True


# ==========================
# 15️⃣ Reviews
# ==========================
class ReviewBase(BaseModel):
    product_id: int
    user_id: int
    rating: Optional[int] = None
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    review_id: int
    created_at: Optional[datetime]
    is_deleted: bool = False
    class Config:
        orm_mode = True


# ==========================
# 16️⃣ Cart & Cart Items
# ==========================
class CartItemBase(BaseModel):
    cart_id: int
    product_id: int
    quantity: int
    price: Decimal
    is_checked: Optional[bool] = False

class CartItemCreate(CartItemBase):
    pass

class CartItemResponse(CartItemBase):
    cart_item_id: int
    created_at: Optional[datetime]
    class Config:
        orm_mode = True


class CartBase(BaseModel):
    user_id: int
    promo_id: Optional[int] = None

class CartCreate(CartBase):
    pass


class CartItemUpdate(BaseModel):
    product_id: int = Field(..., description="ID sản phẩm cần cập nhật")
    quantity: int = Field(..., ge=0, description="Số lượng mới của sản phẩm. Nếu <=0 sẽ xóa sản phẩm")


class CartResponse(CartBase):
    cart_id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    items: Optional[List[CartItemResponse]] = []
    class Config:
        orm_mode = True


# ==========================
# 17️⃣ User Promotions
# ==========================
class UserPromotionBase(BaseModel):
    user_id: int
    promo_id: int

class UserPromotionCreate(UserPromotionBase):
    pass

class UserPromotionResponse(UserPromotionBase):
    id: int
    used_at: Optional[datetime]
    class Config:
        orm_mode = True
