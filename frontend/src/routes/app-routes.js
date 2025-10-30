import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login';
import Registration from '../pages/registration';
import Home from '../pages/customer/home';
import Product from '../pages/customer/product';
import ProductDetail from '../pages/customer/product-detail';
import Cart from '../pages/customer/cart';
import Checkout from '../pages/customer/checkout';
import SearchResults from '../pages/customer/search-results';

import Dashboard from '../pages/admin/dashboard';
import CategoryManagement from '../pages/admin/category-management';
import ProductManagement from '../pages/admin/product-management';
import PromotionManagement from '../pages/admin/promotion-management';
import AddProduct from '../pages/admin/add-product';
import CreatePromotion from '../pages/admin/create-promotion';
import Order from '../pages/admin/order';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registation" element={<Registration />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/category" element={<CategoryManagement />} />
      <Route path="/admin/product" element={<ProductManagement />} />
      <Route path="/admin/promotion" element={<PromotionManagement />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/create-promotion" element={<CreatePromotion />} />
      <Route path="/admin/order" element={<Order />} />
      

      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Product />} />
      <Route path="/products/category/:category_id" element={<Product />} />
      <Route path="/product-detail/:product_id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  );
}
