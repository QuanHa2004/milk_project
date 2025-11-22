from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, extract
from database import get_db
import model
from datetime import datetime
import schema_admin as schema_admin

admin = APIRouter(prefix="", tags=["Authentication"])


# dashboard: bao cao doanh thu thang
@admin.get("/admin/reports")
def get_report(db: Session = Depends(get_db)):
    now = datetime.now()
    current_month = now.month
    current_year = now.year

    report = (
        db.query(
            func.sum(model.Order.total_amount).label("total_revenue"),
            func.count(model.Order.order_id).label("total_orders"),
        )
        .filter(
            model.Order.status == "delivered",
            extract("month", model.Order.order_date) == current_month,
            extract("year", model.Order.order_date) == current_year,
        )
        .first()
    )

    new_customer = (
        db.query(func.count(model.User.user_id).label("new_customer"))
        .filter(
            model.User.role_id == 2,
            extract("month", model.User.created_at) == current_month,
            extract("year", model.User.created_at) == current_year,
        )
        .scalar()
    )

    total_revenue = report.total_revenue if report.total_revenue else 0
    total_orders = report.total_orders if report.total_orders else 0
    new_customer = new_customer if new_customer else 0
    avg_value = (total_revenue / total_orders) if total_orders > 0 else 0

    return {
        "total_revenue": total_revenue,
        "total_orders": total_orders,
        "new_customer": new_customer,
        "avg_value": avg_value,
    }


# hien thi danh sach don hang, danh muc, san pham, ma giam gia, phieu nhap hang
@admin.get("/admin/orders", response_model=list[schema_admin.OrderList])
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(model.Order).options(joinedload(model.Order.user)).all()

    results = []
    for order in orders:
        if order.user and not order.user.is_deleted:
            item = {
                "order_id": order.order_id,
                "full_name": order.user.full_name,
                "order_date": order.order_date,
                "total_amount": order.total_amount,
                "status": order.status,
            }
            results.append(item)
    return results


@admin.get("/admin/categories", response_model=list[schema_admin.CategoryList])
def get_categories(db: Session = Depends(get_db)):
    categories = (
        db.query(
            model.Category.category_name,
            func.count(model.Product.product_id).label("quantity"),
        )
        .outerjoin(
            model.Product,
            (model.Category.category_id == model.Product.category_id)
            & (model.Product.is_deleted == False),
        )
        .group_by(model.Category.category_id)
        .all()
    )

    results = []
    for category in categories:
        item = {"category_name": category.category_name, "quantity": category.quantity}
        results.append(item)

    return results


@admin.get("/admin/products", response_model=list[schema_admin.ProductList])
def get_products(db: Session = Depends(get_db)):
    batches = (
        db.query(model.ProductBatch)
        .options(joinedload(model.ProductBatch.product))
        .all()
    )

    results = []
    for batch in batches:
        item = {
            "product_name": batch.product.product_name,
            "price": batch.product.price,
            "is_deleted": batch.product.is_deleted,
            "is_hot": batch.product.is_hot,
            "quantity": batch.quantity,
            "expiration_date": batch.expiration_date,
        }
        results.append(item)

    return results


@admin.get("/admin/promotions", response_model=list[schema_admin.PromotionList])
def get_promotions(db: Session = Depends(get_db)):
    promotions = (
        db.query(model.Promotion).all()
    )

    results = []
    for promotion in promotions:
        item = {
            "promo_code": promotion.promo_code,
            "discount_type": promotion.discount_type,
            "discount_value": promotion.discount_value,
            "max_discount_value": promotion.max_discount_value,
            "min_order_value": promotion.min_order_value,
            "max_uses": promotion.max_uses,
            "uses_count": promotion.uses_count,
            "start_date": promotion.start_date,
            "end_date": promotion.end_date,
            "is_active": promotion.is_active,
        }
        results.append(item)
    return results


@admin.get(
    "/admin/recent_promotions", response_model=list[schema_admin.RecentPromotionList]
)
def get_promotions(db: Session = Depends(get_db)):
    promotions = (
        db.query(model.Promotion).options(joinedload(model.Promotion.creator)).all()
    )

    results = []
    for promotion in promotions:
        item = {
            "promo_code": promotion.promo_code,
            "start_date": promotion.start_date,
            "end_date": promotion.end_date,
            "is_active": promotion.is_active,
        }
        results.append(item)
    return results


@admin.get("/admin/invoices", response_model=list[schema_admin.InvoiceList])
def get_invoices(db: Session = Depends(get_db)):
    invoices = db.query(model.Invoice).options(joinedload(model.Invoice.supplier)).all()

    results = []
    for invoice in invoices:
        item = {
            "invoice_id": invoice.invoice_id,
            "supplier_name": invoice.supplier.supplier_name,
            "total_amount": invoice.total_amount,
            "created_at": invoice.created_at,
        }
        results.append(item)

    return results
