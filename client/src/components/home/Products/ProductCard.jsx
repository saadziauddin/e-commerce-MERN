import React, { useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Image from "../../designLayouts/Image";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reduxSlice";

function ProductCard(props) {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const navigate = useNavigate();
  const productItem = props;

  // Check if img is an array or a single string
  const images = Array.isArray(props.img) ? props.img : [props.img];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleMouseEnter = () => {
    const nextImageIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextImageIndex);
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0); // Reset to the first image when not hovering
  };

  return (
    <div className="w-full p-4 relative rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      {/* Adjust the image container to take full width */}
      <div
        className="relative w-full h-[500px] overflow-hidden rounded-lg group transition-all duration-500 hover:scale-105 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          className="w-full h-full object-cover"
          imgSrc={images[currentImageIndex]}
          alt={props.productName}
        />
        <div className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-[#95d1dd] bg-[#7b246d] bg-opacity-90 rounded-lg shadow-lg">
          {props.tags}
        </div>
      </div>
      {/* Product Info */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 text-left">
            {props.productName}
          </h2>
          <p className="text-gray-600 mt-1 text-left">
            PKR {props.price.toLocaleString()}
          </p>
        </div>
        {/* Buy Now and Favorite Button */}
        <div className="flex items-center gap-2">
          <Link
            to=""
            className="flex items-center gap-1 bg-gray-100 text-[#7b246d] font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-[#7b246d] hover:text-gray-100"
            onClick={() =>
              dispatch(
                addToCart({
                  _id: rootId,
                  name: props.productName,
                  quantity: 1,
                  image: images[0],
                  badge: props.tags,
                  price: props.price,
                  colors: props.color,
                  sizes: props.size,
                })
              )
            }
          >
            <FaShoppingCart />
          </Link>
          <button className="flex items-center gap-1 bg-gray-100 text-[#7b246d] font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-[#7b246d] hover:text-gray-100">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
