import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChange = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };
  // }
  // const toggleClose=()=>{
  //   setIsOpen(false)
  // }
  return (
    <>
      <div>
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto flex justify-between p-5 items-center">
            <div>
              <Link to="/">
                <h3 className="font-bold text-2xl">
                  Urbane
                  <span className="text-[red]">
                    Cart
                  </span>
                </h3>
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center text-lg justify-center font-semibold">
                <Link to="/">
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li>{" "}
                </Link>
                  <Link to="/allProducts">
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  All Product
                </li>
                  </Link>
               
                <Link to="/mens">
                <li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li>
                </Link>
               <Link to="/kids">
               <li className="mr-5 hover:text-gray-900 cursor-pointer">Kids</li>
               </Link>
              </ul>
            </div>
            {isOpen ? (
              <div className="">
                <ul
                  className="flex flex-col gap-10 text-2xl absolute top-[73px] left-0 h-screen w-full  z-10 bg-red-500 text-white
               items-center justify-center font-semibold"
                >
                  <Link to="/">
                    <li className="mr-5 hover:text-gray-900 cursor-pointer">
                      Home
                    </li>
                  </Link>

                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                    All Product
                  </li>
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">Mens</li>
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">Kids</li>
                </ul>
                <button className="absolute top-[75px] z-10 right-5 text-white py-4 cursor-pointer  ">
                  <RxCrossCircled onClick={toggleChange} size={30} />
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="flex justify-center items-center gap-3">
              <Link to="/signIn">
              <button
                className=" bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-red-500
               rounded text-base  font-semibold"
              >
                Sign In
              </button>
              </Link>
              <Link to="/cart">
                <button>
                  <FaCartShopping size={25} />
                </button>
              </Link>
              {
                isOpen?"":<button className="md:hidden" onClick={toggleChange}>
                  <GiHamburgerMenu size={25} />
                </button>
              }
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavBar;
