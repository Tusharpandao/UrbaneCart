import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { PiStarThin } from "react-icons/pi";

const Womens = ({ AddToCart }) => {
  let  [products, setProducts] = useState([]);
  let [allProducts, setAllProducts] = useState([]);
  let  [category, setCategory] = useState([]);
  let  [selectProductCategory, setSelectProductsCategory] = useState("");

  const productsAPI = "http://localhost:8084";
  
  
   //for getting all  categories and filter womens category and set that categories  to the state
   useEffect(() => {
    const getAllProductCategory = async () => {
      try {
        const res = await axios.get(`${productsAPI}/categories`);
        if (res && res.data && res.data.data) {
          let filterCategory = res.data.data;
          // Filter out wanted categories
          filterCategory = filterCategory.filter((filterItems) =>
            [
              "womens-dresses",
            "womens-bags",
            "womens-jewellery",
            "womens-shoes",
            "womens-watches"
            ].includes(filterItems)
          );
          
          setCategory(filterCategory);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllProductCategory();
  }, []);

  //for getting all products and set that products  to the state
  useEffect(() => {
    let getProducts = async () => {
      try {
        const response = await axios.get(`${productsAPI}/products`);
        // Filter products based on specified categories
        let filterProducts = response.data.data.filter((product) =>
          [
            
            "womens-dresses",
            "womens-bags",
            "womens-jewellery",
            "womens-shoes",
            "womens-watches",
          ].includes(product.category.name)
        );
        // console.log(filterProducts);
       
        setProducts(filterProducts);
        setAllProducts(filterProducts);
      } catch (error) {
        console.error("Error fetching categories and products:", error);
      }
    };
    getProducts();
  }, []);

 

  //filter product by category 
  useEffect(() => {
   let  getCategoryProducts = async () => {
      try {
        if (selectProductCategory) {
          let selectedProducts = allProducts.filter((product) => {
            return product.category.name === selectProductCategory;
          });
          // console.log(selectedProducts);
          setProducts(selectedProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryProducts();
  }, [selectProductCategory]);

  // for setting selected category product in product which will  showing in ui
  const filterProducts = (selectedCategory) => {
    // console.log(selectedCategory);
    setSelectProductsCategory(selectedCategory);
  };
  return (
    <>
      <Layout>
        <div className=" flex gap-3 flex-wrap ">
          <select
            onChange={(e) => filterProducts(e.target.value)}
            className="mx-auto"
          >
            <option>Filter by Category</option>
            {category.map((categoryOption, index) => (
              <option value={categoryOption} key={index}>
                {" "}
                {categoryOption}
              </option>
            ))}
          </select>
        </div>
        {/* product Section  */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-wrap -m-4">
              {products.map((item) => (
                <div className="lg:w-1/4 md:w-1/2 p-3 w-full  " key={item.id}>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="image not found"
                      className="object-cover object-center w-full h-full block"
                      src={item.thumbnail}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.category.name}
                    </h3>
                    <h2 className="text-gray-9/*  */00 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="mt-1">${item.price}</p>
                    <span className="mt-1 flex  items-center justify-between ">
                      <span className="mt-1 flex  items-center ">
                        <PiStarThin size={20} color="black" /> {item.rating}
                      </span>
                      <span className="mr-10">
                        <button
                          className="bg-indigo-600 text-white p-2 rounded-md"
                          onClick={() => AddToCart(item)}
                        >
                          Add to cart
                        </button>
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Womens;
