import React, { useEffect, useState } from "react";
import axios from "axios";
import { PiStarThin } from "react-icons/pi";
import toast from "react-hot-toast";

const AllProducts = ({ AddToCart }) => {
  let [products, setProducts] = useState([]); // selected product which is showing in web
  let [allProducts, setAllProducts] = useState([]); // original Products  for select product and then store products state
  let [category, setCategory] = useState([]);
  let [selectProductCategory, setSelectProductsCategory] = useState("");
  let [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [exchangeRate, setExchangeRate] = useState(null);

  const productsAPI = "https://dummyjson.com/products";

  //for getting all products and set that products  to the state and setAllProducts state
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get(`${productsAPI}?limit=2000`);
        setProducts(response.data.products);
        setAllProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching products:", error);
        toast.error(error.message);
      }
    };
    getProducts();
  }, []);

  // getting all category and set category state
  useEffect(() => {
    const getAllProductCategory = () => {
      axios
        .get(`${productsAPI}/category-list`)

        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
        });
    };
    getAllProductCategory();
  }, []);

  //get the category wise product
  useEffect(() => {
    const getCategoryProducts = () => {
      if (selectProductCategory) {
        const selectedProducts = allProducts.filter(
          (product) => product.category === selectProductCategory
        );
        setProducts(selectedProducts);
      } else {
        setProducts(allProducts); // Show all products if no category is selected
      }
    };
    getCategoryProducts();
  }, [selectProductCategory]); // Added allProducts dependency

  // Improved Search Filtering
  useEffect(() => {
    const searchProduct = allProducts.filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setProducts(searchProduct);
  }, [searchItem, allProducts]); // Added allProducts dependency

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          "https://open.er-api.com/v6/latest/USD"
        ); // Example exchange rate API
        setExchangeRate(response.data.rates.INR);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        // You could set a default rate or display an error message here
      }
    };

    fetchExchangeRate();

    // Optional: Set up interval to periodically update the rate
    const intervalId = setInterval(fetchExchangeRate, 3600000); // Update every hour (adjust as needed)

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const formatCurrency = (amountInUSD) => {
    if (exchangeRate === null) {
      return "Loading..."; // Show loading message while fetching rate
    }

    const amountInINR = amountInUSD * exchangeRate;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amountInINR);
  };

  const filterProducts = (selectedCategory) => {
    setSelectProductsCategory(selectedCategory);
  };
  const clearSearch = () => {
    setSearchItem("");
  };

  return (
    <>
    
    <div className=" container mx-auto items-center flex flex-col bg-gray-100 flex-wrap ">
        <select
          onChange={(e) => filterProducts(e.target.value)}
          className="mx-auto p-2 rounded-md shadow-md my-5"
        >
          <option>Filter by Category</option>
          {category.map((categoryOption, index) => (
            <option value={categoryOption} key={index}>
              {" "}
              {categoryOption}
            </option>
          ))}
        </select>
        <div className=" flex justify-center items-center mb-5 ">
          <input
            placeholder="Search Item"
            className="border-2 border-gray-300 p-2 rounded-md shadow-md" // Added styles
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
          />
          <button
            className="bg-red-500 text-white p-2 ml-4 rounded-md shadow-md hover:bg-red-600" // Added styles
            onClick={clearSearch}
          >
            Clear
          </button>
        </div>


      </div>
      {/* product Section  */}
      <section className="text-gray-600 body-font">
      {isLoading ? ( // Conditional rendering
            <div className="text-center text-2xl">Loading Products...</div>
          ) : (
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
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="mt-1">${formatCurrency(item.price)}</p>
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
          )}
      </section>
    </>
  );
};

export default AllProducts;
