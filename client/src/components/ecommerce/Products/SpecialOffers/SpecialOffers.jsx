import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "../ProductCard";
import api from '../../../../api/api.js';
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";

function SpecialOffers({ selectedCurrency }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/fetchProductsByCategory/newArrivals");
        const data = await response.data;
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchProducts();
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="w-10 h-10 text-black hover:text-[#4a1341] text-3xl duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-2 lg:right-4"
        onClick={onClick}
      >
        <TfiAngleRight />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="w-10 h-10 text-black hover:text-[#4a1341] text-3xl duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] left-2 lg:left-4"
        onClick={onClick}
      >
        <TfiAngleLeft />
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="mb-10">
      <div className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center font-semibold uppercase">
        <p className="bg-[#7b246d] text-white">Special Offers</p>
      </div>
      <Slider {...settings}>
        {products.length > 0 ? (
          products.map((product) => {
            
            const imagePaths = Array.isArray(product.images) && product.images.length > 0
              ? product.images.map((img) => `${apiUrl}/uploads/product_images/${img.imageName}`)
              : [`${apiUrl}/default_images/image-not-available.png`];
            
            return (
              <div className="px-2 py-10" key={product._id}>
                <Product
                  _id={product._id}
                  img={imagePaths}
                  productName={product.name || "Product Name Not Available"}
                  price1={product.price1 || "Price Not Available"}
                  price2={product.price2 || "Price Not Available"}
                  color={Array.isArray(product.color) && product.color.length > 0 ? product.color.join(", ") : null}
                  size={Array.isArray(product.size) && product.size.length > 0 ? product.size.join(", ") : null}
                  tags={Array.isArray(product.tags) && product.tags.length > 0 ? product.tags : null}
                  shortDescription={product.shortDescription || null}
                  longDescription={product.longDescription || null}
                  status={product.status || null}
                  selectedCurrency={selectedCurrency}
                />
              </div>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </Slider>
    </div>
  );
};

export default SpecialOffers;
