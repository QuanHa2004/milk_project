from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from decimal import Decimal
from enum import Enum


class DiscountTypeEnum(str, Enum):
    percent = "percent"
    fixed = "fixed"


class StatusEnum(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    delivered = "delivered"
    cancelled = "cancelled"


class RoleBase(BaseModel):
    role_name: str
    description: Optional[str] = None


class RoleCreate(RoleBase):
    pass


class RoleResponse(RoleBase):
    role_id: int

    class Config:
        from_attributes = True


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
        from_attributes = True


class PromotionBase(BaseModel):
    promo_code: str
    description: Optional[str] = None
    discount_type: DiscountTypeEnum
    discount_value: Decimal
    max_discount_value: Optional[Decimal] = None
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
        from_attributes = True


class CategoryBase(BaseModel):
    category_name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    category_id: int

    class Config:
        from_attributes = True


class ManufacturerBase(BaseModel):
    manufacturer_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class ManufacturerCreate(ManufacturerBase):
    pass


class ManufacturerResponse(ManufacturerBase):
    manufacturer_id: int

    class Config:
        from_attributes = True


class SupplierBase(BaseModel):
    supplier_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class SupplierCreate(SupplierBase):
    pass


class SupplierResponse(SupplierBase):
    supplier_id: int

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    product_name: str
    category_id: int
    manufacturer_id: Optional[int] = None
    price: Decimal
    discount_percent: Optional[int] = 0
    image_url: Optional[str] = None
    description: Optional[str] = None
    is_deleted: Optional[bool] = False
    is_hot: Optional[bool] = False


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    product_id: int
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


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
    class Config:
        from_attributes = True

class ProductBatchBase(BaseModel):
    product_id: int
    quantity: int = Field(..., ge=0, description="Số lượng tồn kho phải >= 0")
    expiration_date: datetime
    invoice_detail_id: Optional[int] = None # Để truy xuất nguồn gốc nhập hàng


class ProductBatchCreate(ProductBatchBase):
    pass
    

class ProductBatchResponse(ProductBatchBase):
    batch_id: int
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


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
        from_attributes = True


class OrderDetailBase(BaseModel):
    order_id: int
    product_id: int
    price: Decimal
    quantity: int
    total_amount: Optional[Decimal] = None


class OrderDetailCreate(OrderDetailBase):
    pass


class OrderDetailResponse(OrderDetailBase):
    order_detail_id: int

    class Config:
        from_attributes = True


class InvoiceBase(BaseModel):
    supplier_id: int
    total_amount: Optional[Decimal] = Decimal("0.00")


class InvoiceCreate(InvoiceBase):
    pass


class InvoiceResponse(InvoiceBase):
    invoice_id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class InvoiceDetailBase(BaseModel):
    invoice_id: int
    product_id: int
    quantity: int
    price: Decimal


class InvoiceDetailCreate(InvoiceDetailBase):
    pass


class InvoiceDetailResponse(InvoiceDetailBase):
    invoice_detail_id: int

    class Config:
        from_attributes = True


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
        from_attributes = True


class CartItemBase(BaseModel):
    product_id: int
    quantity: int
    is_checked: Optional[bool] = False


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    product_id: int = Field(..., description="ID sản phẩm cần cập nhật")
    quantity: int = Field(
        ..., ge=0, description="Số lượng mới của sản phẩm. Nếu <=0 sẽ xóa sản phẩm"
    )


class CartItemResponse(CartItemBase):

    class Config:
        from_attributes = True


class CartBase(BaseModel):
    user_id: int


class CartCreate(CartBase):
    pass


class CartResponse(CartBase):
    cart_id: int
    created_at: Optional[datetime]
    items: Optional[List[CartItemResponse]] = []

    class Config:
        from_attributes = True


class UserPromotionBase(BaseModel):
    user_id: int
    promo_id: int


class UserPromotionCreate(UserPromotionBase):
    pass


class UserPromotionResponse(UserPromotionBase):
    id: int
    used_at: Optional[datetime]

    class Config:
        from_attributes = True
