import React, { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Product from "./ProductCard.jsx";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
import api from "../../../api/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { toggleCategory, toggleBrand } from "../../../redux/reduxSlice";
import { motion } from "framer-motion";
import { BsPlusLg } from "react-icons/bs";
import { HiOutlineMinus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

function Items({ currentItems, selectedBrands, selectedCategories }) {
  const filteredItems = currentItems.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.title === item.brand);

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.title === item.cat);

    return isBrandSelected && isCategorySelected;
  });

  return (
    <>
      {filteredItems.length > 0 ? (
        filteredItems.map((product) => (
          <div className="w-full" key={product._id}>
            <Product
              _id={product._id}
              img={
                product.images.length > 0
                  ? product.images.map(img => img.imagePath.replace(/..[\\/]+client[\\/]+public/, ""))
                  : ['/default_images/image-not-available.png']
              }
              productName={product.name}
              price={product.price1}
              color={product.color.join(", ")}
              size={product.size.join(", ")}
              tags={product.tags}
              description={product.description}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No products found.</p>
      )}
    </>
  );
};

function ProductsSideBar({ isSidebarOpen, setIsSidebarOpen }) {
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [showPrices, setShowPrices] = useState(true);

  const checkedCategories = useSelector((state) => state.reduxReducer.checkedCategorys);
  const checkedBrands = useSelector((state) => state.reduxReducer.checkedBrands);
  const dispatch = useDispatch();

  const categories = [
    { _id: 9006, title: "New Arrivals" },
    { _id: 9007, title: "Top Selling Designs" },
    { _id: 9008, title: "Sale" },
    { _id: 9009, title: "Unstitched Collection" },
    { _id: 90010, title: "Stitched Collection" },
    { _id: 90011, title: "Sarre Outfit" },
    { _id: 90012, title: "Nikah Outfit" },
    { _id: 90013, title: "Mehndi Outfit" },
    { _id: 90014, title: "Lawn/Cotton" },
  ];

  const brands = [
    { _id: 900, title: "Pantum" },
    { _id: 901, title: "Hp" },
    { _id: 902, title: "Epson" },
    { _id: 903, title: "Ricoh" },
  ];

  const priceList = [
    { _id: 950, priceOne: 1000, priceTwo: 2000 },
    { _id: 951, priceOne: 2000, priceTwo: 3000 },
    { _id: 952, priceOne: 3000, priceTwo: 5000 },
    { _id: 953, priceOne: 5000, priceTwo: 10000 },
    { _id: 954, priceOne: 10000, priceTwo: 15000 },
    { _id: 955, priceOne: 15000, priceTwo: 20000 },
  ];

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  const handleToggleBrand = (brand) => {
    dispatch(toggleBrand(brand));
  };

  return (
    <>
      {/* Sidebar */}
      {isSidebarOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 scrollbar-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          onClick={() => setIsSidebarOpen(false)}
        >
          <motion.div
            className="fixed top-0 left-0 w-80 bg-white h-full shadow-lg z-50 p-6 overflow-y-auto scrollbar-none transition-transform duration-300 transform hover:scale-105"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-extrabold">Filter Options</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                aria-label="Close Sidebar" // Added for accessibility
              >
                <RxCross1 size={25} /> {/* Ensure size is adequate for visibility */}
              </button>
            </div>

            {/* Shop by Category */}
            <div className="mt-9 mb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowCategories(!showCategories)}
              >
                <h3 className="font-bodyFont text-xl text-primeColor">Shop by Category</h3>
                <span>{showCategories ? <HiOutlineMinus /> : <BsPlusLg />}</span>
              </div>
              {showCategories && (
                <motion.ul
                  className="flex flex-col gap-4 mt-5 text-sm text-[#767676] cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 0.5 }}
                >
                  {categories.map((item) => (
                    <li
                      key={item._id}
                      className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer  hover:bg-gray-200 transition-colors duration-300"
                    >
                      <input
                        type="checkbox"
                        checked={checkedCategories.some((cat) => cat._id === item._id)}
                        onChange={() => handleToggleCategory(item)}
                        className="cursor-pointer"
                      />
                      <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{item.title}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Shop by Brand */}
            <div className="mt-7">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowBrands(!showBrands)}
              >
                <h3 className="font-bodyFont text-xl text-primeColor">Shop by Brand</h3>
                <span>{showBrands ? <HiOutlineMinus /> : <BsPlusLg />}</span>
              </div>
              {showBrands && (
                <motion.ul
                  className="flex flex-col gap-4 mt-5 text-sm lg:text-base text-[#767676] cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 0.5 }}
                >
                  {brands.map((item) => (
                    <li
                      key={item._id}
                      className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                    >
                      <input
                        type="checkbox"
                        checked={checkedBrands.some((brand) => brand._id === item._id)}
                        onChange={() => handleToggleBrand(item)}
                        className="cursor-pointer"
                      />
                      <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{item.title}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Shop by Price */}
            <div className="mt-7">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowPrices(!showPrices)}
              >
                <h3 className="font-bodyFont text-xl text-primeColor">Shop by Price</h3>
                <span>{showPrices ? <HiOutlineMinus /> : <BsPlusLg />}</span>
              </div>
              {showPrices && (
                <motion.ul
                  className="flex flex-col gap-4 mt-5 text-sm lg:text-base text-[#767676] cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 0.5 }}
                >
                  {priceList.map((item) => (
                    <li
                      key={item._id}
                      className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                    >
                      <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{`PKR ${item.priceOne.toLocaleString()} - PKR ${item.priceTwo.toLocaleString()}`}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

function Products() {
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(48);
  const [gridViewActive, setGridViewActive] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [sortOption, setSortOption] = useState("Best Sellers");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const selectedBrands = useSelector((state) => state.reduxReducer.checkedBrands);
  const selectedCategories = useSelector((state) => state.reduxReducer.checkedCategorys);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/fetchProducts");
        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Sort logic based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "A-Z":
        return a.name.localeCompare(b.name);
      case "Z-A":
        return b.name.localeCompare(a.name);
      case "Price: Low to High":
        return a.price1 - b.price1;
      case "Price: High to Low":
        return b.price1 - a.price1;
      default:
        return 0; // Best Sellers case can be handled differently if needed
    }
  });

  // Pagination logic
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sortedProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  return (
    <div className="mx-auto px-4 py-8">
      <Breadcrumbs title="Products" />

      {/* Main Content */}
      <div className="w-full h-full flex flex-col gap-10">
        {/* Grid/List View Toggle */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span
              className={`${gridViewActive ? "bg-[#7b246d] text-white" : "border border-gray-300 text-gray-600"} rounded-md w-8 h-8 flex justify-center items-center cursor-pointer`}
              onClick={() => setGridViewActive(true)}
            >
              <BsGridFill />
            </span>
            <span
              className={`${!gridViewActive ? "bg-[#7b246d] text-white" : "border border-gray-300 text-gray-600"} rounded-md w-8 h-8 flex justify-center items-center cursor-pointer`}
              onClick={() => setGridViewActive(false)}
            >
              <ImList />
            </span>
            <span
              className={`${isSidebarOpen ? "bg-[#7b246d] text-white" : "border border-gray-300 text-gray-600"
                } rounded-md w-24 h-10 flex justify-center items-center cursor-pointer`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FontAwesomeIcon icon={faFilter} size="lg" />
              <span className="ml-2">Filter</span>
            </span>
            {isSidebarOpen && (
              <ProductsSideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            )}
          </div>

          {/* Sort and Show Options */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Sort by:</label>
              <select
                id="sortOptions"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                // className="w-full mt-1 pl-3 pr-10 py-2 text-base border-gray-300 xs:text-sm sm:text-sm rounded-sm cursor-pointer"
                className="w-full mt-1 pl-3 pr-10 py-1 border border-gray-300 rounded-sm cursor-pointer text-gray-700 appearance-none hover:bg-gray-200"
              >
                <option className="cursor-pointer" value="A-Z">A-Z</option>
                <option className="cursor-pointer" value="Z-A">Z-A</option>
                <option className="cursor-pointer" value="Price: Low to High">Price: Low to High</option>
                <option className="cursor-pointer" value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>

            <div className="relative cursor-pointer">
              <label className="block text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(+e.target.value)}
                className="w-20 border border-gray-300 py-1 px-4 rounded-sm cursor-pointer text-gray-700 appearance-none"
              >
                <option className="cursor-pointer" value="10">10</option>
                <option className="cursor-pointer" value="50">50</option>
                <option className="cursor-pointer" value="100">100</option>
                <option className="cursor-pointer" value="500">500</option>
              </select>
              <span className="absolute right-3 top-2">
                <GoTriangleDown />
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid/List */}
        <div className={`${gridViewActive
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
          : "list"
          } px-6`}
        >
          <Items
            currentItems={currentItems}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
          />
        </div>

        {/* Pagination */}
        <div className="flex flex-col mdl:flex-row justify-between items-center mt-8 px-6">
          <p className="text-base text-gray-600">
            Products {itemStart} - {Math.min(endOffset, sortedProducts.length)} of {sortedProducts.length}
          </p>
          <ReactPaginate
            nextLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel=""
            containerClassName="flex text-base font-semibold py-4"
            pageClassName="mr-4"
            pageLinkClassName="w-8 h-8 border border-gray-300 hover:border-gray-500 flex justify-center items-center rounded-md"
            activeClassName="bg-[#7b246d] text-white rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
