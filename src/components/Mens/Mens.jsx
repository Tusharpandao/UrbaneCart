import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { PiStarThin } from "react-icons/pi";

const Mens = () => {
  const [products, setProducts] = useState([]);

  const [allCategory, setAllCategory] = useState([]);
  const [selectProduct, setSelectProduct] = useState("");

  const productsAPI = "https://dummyjson.com/products";

  // for getting all products and set that products  to the state
  useEffect(() => {
    const allProduct = async () => {
      const res = await axios(productsAPI);
      let data = res.data.products;
      
      const filteredProducts = data.filter((product) =>
        [
          "fragrances",
          "skincare",
          "mens-shirts",
          "mens-shoes",
          "mens-watches",
          "sunglasses",
        ].includes(product.category)
      );
      setProducts(filteredProducts);
    };
    allProduct();
  }, []);

  //for getting all product categories
  useEffect(() => {
    const getAllProductCategory = async () => {
      try {
        const res = await axios(`${productsAPI}/categories`);
        setAllCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProductCategory();
  }, []);
  //for getting category vise product
  useEffect(() => {
    const getCategoryProducts = async () => {
      try {
        if (selectProduct) {
          let res = await axios(`${productsAPI}/category/${selectProduct}`);
          setProducts(res.data.products);
          console.log(res.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryProducts();
  }, [selectProduct]);

  // for setting selected category product in product which will  showing in ui
  const filterProducts = (selectedCategory) => {
    // console.log(selectedCategory);
    setSelectProduct(selectedCategory);
    // const data=products.filter((filterItems)=>filterItems.category === selectedCategory);
    // setProducts(data)
    // console.log(data);
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
            {allCategory
              .filter((filterItems) =>
                [
                  "fragrances",
                  "skincare",
                  "mens-shirts",
                  "mens-shoes",
                  "mens-watches",
                  "sunglasses",
                ].includes(filterItems)
              )
              .map((allproduct, index) => (
                <option value={allproduct} key={index}>
                  {" "}
                  {allproduct}
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
                      {item.category}
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
                        <button className="bg-indigo-600 text-white p-2 rounded-md">
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

export default Mens;
