import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login';
import Registration from '../pages/registration';


import Dashboard from '../pages/admin/dashboard';
import Order from '../pages/admin/order-management';
import CategoryManagement from '../pages/admin/category-management';
import ProductManagement from '../pages/admin/product-management';
import PromotionManagement from '../pages/admin/promotion-management';
import InvoiceManagement from '../pages/admin/invoice-management';
import UserManagement from '../pages/admin/user-management';
import ManufacturerManagement from '../pages/admin/manufacturer-management';
import SupplierManagement from '../pages/admin/supplier-management';
import AddCategory from '../pages/admin/add-category';
import AddProduct from '../pages/admin/add-product';
import CreatePromotion from '../pages/admin/create-promotion';
import AddInvoice from '../pages/admin/add-invoice';
import AddManufacturer from '../pages/admin/add-manufacturer';
import AddSupplier from '../pages/admin/add-supplier';
import FeedbackManagement from '../pages/admin/feedback-management';


import Home from '../pages/customer/home';
import Product from '../pages/customer/product';
import ProductDetail from '../pages/customer/product-detail';
import Cart from '../pages/customer/cart';
import Checkout from '../pages/customer/checkout';
import SearchResults from '../pages/customer/search-results';
import Support from '../pages/customer/support';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />


      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/order" element={<Order />} />
      <Route path="/admin/category" element={<CategoryManagement />} />
      <Route path="/admin/product" element={<ProductManagement />} />
      <Route path="/admin/promotion" element={<PromotionManagement />} />
      <Route path="/admin/invoice" element={<InvoiceManagement />} />
      <Route path="/admin/user" element={<UserManagement />} />
      <Route path="/admin/manufacturer" element={<ManufacturerManagement />} />
      <Route path="/admin/feedback" element={<FeedbackManagement />} />
      <Route path="/admin/supplier" element={<SupplierManagement />} />
      <Route path="/admin/add-category" element={<AddCategory />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/create-promotion" element={<CreatePromotion />} />
      <Route path="/admin/add-invoice" element={<AddInvoice/>}/>
      <Route path="/admin/add-manufacturer" element={<AddManufacturer/>}/>
      <Route path="/admin/add-supplier" element={<AddSupplier/>}/>


      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Product />} />
      <Route path="/categories/:category_id/products" element={<Product />} />
      <Route path="/product-details/:product_id" element={<ProductDetail />} />
      <Route path="/carts" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}
