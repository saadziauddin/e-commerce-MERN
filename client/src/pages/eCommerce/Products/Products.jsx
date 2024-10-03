import React, { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Product from "../../../components/home/Products/ProductCard";
import { paginationItems } from "../../../constants";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import ShopSideNav from "../../../components/pageProps/shopPage/ShopSideNav";

const items = paginationItems;

function Items({ currentItems, selectedBrands, selectedCategories }) {
  // Filter items based on selected brands and categories
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
      {filteredItems.map((item) => (
        <div key={item._id} className="w-full">
          <Product
            _id={item._id}
            img={item.img}
            productName={item.productName}
            price={item.price}
            color={item.color}
            badge={item.badge}
            des={item.des}
            pdf={item.pdf}
            ficheTech={item.ficheTech}
          />
        </div>
      ))}
    </>
  );
}

function Products() {
  const [itemsPerPage, setItemsPerPage] = useState(48);
  const [gridViewActive, setGridViewActive] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const selectedBrands = useSelector((state) => state.reduxReducer.checkedBrands);
  const selectedCategories = useSelector((state) => state.reduxReducer.checkedCategorys);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };
  useEffect(() => {
    const gridView = document.querySelector(".gridView");
    const listView = document.querySelector(".listView");

    const handleGridViewClick = () => {
      setGridViewActive(true);
    };

    const handleListViewClick = () => {
      setGridViewActive(false);
    };

    gridView.addEventListener("click", handleGridViewClick);
    listView.addEventListener("click", handleListViewClick);

    return () => {
      gridView.removeEventListener("click", handleGridViewClick);
      listView.removeEventListener("click", handleListViewClick);
    };
  }, []);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      <div className="w-full h-full flex pb-20 gap-10">
        {/* Sidenav */}
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>

        {/* Filters */}
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between">

            <div className="flex items-center gap-4">
              <span
                className={`${
                  gridViewActive
                    ? "bg-primeColor text-white"
                    : "border-[1px] border-gray-300 text-[#737373]"
                } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
              >
                <BsGridFill />
              </span>
              <span
                className={`${
                  !gridViewActive
                    ? "bg-primeColor text-white"
                    : "border-[1px] border-gray-300 text-[#737373]"
                } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
              >
                <ImList />
              </span>
            </div>

            <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-base text-[#767676] relative">
                <label className="block">Sort by:</label>
                <select
                  id="countries"
                  className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
                >
                  <option value="Best Sellers">Best Sellers</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Featured">Featured</option>
                  <option value="Final Offer">Final Offer</option>
                </select>
                <span className="absolute text-sm right-2 md:right-4 top-2.5">
                  <GoTriangleDown />
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#767676] relative">
                <label className="block">Show:</label>
                <select
                  onChange={(e) => setItemsPerPage(+e.target.value)}
                  className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                </select>
                <span className="absolute text-sm right-3 top-2.5">
                  <GoTriangleDown />
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className={`grid ${gridViewActive ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "list-cols"} gap-10 mdl:gap-4 lg:gap-10`}>
              <Items
                currentItems={currentItems}
                selectedBrands={selectedBrands}
                selectedCategories={selectedCategories}
              />
            </div>

            <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
              <ReactPaginate
                nextLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel=""
                pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                pageClassName="mr-6"
                containerClassName="flex text-base font-semibold font-titleFont py-10"
                activeClassName="bg-black text-white"
              />

              <p className="text-base font-normal text-lightText">
                Products from {itemStart} to {Math.min(endOffset, items.length)} of {items.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
