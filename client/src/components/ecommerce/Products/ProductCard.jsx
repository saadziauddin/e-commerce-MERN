import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reduxSlice";
import FormatPrice from "../../../helpers/FormatPrice";
import { PiShoppingCartLight, PiHeartStraightLight } from "react-icons/pi";
import { TfiSearch } from "react-icons/tfi";

function ProductCard(props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => String(_id).toLowerCase().split(" ").join("");
  const rootId = idString(_id);
  const navigate = useNavigate();
  const productItem = props;

  const selectedCurrency = props.selectedCurrency || "PKR";

  const images = Array.isArray(props.img) ? props.img : [props.img];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleProductDetails = () => {
    navigate(`/product/${props._id}`, {
      state: {
        item: productItem,
      },
    });
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
    <div className={`max-w-container relative group transition-all duration-300 ease-in-out ${isHovered ? "hover:shadow-xl hover:scale-105 rounded-md z-[60]" : ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      {/* Product Image */}
      <div
        className="relative w-full h-[350px] xs:h-[250px] sm:h-[350px] md:h-[450px] lg:h-[450px] overflow-hidden cursor-pointer"
        onClick={handleProductDetails}
      >
        {images.map((image, index) => (
          <img
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? "opacity-100" : "opacity-0"}`}
            src={image}
            alt={props.productName}
            onError={(e) => {
              console.error('Image failed to load, using default image.');
              e.target.src = [`${apiUrl}/default_images/image-not-available.png`];
            }}          
          />
        ))}

        {/* Add to Cart button on hover */}
        {isHovered && (
          <button
            className="absolute bottom-0 w-full left-[50%] uppercase transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-gray-100 xs:text-xs sm:text-xs md:text-sm font-semibold hover:bg-[#7b246d] hover:text-white transition-colors duration-300"
            // onClick={() => dispatch(addToCart(productItem))}
            onClick={handleProductDetails}
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Product Info */}
      <div
        className={`mt-1 p-1 px-2 bg-white transition-all duration-300 ${isHovered ? "h-auto" : "h-[100px]"
          }`}
      >
        <div className="flex justify-center items-center">
          <div>
            <h3 className="xs:text-md sm:text-md md:text-md lg:text-lg xl:text-lg text-center uppercase text-gray-800">
              {props.productName || "Product Name Unavailable"}
            </h3>

            {props.status && (
              <p
                className={`font-sans xs:text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center uppercase ${props.status === "Available"
                  ? "text-green-500"
                  : "text-red-600"
                  }`}
              >
                {props.status}
              </p>
            )}

            {props.price && (
              <p className="text-gray-800 font-[550] text-center xs:text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg">
                {<FormatPrice price={productItem.price1} currency={selectedCurrency} />}
                <span className="line-through">{<FormatPrice price={productItem.price2} currency={selectedCurrency} />}</span>
              </p>
            )}
          </div>
          {/* <button className="hidden lg:block xl:block uppercase border-2 border-gray-900 text-gray-900 xs:text-sm sm:text-sm md:text-sm font-semibold py-2 px-4 rounded-sm bg-transparent hover:bg-[#7b246d] hover:border-[#7b246d] hover:text-white transition-colors duration-300" onClick={handleProductDetails}>
            Shop Now
          </button> */}
        </div>

        {/* Description Appears on hover */}
        {isHovered && (
          <p className="absolute left-0 right-0 w-full text-sm text-center text-gray-800 bg-white py-6 overflow-hidden max-h-[4rem] transition-max-height duration-300 ease-in-out">
            {props.shortDescription || "This is a short description of the product."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
