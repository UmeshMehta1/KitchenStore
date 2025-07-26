import "./App.css";
import Footer from "./global/components/Footer";
import Navbar from "./global/components/navbar/Navbar";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/registraion/Registration";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/checkout/Checkout";
import ProductDetail from "./pages/component/productCom/productDetail";
import Products from "./pages/Home/component/product/Products";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/" element={<Products />} />
        <Route path="/productdetails/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
