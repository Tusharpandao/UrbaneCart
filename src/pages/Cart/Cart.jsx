import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  let  [totalPrice, setTotalPrice] = useState(0);
  let  [itemToRemoveId, setItemToRemoveId] = useState(null);
  let  [totalItemsQuantity, setTotalItemsQuantity] = useState(0);
  let  [promoCode, setPromoCode] = useState("");
  let  [discountApplied, setDiscountApplied] = useState(true);
  let navigate=useNavigate()
  
  useEffect(() => {
    // Calculate total price for all items in the cart
    const totalPrice = cart.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);
    // Set the total price state
    setTotalPrice(totalPrice);

    const getTotalQuantity = () => {
      let totalQuantity = 0;
      cart.forEach((item) => {
        totalQuantity += item.quantity;
      });
      return totalQuantity;
    };
    setTotalItemsQuantity(getTotalQuantity);
  }, [cart]);
  const removeFromCart = (id) => {
    // Filter out the item with the specified id
    const updatedCart = cart.filter((item) => item.id !== id);
    // Update the cart state
    setCart(updatedCart);
  };

  const handleInc = (item) => {
    // Create a new array to avoid mutating the original state
    const updatedCart = [...cart];
    // Find the index of the item in the cart
    const itemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    // If the item is found, increment its quantity
    if (itemIndex !== -1) {
      if (updatedCart[itemIndex].quantity < item.stock) {
        updatedCart[itemIndex].quantity++;
      } else {
        alert(
          "You have reached the maximum amount available for this product."
        );
      }
      // Update the cart state with the updated array
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    // Call removeFromCart after the cart state has been updated
    if (itemToRemoveId !== null) {
      removeFromCart(itemToRemoveId);
      setItemToRemoveId(null);
    }
  }, [cart, itemToRemoveId]);

  const handleDec = (item) => {
    // Create a new array to avoid mutating the original state
    const updatedCart = [...cart];
    // Find the index of the item in the cart
    const itemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    // If the item is found, decrement its quantity
    if (itemIndex !== -1) {
      if (updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex].quantity--;
      } else {
        let confirmation = window.confirm(
          `You have reached the minimum quantity for this product.  Are you sure you want to remove it?`
        );
        if (confirmation) {
          setItemToRemoveId(item.id);
        }
      }
      // Update the cart state with the updated array
      setCart(updatedCart);
    }
  };
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "NEW50") {
      if (discountApplied) {
        let discountedPrice = totalPrice / 2;
        // Apply discount
        setTotalPrice(discountedPrice);
        setDiscountApplied(false);
        toast.success("Promo Code Applied");
      } else {
        toast.error("Promo Code Already Applied");
      }
    } else {
      toast.error("Invalid promo code");
    }
  };
let continueShopping=()=>{
  navigate(-1)
}

  return (
    <>
      <div className="w-[90%] mx-auto mt-10 ">
        <div className="flex flex-col md:flex-row shadow-md my-10 md:items-center">
          <div className="w-full lg:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>
            {/* Products container  start*/}
            {cart.map((cartItem) => (
              <div
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-3 "
                key={cartItem.id}
              >
                <div className="flex w-2/5 ">
                  {/* <!-- product --> */}
                  <div className="w-20">
                    <img className="h-24" src={cartItem.thumbnail} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{cartItem.title}</span>
                    <span className="text-red-500 text-xs">
                      {cartItem.brand}
                    </span>
                    <button
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      onClick={() => removeFromCart(cartItem.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <button
                    className="border px-2 py-1 "
                    onClick={() => handleDec(cartItem)}
                  >
                    -
                  </button>
                  <button className="px-2">{cartItem.quantity}</button>
                  <button
                    className="border px-2 py-1 "
                    onClick={() => handleInc(cartItem)}
                  >
                    +
                  </button>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${cartItem.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${cartItem.price * cartItem.quantity}
                </span>
              </div>
            ))}

            {/* Products container end*/}
            <button className="flex items-center font-semibold text-indigo-600 text-sm mt-10" onClick={()=>{{continueShopping()}}} >
            <FaLongArrowAltLeft size={20}/>
              Continue Shopping
            </button>
          </div>

          <div
            id="summary"
            className="w-full lg:w-fit px-8 py-10 bg-[#f6f6f6] md:mx-auto"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {totalItemsQuantity} Items{" "}
              </span>
              <span className="font-semibold text-sm">{totalPrice}$</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
              onClick={applyPromoCode}
            >
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${totalPrice}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
