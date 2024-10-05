import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "../ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from '../../../../api/api.js';

function BestSellers () {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/fetchProductsByCategory/bestSellers");
        const data = await response.data;
        console.log("Fetched data by category: ", data);
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
      <div className="w-10 h-10 text-black hover:text-[#4a1341] duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-0" onClick={onClick}>
        <span className="text-2xl">
          <FaChevronRight />
        </span>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="w-10 h-10 text-black hover:text-[#4a1341] text-md duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] left-0" onClick={onClick}>
        <span className="text-2xl">
          <FaChevronLeft />
        </span>
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
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16 relative">
      <div className="text-3xl font-semibold pb-6">Our Bestsellers</div>

      <Slider {...settings}>
        {products.length > 0 ? (
          products.map((product) => (
            <div className="px-2" key={product._id}>
              <Product
                _id={product._id}
                img={
                  product.images.length > 0
                    ? product.images[0].imagePath.replace(/..[\\/]+client[\\/]+public/, "")
                    : '/default_images/image-not-available.png'
                } 
                productName={product.name}
                price={product.price1}
                color={product.color.join(", ")}
                size={product.size.join(", ")}
                tags={product.tags}
              />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Slider>
    </div>
  );
};

export default BestSellers;
