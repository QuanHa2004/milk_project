from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from decimal import Decimal
from enum import Enum


class DiscountTypeEnum(str, Enum):
    percent = "percent"
    fixed = "fixed"


class RoleBase(BaseModel):
    role_name: str
    description: Optional[str] = None

# pydantic: kiem tra thong tin dang ky
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



# pydantic: hien thi danh sanh danh muc, san pham, tim kiem san pham
class CategoryList(BaseModel):
    category_id: int
    category_name: str


class ProductList(BaseModel):
    product_id: int
    product_name: str
    price: Decimal
    image_url: str
    description: str


# pydantic: gio hang kiem tra du lieu tra ve
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

