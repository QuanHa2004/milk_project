import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login';
import Registration from '../pages/registration';


import Dashboard from '../pages/admin/dashboard';
import CategoryManagement from '../pages/admin/category-management';
import ProductManagement from '../pages/admin/product-management';
import PromotionManagement from '../pages/admin/promotion-management';
import AddProduct from '../pages/admin/add-product';
import CreatePromotion from '../pages/admin/create-promotion';
import Order from '../pages/admin/order-management';


import Home from '../pages/customer/home';
import Product from '../pages/customer/product';
import ProductDetail from '../pages/customer/product-detail';
import Cart from '../pages/customer/cart';
import Checkout from '../pages/customer/checkout';
import SearchResults from '../pages/customer/search-results';

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

      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Product />} />
      <Route path="/categories/:category_id/products" element={<Product />} />
      <Route path="/product-details/:product_id" element={<ProductDetail />} />
      <Route path="/carts" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  );
}
