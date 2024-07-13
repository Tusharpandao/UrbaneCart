/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";
import { CgShoppingCart } from "react-icons/cg";
import { auth } from "../../FirebaseConfig/FirebaseConfig";
import { useAuthState } from 'react-firebase-hooks/auth'; // Import the useAuthState hook
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";


const NavBar = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate =useNavigate();

  const [user, loading, error] = useAuthState(auth);   // Get user from auth state using react-firebase-hooks


  const toggleChange = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      toast.success("You are signed out successfully");
      navigate("/signIn")

    }).catch((error) => {
      toast.error(error.message);
    });
  };
 
  return (
    <header className="fixed top-0 w-full z-20 bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between p-5 items-center">
        <div>
          <Link to="/">
            <h3 className="font-bold text-2xl">
              Urbane
              <span className="text-[red]">Cart</span>
            </h3>
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center text-lg justify-center font-semibold">
            <Link to="/">
              <li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li>{" "}
            </Link>
            <Link to="/allProducts" >
              <li className="mr-5 hover:text-gray-900 cursor-pointer" >
                All Product
              </li>
            </Link>

            <Link to="/mens">
              <li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li>
            </Link>
            <Link to="/Womens">
              <li className="mr-5 hover:text-gray-900 cursor-pointer">
                Womens
              </li>
            </Link>
          </ul>
        </div>
        {isOpen ? (
          <div className="">
            <ul
              className="flex flex-col gap-10 text-2xl absolute top-[73px] left-0 h-screen w-screen  z-10 bg-red-500 text-white
               items-center justify-center font-semibold"
            >
              <Link to="/" onClick={toggleChange}>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  Home
                </li>
              </Link>

              <Link to="/allProducts" onClick={toggleChange}>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  All Product
                </li>
              </Link>
              <Link to="/mens" onClick={toggleChange}>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  Mens
                </li>
              </Link>
              <Link to="/Womens" onClick={toggleChange}>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  Womens
                </li>
              </Link>
            </ul>
            <button className="absolute top-[75px] z-10 right-5 text-white py-4 cursor-pointer  ">
              <RxCrossCircled onClick={toggleChange} size={30} />
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-center items-center gap-3">
          {/* Sign in button */}
         

{user ? ( // Conditionally render if user is logged in
      <div>
        <span className="mr-3 text-lg font-semibold">{user.displayName }</span>
        {/* Sign Out button  */}
        {/* <button
          className=" bg-red-300 border-0 py-1 px-3 focus:outline-none hover:bg-red-500
            rounded text-base  font-semibold"
            onClick={handleSignOut}
        >
          Sign Out
        </button> */}
      </div>
    ) : ( 
      <Link to="/signIn">
        <button
          className=" bg-red-300 border-0 py-1 px-3 focus:outline-none hover:bg-red-500
            rounded text-base  font-semibold"
        >
          Sign In
        </button>
      </Link>
    )}

          {/* Conditional Cart Icon and Count */}
          {(cart?.length ?? 0) > 0 && ( // Only show if cart exists and has items
            <Link to="/cart">
              <button className="relative inline-block">
                <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 px-1 bg-red-500 rounded-[50%]  text-sm font-bold">
                  {cart.length}
                </span>
                <CgShoppingCart size={35} />
              </button>
            </Link>
          )}

          {isOpen ? (
            ""
          ) : (
            <button className="md:hidden" onClick={toggleChange}>
              <GiHamburgerMenu size={25} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
