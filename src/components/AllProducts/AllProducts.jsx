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

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const productsAPI = "http://localhost:8084";

  //for getting all products and set that products  to the state and setAllProducts state
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get(`${productsAPI}/products`);
        setProducts(response.data.data);
        setAllProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Stop loading, whether successful or not
      }
    };
    getProducts();
  }, []);

  // getting all category and set category state
  useEffect(() => {
    const getAllProductCategory = () => {
      axios
        .get(`${productsAPI}/categories`)
        .then((res) => {
          setCategory(res.data.data);
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
          (product) => product.category.name === selectProductCategory
        );
        setProducts(selectedProducts);
      } else {
        setProducts(allProducts); // Show all products if no category is selected
      }
    };
    getCategoryProducts();
  }, [selectProductCategory, allProducts]); // Added allProducts dependency

  // Improved Search Filtering
  // useEffect(() => {
  //   const searchProduct = allProducts.filter((item) =>
  //     item.title.toLowerCase().includes(searchItem.toLowerCase())
  //   );
  //   // console.log(searchProduct);
  //   setProducts(searchProduct);
  // }, [searchItem, allProducts]); // Added allProducts dependency

  const handleSearchByButton = () => {
    const searchProduct = allProducts.filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setProducts(searchProduct);
  };
  const filterProducts = (selectedCategory) => {
    setSelectProductsCategory(selectedCategory);
  };
  const handleByPrice = () => {
    // Convert to numbers, handling empty values
    const min = minPrice ? parseFloat(minPrice) : 0; 
    const max = maxPrice ? parseFloat(maxPrice) : Infinity; // No max if empty
  
    if (min > max) {
      // Handle invalid range gracefully
      alert("Invalid price range: Minimum price cannot be greater than maximum price.");
      setMaxPrice("");
      setMinPrice("")
      return; 
    }
  
    const filteredProducts = allProducts.filter(item => {
      const productPrice = parseFloat(item.price); // Ensure we're comparing numbers
      return productPrice >= min && productPrice <= max;
    });
  
    setProducts(filteredProducts);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="container mx-auto bg-gray-100 p-8 rounded-lg">
          {/* Added container styles */}
          <div className="flex gap-3 flex-wrap relative">
            <select
              onChange={(e) => filterProducts(e.target.value)}
              className="mx-auto p-2 rounded-md shadow-md" // Added styles
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
          <div className="mt-6 flex justify-center">
            {" "}
            {/* Centered elements */}
            <input
              placeholder="Search Item"
              className="border-2 border-gray-300 p-2 rounded-md shadow-md  w-64" // Added styles
              onChange={(e) => setSearchItem(e.target.value)}
              value={searchItem}
            />
            <button
              className="bg-red-500 text-white p-2 ml-4 rounded-md shadow-md hover:bg-red-600" // Added styles
              onClick={handleSearchByButton}
            >
              Search
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            {" "}
            {/* Centered elements */}
            <input
              placeholder="Min Price"
              className="border-2 border-gray-300 px-4 py-2 rounded-md shadow-md" // Added styles
              onChange={(e) => setMinPrice(e.target.value)}
              value={minPrice}
            />
            <input
              placeholder="Max Price"
              className="border-2 border-gray-300 px-4 py-2 rounded-md shadow-md ml-4" // Added styles
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 ml-4 rounded-md shadow-md hover:bg-red-600" // Added styles
              onClick={handleByPrice}
            >
              Filter By Price
            </button>
          </div>
        </div>

        {/* product Section  */}
        <section className="text-gray-600 body-font">
          <div className="container p-1 mx-auto">
            {isLoading ? ( // Conditional rendering
              <div className="text-center text-2xl">Loading Products...</div>
            ) : (
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
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default AllProducts;
