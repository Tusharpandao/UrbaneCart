import React, { useEffect, useState } from "react";
import axios from "axios";
import { PiStarThin } from "react-icons/pi";

const AllProducts = ({ AddToCart }) => {
  let [products, setProducts] = useState([]);
  let [allProducts, setAllProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let [selectProductCategory, setSelectProductsCategory] = useState("");

  const productsAPI = "http://localhost:8084";

  //for getting all products and set that products  to the state
  useEffect(() => {
    let getProducts = async () => {
      try {
        const response = await axios.get(`${productsAPI}/products`);
        // Filter products based on specified categories
        let filterProducts = response.data.data;
        setProducts(filterProducts);
        setAllProducts(filterProducts);
      } catch (error) {
        console.error("Error fetching categories and products:", error);
      }
    };
    getProducts();
  }, []);

  //for getting all  categories
  useEffect(() => {
    const getAllProductCategory = () => {
      const res = axios
        .get(`${productsAPI}/categories`)
        .then((res) => {
          setCategory(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllProductCategory();
  }, []);

  //filter product by category
  useEffect(() => {
    let getCategoryProducts = async () => {
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
      <div className="container mx-auto">
        <div className=" flex gap-3 flex-wrap relative x-20 ">
          <select
            onChange={(e) => filterProducts(e.target.value)}
            className="mx-auto"
          >
            <option>Filter by Category</option>
            {category.map((allproduct, index) => (
              <option value={allproduct} key={index}>
                {" "}
                {allproduct}
              </option>
            ))}
          </select>
        </div>
        {/* product Section  */}
        <section className="text-gray-600 body-font">
          <div className="container p-1 mx-auto">
            <div className="flex flex-wrap m-4">
              {products.map((item) => (
                <div className="lg:w-1/4 w-1/2  p-9 " key={item.id}>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="image not found"
                      className="object-cover object-center w-full h-full block"
                      src={item.thumbnail}
                    />
                  </a>
                  <div className="mt-4 ">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.category.name}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="mt-1">${item.price}</p>
                    <p className="mt-1 flex  items-center justify-between  ">
                      <span className="mt-1 flex  items-center ">
                        <PiStarThin size={20} color="black" /> {item.rating}
                      </span>
                      <span className="mr-10">
                        <button
                          className="bg-indigo-600 text-white p-2 rounded-md focus:outline-none hover:bg-indigo-800 transition duration-300 ease-in-out"
                          onClick={() => AddToCart(item)}
                        >
                          Add to cart
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AllProducts;
/* 
useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${productsAPI}/products`);
        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchCategories function when the component mounts
    fetchCategories();
  }, []);

  //for getting all product categories
  useEffect(() => {
    const getAllProductCategory = () => {
      const res = axios
        .get(`${productsAPI}/categories`)
        .then((res) => {
          setAllCategory(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllProductCategory();
  }, []);

  //for getting category vise products
  useEffect(() => {
    const getCategoryProducts = async () => {
      try {
        if (selectProduct) {
          let res = await axios(
            `${productsAPI}/products/category/${selectProduct}`
          );
          console.log(res.data.data);
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryProducts();
  }, [selectProduct]);

  // // for setting selected category product in product which will  showing in ui
  const filterProducts = (selectedCategory) => {
    console.log(selectedCategory);
    setSelectProduct(selectedCategory);
  };
*/
