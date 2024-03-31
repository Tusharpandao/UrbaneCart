// import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import AllProducts from './components/AllProducts/AllProducts'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Mens from './components/Mens/Mens'
import Kids from './components/Kids/Kids'

function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/allProducts" element={<AllProducts/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/signIn" element={<SignIn/>}/>
          <Route path="/mens" element={<Mens/>}/>
          <Route path="/kids" element={<Kids/>}/>
          

          
        </Routes>
        
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
