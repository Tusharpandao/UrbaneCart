import React from "react";
import { FaFacebook,  FaInstagram, FaRegCopyright, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 md:mx-0 mx-auto text-center md:text-left ">
            <h3 className="font-bold text-2xl">
              Urbane<span className="text-[red]">Cart</span>
            </h3>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10  md:mt-0 mt-10 md:text-left text-center ">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">
                MENU
              </h2>

              <ul className="list-none mb-10">
                <li className="mt-1">Features</li>
                <li className="mt-1">Info Center</li>
                <li className="mt-1">News Blog</li>
                <li className="mt-1">Login</li>
              </ul>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">
                COMPANY
              </h2>

              <ul className="list-none mb-10">
                <li className="mt-1">About Us</li>
                <li className="mt-1">Privacy Policy</li>
                <li className="mt-1">Term & Condition</li>
                <li className="mt-1">Login</li>
              </ul>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">
                CONTACT
              </h2>

              <ul className="list-none mb-10">
                <li className="mt-1">Contact Sales</li>
                <li className="mt-1">+918767995517</li>
                <li className="mt-1">Email</li>
                <li className="mt-1">contact@urbanecart.in</li>
              </ul>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">
                TECH SUPPORT
              </h2>

              <ul className="list-none mb-10">
                <li className="mt-1">Contact Support</li>
                <li className="mt-1">Info Center</li>
                <li className="mt-1">Activate</li>
                
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-indigo-500 text-white">
          <div className="container mx-auto py-4 flex flex-wrap flex-col sm:flex-row">
            <p className="text-sm text-center sm:text-left inline-flex md:justify-center md:items-center">
            <span className="mr-1"><FaRegCopyright/ ></span>   2024  UrbaneCart - <span>@copyright </span>
            </p>
            <p className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
             <span className="mr-2"><a href=""><FaFacebook size={25}/></a></span>
             <span className="mr-2"><a href="https://www.instagram.com/tusharpandao/"><FaInstagram size={25}/></a></span>
             <span className="mr-2"><a href="https://twitter.com/Tusharpandao_"><FaTwitter size={25} /></a></span>
             

            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
