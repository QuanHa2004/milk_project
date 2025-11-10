import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login';
import Registration from '../pages/registration';
import Home from '../pages/customer/home';
import Product from '../pages/customer/product';
import ProductDetail from '../pages/customer/product-detail';
import Cart from '../pages/customer/cart';
import Checkout from '../pages/customer/checkout';
import SearchResults from '../pages/customer/search-results';

export default function AppRoutes() {
  return (
    <Routes>
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
