import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ContactUs from './pages/ContactUs';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { CartProvider } from './contexts/CartContext';
import './App.css';

function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Header />
                  <main>
                    <Home />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/shop" element={
                <>
                  <Header />
                  <main>
                    <Shop />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/product/:id" element={
                <>
                  <Header />
                  <main>
                    <ProductDetail />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/cart" element={
                <>
                  <Header />
                  <main>
                    <Cart />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/checkout" element={
                <>
                  <Header />
                  <main>
                    <Checkout />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Header />
                  <main>
                    <ContactUs />
                  </main>
                  <Footer />
                </>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="products" element={<Products />} />
                <Route path="customers" element={<div>Customers Management (Coming Soon)</div>} />
                <Route path="analytics" element={<div>Analytics (Coming Soon)</div>} />
                <Route path="shipping" element={<div>Shipping Management (Coming Soon)</div>} />
                <Route path="support" element={<div>Support Management (Coming Soon)</div>} />
                <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
                <Route path="profile" element={<div>Admin Profile (Coming Soon)</div>} />
              </Route>
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AdminAuthProvider>
  );
}

export default App;
