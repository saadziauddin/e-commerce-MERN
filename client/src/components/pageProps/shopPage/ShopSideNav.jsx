import React, { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory, toggleBrand } from "../../../redux/reduxSlice";
import { motion } from "framer-motion";

const ShopSideNav = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const checkedCategories = useSelector((state) => state.reduxReducer.checkedCategorys);
  const dispatch = useDispatch();

  const categories = [
    { _id: 9006, title: "Imprimante" },
    { _id: 9007, title: "Encre" },
    { _id: 9008, title: "Ruban" },
    { _id: 9009, title: "Bac de dechet" },
  ];

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  const [showColors, setShowColors] = useState(true);
  const colors = [
    { _id: 9001, title: "Green", base: "#22c55e" },
    { _id: 9002, title: "Gray", base: "#a3a3a3" },
    { _id: 9003, title: "Red", base: "#dc2626" },
    { _id: 9004, title: "Yellow", base: "#f59e0b" },
    { _id: 9005, title: "Blue", base: "#3b82f6" },
  ];

  const [showBrands, setShowBrands] = useState(true);
  const checkedBrands = useSelector((state) => state.reduxReducer.checkedBrands);
  const brands = [
    { _id: 900, title: "Pantum" },
    { _id: 901, title: "Hp" },
    { _id: 902, title: "Epson" },
    { _id: 903, title: "Ricoh" },
  ];

  const handleToggleBrand = (brand) => {
    dispatch(toggleBrand(brand));
  };

  const priceList = [
    { _id: 950, priceOne: 0.0, priceTwo: 49.99 },
    { _id: 951, priceOne: 50.0, priceTwo: 99.99 },
    { _id: 952, priceOne: 100.0, priceTwo: 199.99 },
    { _id: 953, priceOne: 200.0, priceTwo: 399.99 },
    { _id: 954, priceOne: 400.0, priceTwo: 599.99 },
    { _id: 955, priceOne: 600.0, priceTwo: 1000.0 },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Shop by Category */}
      <div className="w-full">
        <NavTitle title="Shop by Category" icons={true} />
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={item._id}
                checked={checkedCategories.some((cat) => cat._id === item._id)}
                onChange={() => handleToggleCategory(item)}
              />
              {item.title}
              {item.icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Shop by Brand */}
      <div>
        <div onClick={() => setShowBrands(!showBrands)} className="cursor-pointer">
          <NavTitle title="Shop by Brand" icons={true} />
        </div>
        {showBrands && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
              {brands.map((item) => (
                <li
                  key={item._id}
                  className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                >
                  <input
                    type="checkbox"
                    id={item._id}
                    checked={checkedBrands.some((brand) => brand._id === item._id)}
                    onChange={() => handleToggleBrand(item)}
                  />
                  {item.title}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Shop by Color */}
      <div>
        <div onClick={() => setShowColors(!showColors)} className="cursor-pointer">
          <NavTitle title="Shop by Color" icons={true} />
        </div>
        {showColors && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
              {colors.map((item) => (
                <li
                  key={item._id}
                  className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2"
                >
                  <span
                    style={{ background: item.base }}
                    className={`w-3 h-3 bg-gray-500 rounded-full`}
                  ></span>
                  {item.title}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Shop by Price */}
      <div className="cursor-pointer">
        <NavTitle title="Shop by Price" icons={false} />
        <div className="font-titleFont">
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {priceList.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopSideNav;

