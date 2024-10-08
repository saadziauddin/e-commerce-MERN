import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reduxSlice";
import { PiShoppingCartLight, PiHeartStraightLight } from "react-icons/pi";
import { TfiSearch } from "react-icons/tfi";

function ProductCard(props) {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => String(_id).toLowerCase().split(" ").join("");
  const rootId = idString(_id);
  const navigate = useNavigate();
  const productItem = props;

  const images = Array.isArray(props.img) ? props.img : [props.img];
  console.log("Images in array: ", images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleProductDetails = () => {
    navigate(`/product/${props._id}`, {
      state: {
        item: productItem,
      },
    });
    console.log("Navigating to product details with:", productItem);
  };

  const handleMouseEnter = () => {
    const nextImageIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextImageIndex);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
    setIsHovered(false);
  };

  return (
    <div className={`w-full relative transition-all duration-300 ${isHovered ? "hover:shadow-xl transition-transform hover:scale-105 z-50" : "shadow-none"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image */}
      <div
        className={`relative w-full h-[350px] xs:h-[250px] sm:h-[350px] md:h-[450px] lg:h-[450px] overflow-hidden cursor-pointer`}
        onClick={handleProductDetails}
      >
        <img
          className="w-full h-full object-cover"
          src={images[currentImageIndex]}
          alt={props.productName}
        />
        {/* Add to Cart button on hover */}
        {isHovered && (
          <button
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 border-2 border-gray-900 text-gray-900 xs:text-xs sm:text-xs md:text-sm font-semibold rounded-sm bg-transparent hover:bg-[#7b246d] hover:border-[#7b246d] hover:text-white transition-colors duration-300"
            onClick={() => dispatch(addToCart(productItem))}
          >
            Add to Cart
          </button>
        )}
      </div>


      {/* Product Info */}
      <div className={`mt-1 p-3 transition-all duration-300 ${isHovered ? "h-[150px]" : "h-[100px]"}`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{props.productName}</h2>
            <p className="text-gray-600">
              <span className="text-xs">PKR</span> Rs.{props.price ? props.price.toLocaleString() : "Price not available"}
            </p>
          </div>

          <button
            className="border-2 border-gray-900 text-gray-900 xs:text-sm sm:text-sm md:text-sm font-semibold py-2 px-4 rounded-sm bg-transparent hover:bg-[#7b246d] hover:border-[#7b246d] hover:text-white transition-colors duration-300"
            onClick={handleProductDetails}
          >
            Buy Now
          </button>
        </div>

        {/* Appears on hover */}
        {isHovered && (
          <>
            <p className="text-sm text-gray-500 mt-2">
              {props.description || "This is a short description of the product."}
            </p>
            <div className="flex items-center justify-center gap-2">
              <button className="flex justify-center text-black py-2 px-4 text-xl" onClick={handleProductDetails}>
                <TfiSearch />
              </button>
              <button className="flex justify-center text-black font-bold py-2 px-4 text-2xl">
                <PiHeartStraightLight />
              </button>
              <button className="flex justify-center text-black font-bold py-2 px-4 text-2xl" onClick={handleProductDetails}>
                <PiShoppingCartLight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
