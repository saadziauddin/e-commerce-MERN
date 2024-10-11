// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { BsGridFill } from "react-icons/bs";
// import { ImList } from "react-icons/im";
// import ReactPaginate from "react-paginate";
// import { useDispatch, useSelector } from "react-redux";
// import Product from "./ProductCard.jsx";
// import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
// import api from "../../../api/api.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
// import { toggleCategory, toggleBrand, togglePrice } from "../../../redux/reduxSlice";
// import { motion } from "framer-motion";
// import { BsPlusLg } from "react-icons/bs";
// import { HiOutlineMinus } from "react-icons/hi";
// import { RxCross1 } from "react-icons/rx";

// // function ProductsSideBar({ isSidebarOpen, setIsSidebarOpen }) {
// //   const [showCategories, setShowCategories] = useState(true);
// //   const [showBrands, setShowBrands] = useState(true);
// //   const [showPrices, setShowPrices] = useState(true);

// //   const checkedCategories = useSelector((state) => state.reduxReducer.checkedCategories);
// //   const checkedBrands = useSelector((state) => state.reduxReducer.checkedBrands);
// //   const checkedPrices = useSelector((state) => state.reduxReducer.checkedPrices);
// //   const dispatch = useDispatch();

// //   const categories = [
// //     { _id: 9009, title: "Unstitched Collection" },
// //     { _id: 90010, title: "Stitched Collection" },
// //     { _id: 90011, title: "Sarre Outfit" },
// //     { _id: 90012, title: "Nikah Outfit" },
// //     { _id: 90013, title: "Mehndi Outfit" },
// //     { _id: 90014, title: "Lawn/Cotton" },
// //   ];

// //   const brands = [
// //     { _id: 900, title: "Pantum" },
// //     { _id: 901, title: "Hp" },
// //     { _id: 902, title: "Epson" },
// //     { _id: 903, title: "Ricoh" },
// //   ];

// //   const priceList = [
// //     { _id: 950, priceOne: 1000, priceTwo: 2000 },
// //     { _id: 951, priceOne: 2000, priceTwo: 3000 },
// //     { _id: 952, priceOne: 3000, priceTwo: 5000 },
// //     { _id: 953, priceOne: 5000, priceTwo: 10000 },
// //     { _id: 954, priceOne: 10000, priceTwo: 15000 },
// //     { _id: 955, priceOne: 15000, priceTwo: 20000 },
// //   ];

// //   const handleToggleCategory = (category) => {
// //     dispatch(toggleCategory(category));
// //   };

// //   const handleToggleBrand = (brand) => {
// //     dispatch(toggleBrand(brand));
// //   };

// //   const handleTogglePrice = (priceRange) => {
// //     dispatch(togglePrice(priceRange));
// //   };

// //   return (
// //     <>
// //       {isSidebarOpen && (
// //         <motion.div
// //           className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 scrollbar-none"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.1 }}
// //           onClick={() => setIsSidebarOpen(false)}
// //         >
// //           <motion.div
// //             className="fixed top-0 left-0 w-80 bg-white h-full shadow-lg z-50 p-6 overflow-y-auto scrollbar-none transition-transform duration-300 transform hover:scale-105"
// //             initial={{ x: -300 }}
// //             animate={{ x: 0 }}
// //             transition={{ duration: 0.1 }}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div className="flex justify-between items-center">
// //               <h2 className="text-2xl font-extrabold">Filter Options</h2>
// //               <button
// //                 onClick={() => setIsSidebarOpen(false)}
// //                 className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
// //                 aria-label="Close Sidebar"
// //               >
// //                 <RxCross1 size={25} />
// //               </button>
// //             </div>

// //             {/* Shop by Category */}
// //             <div className="mt-9 mb-2">
// //               <div
// //                 className="flex justify-between items-center cursor-pointer"
// //                 onClick={() => setShowCategories(!showCategories)}
// //               >
// //                 <h3 className="font-bodyFont text-xl text-primeColor">Shop by Category</h3>
// //                 <span>{showCategories ? <HiOutlineMinus /> : <BsPlusLg />}</span>
// //               </div>
// //               {showCategories && (
// //                 <motion.ul
// //                   className="flex flex-col gap-4 mt-5 text-sm text-[#767676] cursor-pointer"
// //                   initial={{ height: 0 }}
// //                   animate={{ height: "auto" }}
// //                   transition={{ duration: 0.5 }}
// //                 >
// //                   {categories.map((item) => (
// //                     <li
// //                       key={item._id}
// //                       className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer  hover:bg-gray-200 transition-colors duration-300"
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={checkedCategories.some((cat) => cat._id === item._id)}
// //                         onChange={() => handleToggleCategory(item)}
// //                         className="cursor-pointer"
// //                       />
// //                       <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{item.title}</span>
// //                     </li>
// //                   ))}
// //                 </motion.ul>
// //               )}
// //             </div>

// //             {/* Shop by Brand */}
// //             <div className="mt-7">
// //               <div
// //                 className="flex justify-between items-center cursor-pointer"
// //                 onClick={() => setShowBrands(!showBrands)}
// //               >
// //                 <h3 className="font-bodyFont text-xl text-primeColor">Shop by Brand</h3>
// //                 <span>{showBrands ? <HiOutlineMinus /> : <BsPlusLg />}</span>
// //               </div>
// //               {showBrands && (
// //                 <motion.ul
// //                   className="flex flex-col gap-4 mt-5 text-sm lg:text-base text-[#767676] cursor-pointer"
// //                   initial={{ height: 0 }}
// //                   animate={{ height: "auto" }}
// //                   transition={{ duration: 0.5 }}
// //                 >
// //                   {brands.map((item) => (
// //                     <li
// //                       key={item._id}
// //                       className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={checkedBrands.some((brand) => brand._id === item._id)}
// //                         onChange={() => handleToggleBrand(item)}
// //                         className="cursor-pointer"
// //                       />
// //                       <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{item.title}</span>
// //                     </li>
// //                   ))}
// //                 </motion.ul>
// //               )}
// //             </div>

// //             {/* Shop by Price */}
// //             <div className="mt-7">
// //               <div
// //                 className="flex justify-between items-center cursor-pointer"
// //                 onClick={() => setShowPrices(!showPrices)}
// //               >
// //                 <h3 className="font-bodyFont text-xl text-primeColor">Shop by Price</h3>
// //                 <span>{showPrices ? <HiOutlineMinus /> : <BsPlusLg />}</span>
// //               </div>
// //               {showPrices && (
// //                 <motion.ul
// //                   className="flex flex-col gap-4 mt-5 text-sm lg:text-base text-[#767676] cursor-pointer"
// //                   initial={{ height: 0 }}
// //                   animate={{ height: "auto" }}
// //                   transition={{ duration: 0.5 }}
// //                 >
// //                   {priceList.map((item) => (
// //                     <li
// //                       key={item._id}
// //                       className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
// //                     >
// //                       <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{`PKR ${item.priceOne.toLocaleString()} - PKR ${item.priceTwo.toLocaleString()}`}</span>
// //                     </li>
// //                   ))}
// //                 </motion.ul>
// //               )}
// //             </div>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </>
// //   );
// // };

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [gridViewActive, setGridViewActive] = useState(true);
//   const [itemOffset, setItemOffset] = useState(0);
//   const [sortOption, setSortOption] = useState("Best Sellers");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const location = useLocation();

//   const [showCategories, setShowCategories] = useState(true);
//   const [showBrands, setShowBrands] = useState(true);
//   const [showPrices, setShowPrices] = useState(true);

//   const checkedCategories = useSelector((state) => state.reduxReducer.checkedCategories);
//   const checkedBrands = useSelector((state) => state.reduxReducer.checkedBrands);
//   const checkedPrices = useSelector((state) => state.reduxReducer.checkedPrices);
//   const dispatch = useDispatch();

//   const categories = [
//     { _id: 9009, title: "Unstitched Collection" },
//     { _id: 90010, title: "Stitched Collection" },
//     { _id: 90011, title: "Sarre Outfit" },
//     { _id: 90012, title: "Nikah Outfit" },
//     { _id: 90013, title: "Mehndi Outfit" },
//     { _id: 90014, title: "Lawn/Cotton" },
//   ];

//   const brands = [
//     { _id: 900, title: "Pantum" },
//     { _id: 901, title: "Hp" },
//     { _id: 902, title: "Epson" },
//     { _id: 903, title: "Ricoh" },
//   ];

//   const priceList = [
//     { _id: 950, priceOne: 1000, priceTwo: 2000 },
//     { _id: 951, priceOne: 2000, priceTwo: 3000 },
//     { _id: 952, priceOne: 3000, priceTwo: 5000 },
//     { _id: 953, priceOne: 5000, priceTwo: 10000 },
//     { _id: 954, priceOne: 10000, priceTwo: 15000 },
//     { _id: 955, priceOne: 15000, priceTwo: 20000 },
//   ];

//   const handleToggleCategory = (category) => {
//     dispatch(toggleCategory(category));
//   };

//   const handleToggleBrand = (brand) => {
//     dispatch(toggleBrand(brand));
//   };

//   const handleTogglePrice = (priceRange) => {
//     dispatch(togglePrice(priceRange));
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const params = new URLSearchParams(location.search);
//       const category = params.get("category");

//       try {
//         const response = category
//           ? await api.get(`/api/fetchProductByCategory/${encodeURIComponent(category)}`)
//           : await api.get("/api/fetchProducts");
//         console.log(response);
//         const data = response.data;
//         setProducts(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       }
//     };

//     fetchProducts();
//   }, [location.search]);

//   // Sort products based on selected option
//   const sortedProducts = [...products].sort((a, b) => {
//     switch (sortOption) {
//       case "A-Z":
//         return a.name.localeCompare(b.name);
//       case "Z-A":
//         return b.name.localeCompare(a.name);
//       case "Price: Low to High":
//         return a.price1 - b.price1;
//       case "Price: High to Low":
//         return b.price1 - a.price1;
//       default:
//         return 0;
//     }
//   });

//   // Filter products based on selected categories, brands, and price ranges
//   const filteredProducts = sortedProducts.filter((item) => {
//     const isCategorySelected =
//       selectedCategories.length === 0 ||
//       selectedCategories.some((category) => category.title === item.cat);

//     const isBrandSelected =
//       selectedBrands.length === 0 ||
//       selectedBrands.some((brand) => brand.title === item.brand);

//     const isPriceSelected =
//       selectedPrices.length === 0 ||
//       selectedPrices.some(
//         (priceRange) => item.price >= priceRange.priceOne && item.price <= priceRange.priceTwo
//       );

//     return isCategorySelected && isBrandSelected && isPriceSelected;
//   });


//   // Pagination logic
//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = filteredProducts.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
//   const handlePageClick = (event) => {
//     const newOffset = event.selected * itemsPerPage;
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <div className="px-6">
//         <Breadcrumbs title="Products" />
//       </div>

//       {/* Main Content */}
//       <div className="w-full h-full flex flex-col gap-10">

//         <div className="w-full flex flex-col md:flex-row md:items-center justify-between px-6">
//           {/* Sort and Show Options */}
//           <div className="flex items-center gap-4 mt-4 md:mt-0">
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700">Sort by:</label>
//               <select
//                 id="sortOptions"
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="w-full mt-1 pl-3 pr-10 py-1 border border-gray-300 rounded-sm cursor-pointer text-gray-700 hover:bg-gray-200"
//               >
//                 <option value="A-Z">A-Z</option>
//                 <option value="Z-A">Z-A</option>
//                 <option value="Price: Low to High">Price: Low to High</option>
//                 <option value="Price: High to Low">Price: High to Low</option>
//               </select>
//             </div>

//             <div className="relative cursor-pointer">
//               <label className="block text-gray-600">Show:</label>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => setItemsPerPage(Number(e.target.value))}
//                 className="w-20 border border-gray-300 py-1 px-4 rounded-sm cursor-pointer text-gray-700"
//               >
//                 <option value="12">12</option>
//                 <option value="24">24</option>
//                 <option value="48">48</option>
//                 <option value="96">96</option>
//               </select>
//             </div>
//           </div>

//           {/* Grid/List View Toggle */}
//           <div className="flex items-center gap-4">
//             <span
//               className={`${isSidebarOpen ? "bg-[#7b246d] text-white" : "border border-gray-300 text-gray-600"} rounded-md w-8 h-8 flex justify-center items-center cursor-pointer`}
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             >
//               <FontAwesomeIcon icon={faFilter} />
//             </span>
//             <span
//               className={`${gridViewActive ? "bg-[#7b246d] text-white" : "border border-gray-300 text-gray-600"} rounded-md w-8 h-8 flex justify-center items-center cursor-pointer`}
//               onClick={() => setGridViewActive(true)}
//             >
//               <BsGridFill />
//             </span>
//             <span
//               className={`${!gridViewActive ? "bg-[#7b246d] text-white" : "border border-gray-300 text-gray-600"} rounded-md w-8 h-8 flex justify-center items-center cursor-pointer`}
//               onClick={() => setGridViewActive(false)}
//             >
//               <ImList />
//             </span>
//           </div>
//         </div>

//         {/* Sidebar */}
//         {isSidebarOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 scrollbar-none"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.1 }}
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <motion.div
//               className="fixed top-0 left-0 w-80 bg-white h-full shadow-lg z-50 p-6 overflow-y-auto scrollbar-none transition-transform duration-300 transform hover:scale-105"
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               transition={{ duration: 0.1 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-extrabold">Filter Options</h2>
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
//                   aria-label="Close Sidebar"
//                 >
//                   <RxCross1 size={25} />
//                 </button>
//               </div>

//               {/* Shop by Category */}
//               <div className="mt-9 mb-2">
//                 <div
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() => setShowCategories(!showCategories)}
//                 >
//                   <h3 className="font-bodyFont text-xl text-primeColor">Shop by Category</h3>
//                   <span>{showCategories ? <HiOutlineMinus /> : <BsPlusLg />}</span>
//                 </div>
//                 {showCategories && (
//                   <motion.ul
//                     className="flex flex-col gap-4 mt-5 text-sm text-[#767676] cursor-pointer"
//                     initial={{ height: 0 }}
//                     animate={{ height: "auto" }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {categories.map((item) => (
//                       <li
//                         key={item._id}
//                         className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer  hover:bg-gray-200 transition-colors duration-300"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={checkedCategories.some((cat) => cat._id === item._id)}
//                           onChange={() => handleToggleCategory(item)}
//                           className="cursor-pointer"
//                         />
//                         <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{item.title}</span>
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </div>

//               {/* Shop by Brand */}
//               <div className="mt-7">
//                 <div
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() => setShowBrands(!showBrands)}
//                 >
//                   <h3 className="font-bodyFont text-xl text-primeColor">Shop by Brand</h3>
//                   <span>{showBrands ? <HiOutlineMinus /> : <BsPlusLg />}</span>
//                 </div>
//                 {showBrands && (
//                   <motion.ul
//                     className="flex flex-col gap-4 mt-5 text-sm lg:text-base text-[#767676] cursor-pointer"
//                     initial={{ height: 0 }}
//                     animate={{ height: "auto" }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {brands.map((item) => (
//                       <li
//                         key={item._id}
//                         className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={checkedBrands.some((brand) => brand._id === item._id)}
//                           onChange={() => handleToggleBrand(item)}
//                           className="cursor-pointer"
//                         />
//                         <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{item.title}</span>
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </div>

//               {/* Shop by Price */}
//               <div className="mt-7">
//                 <div
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() => setShowPrices(!showPrices)}
//                 >
//                   <h3 className="font-bodyFont text-xl text-primeColor">Shop by Price</h3>
//                   <span>{showPrices ? <HiOutlineMinus /> : <BsPlusLg />}</span>
//                 </div>
//                 {showPrices && (
//                   <motion.ul
//                     className="flex flex-col gap-4 mt-5 text-sm lg:text-base text-[#767676] cursor-pointer"
//                     initial={{ height: 0 }}
//                     animate={{ height: "auto" }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {priceList.map((item) => (
//                       <li
//                         key={item._id}
//                         className="border-b py-2 pl-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
//                       >
//                         <span className="flex-1 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-300">{`PKR ${item.priceOne.toLocaleString()} - PKR ${item.priceTwo.toLocaleString()}`}</span>
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}

//         {/* Product Grid/List */}
// <div className={`px-4 ${gridViewActive ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10" : "list"}`}>
//   {currentItems.length > 0 ? (
//     currentItems.map((product) => (
//       <div className="w-full" key={product._id}>
//         <Product
//           _id={product._id}
//           img={
//             product.images.length > 0
//               ? product.images.map((img) => img.imagePath.replace(/..[\\/]+client[\\/]+public/, ""))
//               : ['/default_images/image-not-available.png']
//           }
//           productName={product.name}
//           price={product.price1}
//           color={product.color.join(", ")}
//           size={product.size.join(", ")}
//           tags={product.tags}
//           description={product.description}
//           status={product.status}
//         />
//       </div>
//     ))
//   ) : (
//     <p className="text-center items-center justify-center text-gray-500 mt-4">No products found.</p>
//   )}
// </div>

//         {/* Pagination */}
//         <div className="flex flex-col mdl:flex-row justify-between items-center px-6">
//           <p className="text-base text-gray-600">
//             Products {itemOffset + 1} - {Math.min(endOffset, filteredProducts.length)} of {filteredProducts.length}
//           </p>
//           <ReactPaginate
//             onPageChange={handlePageClick}
//             pageCount={pageCount}
//             containerClassName="flex text-base font-semibold py-4"
//             pageClassName="mr-4"
//             pageLinkClassName="w-8 h-8 border border-gray-300 hover:border-gray-500 flex justify-center items-center rounded-md"
//             activeClassName="bg-[#7b246d] text-white rounded-md"
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Products;

// // import React, { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import { BsGridFill } from "react-icons/bs";
// // import { ImList } from "react-icons/im";
// // import ReactPaginate from "react-paginate";
// // import { useDispatch, useSelector } from "react-redux";
// // import Product from "./ProductCard.jsx";
// // import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
// // import api from "../../../api/api.js";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faFilter } from "@fortawesome/free-solid-svg-icons";
// // import { toggleCategory, toggleBrand, togglePrice } from "../../../redux/reduxSlice";
// // import { motion } from "framer-motion";
// // // import ProductsSideBar from "./ProductsSideBar"; // Keep sidebar import as it is

// // function Products() {
// //   const [products, setProducts] = useState([]);
// //   const [itemsPerPage, setItemsPerPage] = useState(12);
// //   const [gridViewActive, setGridViewActive] = useState(true);
// //   const [itemOffset, setItemOffset] = useState(0);
// //   const [sortOption, setSortOption] = useState("Best Sellers");
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Control sidebar visibility

// //   // Redux selectors for selected categories, brands, and prices
// //   const selectedCategories = useSelector((state) => state.reduxReducer.checkedCategories);
// //   const selectedBrands = useSelector((state) => state.reduxReducer.checkedBrands);
// //   const selectedPrices = useSelector((state) => state.reduxReducer.checkedPrices);

// //   const location = useLocation();
// //   const dispatch = useDispatch();

// //   // Fetch products based on category in the URL, if any
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       const params = new URLSearchParams(location.search);
// //       const category = params.get("category");

// //       try {
// //         const response = category
// //           ? await api.get(`/api/fetchProductByCategory/${encodeURIComponent(category)}`)
// //           : await api.get("/api/fetchProducts");
// //         setProducts(Array.isArray(response.data) ? response.data : []);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //         setProducts([]);
// //       }
// //     };

// //     fetchProducts();
// //   }, [location.search]);

// //   // Sort products based on the selected option
// //   const sortedProducts = [...products].sort((a, b) => {
// //     switch (sortOption) {
// //       case "A-Z":
// //         return a.name.localeCompare(b.name);
// //       case "Z-A":
// //         return b.name.localeCompare(a.name);

// //       case "Price: Low to High":
// //         return a.price1 - b.price1;
// //       case "Price: High to Low":
// //         return b.price1 - a.price1;
// //       default:
// //         return 0;
// //     }
// //   });

// //   // Filter products based on selected categories, brands, and price ranges
// //   const filteredProducts = sortedProducts.filter((item) => {
// //     const isCategorySelected =
// //       selectedCategories.length === 0 ||
// //       selectedCategories.some((category) => category.title === item.cat);

// //     const isBrandSelected =
// //       selectedBrands.length === 0 ||
// //       selectedBrands.some((brand) => brand.title === item.brand);

// //     const isPriceSelected =
// //       selectedPrices.length === 0 ||
// //       selectedPrices.some(
// //         (priceRange) => item.price1 >= priceRange.priceOne && item.price1 <= priceRange.priceTwo
// //       );

// //     return isCategorySelected && isBrandSelected && isPriceSelected;
// //   });

// //   // Pagination logic
// //   const endOffset = itemOffset + itemsPerPage;
// //   const currentItems = filteredProducts.slice(itemOffset, endOffset);
// //   const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

// //   const handlePageClick = (event) => {
// //     const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
// //     setItemOffset(newOffset);
// //   };

// //   return (
// //     <div className="product-page">
// //       <Breadcrumbs />
// //       <div className="product-listing-container">
// //         {/* Sidebar toggle button */}
// //         <button
// //           className="filter-button flex items-center gap-2"
// //           onClick={() => setIsSidebarOpen(true)}
// //         >
// //           <FontAwesomeIcon icon={faFilter} />
// //           Filter
// //         </button>

// //         {/* Sidebar */}
// //         <ProductsSideBar
// //           isSidebarOpen={isSidebarOpen}
// //           setIsSidebarOpen={setIsSidebarOpen}
// //         />

// //         {/* Grid/List View and Sorting */}
// //         <div className="view-options flex justify-between items-center">
// //           <div className="view-toggle flex items-center gap-3">
// //             <BsGridFill
// //               className={`cursor-pointer ${gridViewActive ? "text-blue-500" : ""}`}
// //               onClick={() => setGridViewActive(true)}
// //             />
// //             <ImList
// //               className={`cursor-pointer ${!gridViewActive ? "text-blue-500" : ""}`}
// //               onClick={() => setGridViewActive(false)}
// //             />
// //           </div>
// //           <div className="sorting">
// //             <select
// //               value={sortOption}
// //               onChange={(e) => setSortOption(e.target.value)}
// //             >
// //               <option value="Best Sellers">Best Sellers</option>
// //               <option value="A-Z">A-Z</option>
// //               <option value="Z-A">Z-A</option>
// //               <option value="Price: Low to High">Price: Low to High</option>
// //               <option value="Price: High to Low">Price: High to Low</option>
// //             </select>
// //           </div>
// //         </div>

// //         {/* Product Grid or List */}
// //         <div className={`product-grid ${gridViewActive ? "grid" : "list"}`}>
// //           {currentItems.length > 0 ? (
// //             currentItems.map((product) => (
// //               <Product key={product._id} product={product} />
// //             ))
// //           ) : (
// //             <p>No products found.</p>
// //           )}
// //         </div>

// //         {/* Pagination */}
// //         <ReactPaginate
// //           previousLabel={"Previous"}
// //           nextLabel={"Next"}
// //           pageCount={pageCount}
// //           onPageChange={handlePageClick}
// //           containerClassName={"pagination"}
// //           previousLinkClassName={"previous-page"}
// //           nextLinkClassName={"next-page"}
// //           disabledClassName={"pagination-disabled"}
// //           activeClassName={"pagination-active"}
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Products;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Product from "./ProductCard.jsx";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
import api from "../../../api/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { toggleCategory, toggleBrand, togglePrice } from "../../../redux/reduxSlice";
import { motion } from "framer-motion";

function Products() {
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [gridViewActive, setGridViewActive] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [sortOption, setSortOption] = useState("Best Sellers");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  // const [showCategories, setShowCategories] = useState(true);
  // const [showBrands, setShowBrands] = useState(true);
  // const [showPrices, setShowPrices] = useState(true);

  const checkedCategories = useSelector((state) => state.reduxReducer.checkedCategories);
  const checkedBrands = useSelector((state) => state.reduxReducer.checkedBrands);
  const checkedPrices = useSelector((state) => state.reduxReducer.checkedPrices);
  const dispatch = useDispatch();

  const categories = [
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

  const handleTogglePrice = (priceRange) => {
    dispatch(togglePrice(priceRange));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams(location.search);
      const category = params.get("category");
  
      try {
        const response = category
          ? await api.get(`/api/fetchProductByCategory/${encodeURIComponent(category)}`)
          : await api.get("/api/fetchProducts");
          
        console.log(response);
        const data = response.data;
        setProducts(Array.isArray(data.fetchCategory) ? data.fetchCategory : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
  
    fetchProducts();
  }, [location.search]);
  
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
        return 0;
    }
  });

  // Filter products based on selected categories, brands, and price ranges
  const filteredProducts = sortedProducts.filter((item) => {
    const isCategorySelected =
      checkedCategories.length === 0 ||
      checkedCategories.some((category) => category.title === item.cat);

    const isBrandSelected =
      checkedBrands.length === 0 ||
      checkedBrands.some((brand) => brand.title === item.brand);

    const isPriceSelected =
      checkedPrices.length === 0 ||
      checkedPrices.some(
        (priceRange) => item.price1 >= priceRange.priceOne && item.price1 <= priceRange.priceTwo
      );

    return isCategorySelected && isBrandSelected && isPriceSelected;
  });

  // Pagination logic
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="px-6"><Breadcrumbs title="Products" /></div>

      {/* Main Content */}
      <div className="w-full h-full flex flex-col gap-10">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between px-6">
          {/* Sort and Show Options */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Sort by:</label>
              <select
                id="sortOptions"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-auto mt-1 pl-3 pr-10 py-1 border border-gray-300 rounded-sm cursor-pointer text-gray-700 hover:bg-gray-200"
              >
                <option value="A-Z">Alphabetically: A-Z</option>
                <option value="Z-A">Alphabetically: Z-A</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>

            <div className="relative cursor-pointer">
              <label className="block text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="w-20 border border-gray-300 py-1 px-4 rounded-sm cursor-pointer text-gray-700"
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
                <option value="96">96</option>
              </select>
            </div>
          </div>

          {/* Grid/List View Toggle */}
          <div className="flex items-center gap-4 sm:mt-2">
            <span
              className={`${isSidebarOpen ? "bg-[#7b246d] text-white" : "border border-gray-300 text-gray-600"} rounded-md w-8 h-8 flex justify-center items-center cursor-pointer`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} // This should correctly toggle the sidebar
            >
              <FontAwesomeIcon icon={faFilter} />
            </span>
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
          </div>
        </div>

        {/* Filter Sidebar */}
        {isSidebarOpen && (
          <>
            {/* Sidebar Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[90]"
              onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-gradient-to-br from-purple-800 via-gray-800 to-gray-700 text-white shadow-2xl w-80 overflow-y-auto h-screen fixed top-0 left-0 rounded-tr-3xl p-6 scrollbar-none z-[90]`}
            >
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-600 pb-2">Categories</h3>
                <ul className="list-none space-y-4">
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className="flex items-center py-2 hover:bg-gray-600 rounded-md cursor-pointer transition-all duration-200 ease-in-out"
                    >
                      <input
                        type="checkbox"
                        checked={checkedCategories.some((c) => c._id === category._id)}
                        onChange={() => handleToggleCategory(category)}
                        className="mr-3 h-5 w-5 text-purple-500 focus:ring-0 checked:bg-red-500"
                      />
                      <span className="text-base font-medium">{category.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-600 pb-2">Brands</h3>
                <ul className="list-none space-y-4">
                  {brands.map((brand) => (
                    <li
                      key={brand._id}
                      className="flex items-center py-2 hover:bg-gray-600 rounded-md cursor-pointer transition-all duration-200 ease-in-out"
                    >
                      <input
                        type="checkbox"
                        checked={checkedBrands.some((b) => b._id === brand._id)}
                        onChange={() => handleToggleBrand(brand)}
                        className="mr-3 h-5 w-5 text-purple-500 focus:ring-0 checked:bg-red-500"
                      />
                      <span className="text-base font-medium">{brand.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-600 pb-2">Price Range</h3>
                <ul className="list-none space-y-4">
                  {priceList.map((priceRange) => (
                    <li
                      key={priceRange._id}
                      className="flex items-center py-2 hover:bg-gray-600 rounded-md cursor-pointer transition-all duration-200 ease-in-out"
                    >
                      <input
                        type="checkbox"
                        checked={checkedPrices.some((p) => p._id === priceRange._id)}
                        onChange={() => handleTogglePrice(priceRange)}
                        className="mr-3 h-5 w-5 text-purple-500 focus:ring-0 checked:bg-red-500"
                      />
                      <span className="text-base font-medium">${priceRange.priceOne} - ${priceRange.priceTwo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close Button */}
              <button
                className="sidebar-button mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>
            </motion.div>
          </>
        )}

        {/* Products Display */}
        <div className={`px-4 ${gridViewActive ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-6" : "flex-col gap-4"}`}>
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <div className="w-full" key={product._id}>
                <Product
                  _id={product._id}
                  img={
                    product.images.length > 0
                      ? product.images.map((img) => img.imagePath.replace(/..[\\/]+client[\\/]+public/, ""))
                      : ['/default_images/image-not-available.png']
                  }
                  productName={product.name}
                  price={product.price1}
                  color={product.color.join(", ")}
                  size={product.size.join(", ")}
                  tags={product.tags}
                  description={product.description}
                  status={product.status}
                />
              </div>
            ))
          ) : (
            <p className="text-center items-center justify-center text-gray-500 mt-4">No products found.</p>
          )}
          {/* </div> */}
        </div>

        {/* Pagination */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center gap-2 mb-10"
          pageLinkClassName="px-4 py-2 border border-gray-300 rounded-md"
          previousLinkClassName="px-4 py-2 border border-gray-300 rounded-md"
          nextLinkClassName="px-4 py-2 border border-gray-300 rounded-md"
          activeLinkClassName="bg-[#7b246d] text-white"
        />
      </div>
    </>
  );
}

export default Products;
