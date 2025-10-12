import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetail";
import Admin from "./pages/Admin";
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
