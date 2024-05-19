
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
// import Cart from './pages/Cart/Cart'
// import Home from './pages/Home/Home'
// import AllProducts from './components/AllProducts/AllProducts'
// import SignIn from './pages/SignIn/SignIn'
// import SignUp from './pages/SignUp/SignUp'
// import Mens from './components/Mens/Mens'
// import { useState } from 'react'
// import Womens from './components/Womens/Womens'

// const RoutingConfig = () => {
 
//     const[cart, setCart] = useState([])

 
//     const AddToCart = (product) => {
//       // Check if the product is already in the cart
//       const existingProductIndex = cart.findIndex(item => item.id === product.id);
      
//       if (existingProductIndex !== -1) {
//           // If the product exists, update its quantity
//           const updatedCart = [...cart];
//           updatedCart[existingProductIndex].quantity++;
//           setCart(updatedCart);
//       } else {
//           // If the product is not in the cart, add it with quantity 1
//           setCart([...cart, {...product, quantity: 1}]);
//       }
//   }
  
  
//     return (
//       <>
//         <div>
//           <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Home/>}/>
//             <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
//             <Route path="/allProducts" element={<AllProducts AddToCart={AddToCart} />}/>
//             <Route path="/signUp" element={<SignUp/>}/>
//             <Route path="/signIn" element={<SignIn/>}/>
//             <Route path="/mens" element={<Mens  AddToCart={AddToCart}/>}/>
//             <Route path="/Womens" element={<Womens AddToCart={AddToCart}/>}/>
            
  
            
//           </Routes>
          
//           </BrowserRouter>
//         </div>
//       </>
//     )
// }

// export default RoutingConfig