import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import CategoryManagement from '../pages/category-management';
import ProductManagement from '../pages/product-management';
import PromotionManagement from '../pages/promotion-management';
import AddProduct from '../pages/add-product';
import CreatePromotion from '../pages/create-promotion';
import Order from '../pages/order';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/category" element={<CategoryManagement />} />
      <Route path="/admin/product" element={<ProductManagement />} />
      <Route path="/admin/promotion" element={<PromotionManagement />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/create-promotion" element={<CreatePromotion />} />
      <Route path="/admin/order" element={<Order />} />
    </Routes>
  );
}
