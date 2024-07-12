import React from "react";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import AllProducts from "./components/AllProducts/AllProducts";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Mens from "./components/Mens/Mens";
import { useState } from "react";
import Womens from "./components/Womens/Womens";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import toast from "react-hot-toast";

/**
 * The main App component that manages the application's routing and state.
 *
 * The App component sets up the React Router and renders the main navigation bar, routes, and footer.
 * It also manages the state of the shopping cart, providing an `AddToCart` function to add products to the cart.
 */
function App() {
  const [cart, setCart] = useState([]);

  const AddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity++;
      setCart(updatedCart);
      toast.success(`One again  ${product.title} added successfully`)      
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product.title} added successfully`)
    }
  };

  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar cart={cart} />
          <div className="flex-grow pt-[80px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/cart"
                element={<Cart cart={cart} setCart={setCart} />}
              />
              <Route
                path="/allProducts"
                element={<AllProducts AddToCart={AddToCart} />}
              />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/mens" element={<Mens AddToCart={AddToCart} />} />
              <Route
                path="/Womens"
                element={<Womens AddToCart={AddToCart} />}
              />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
