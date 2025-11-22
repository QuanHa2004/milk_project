from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime
from enum import Enum


class DiscountTypeEnum(str, Enum):
    percent = "percent"
    fixed = "fixed"


class StatusEnum(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    delivered = "delivered"
    cancelled = "cancelled"

# pydantic: tra ve frontend danh sach don hang, danh muc, san pham, ma giam gia, phieu nhap hang
class OrderList(BaseModel):
    order_id: int
    full_name: str
    order_date: datetime
    total_amount: Decimal
    status: StatusEnum


class CategoryList(BaseModel):
    category_name: str
    quantity: int


class ProductList(BaseModel):
    product_name: str
    price: Decimal
    is_deleted: bool
    is_hot: bool
    quantity: int = 0
    expiration_date: datetime


class PromotionList(BaseModel):
    promo_code: str
    discount_type: DiscountTypeEnum
    discount_value: Decimal
    max_discount_value: Decimal
    min_order_value: Decimal
    max_uses: int
    uses_count: int
    start_date: datetime
    end_date: datetime
    is_active: bool


class RecentPromotionList(BaseModel):
    promo_code: str
    start_date: datetime
    end_date: datetime
    is_active: bool


class InvoiceList(BaseModel):
    invoice_id: int
    supplier_name: str
    total_amount: Decimal
    created_at: datetime

 