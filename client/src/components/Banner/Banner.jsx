import React, {useState} from "react";
import Slider from "react-slick";
import { bannerImgOne, bannerImgTwo } from "../../assets/images/website_images";
import Image from "../designLayouts/Image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer 
    text-black bg-gray-200 hover:bg-[#7b246d] hover:text-white 
    rounded-l-lg p-2 transition-all duration-300 ease-in-out"
  >
    <FaChevronRight className="text-xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer 
    text-black bg-gray-200 hover:bg-[#7b246d] hover:text-white 
    rounded-r-lg p-2 transition-all duration-300 ease-in-out"
  >
    <FaChevronLeft className="text-xl" />
  </div>
);


const CustomSlide = ({ imgSrc }) => (
  <div className="relative flex justify-center items-center">
    <Image imgSrc={imgSrc} className="w-full h-[150px] md:h-[550px] lg:h-[550px] xl:h-[550px] object-cover" />
  </div>
);

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (prev, next) => setDotActive(next),
    customPaging: (i) => (
      <div className={`w-4 h-1 px-4 mx-1 cursor-pointer ${i === dotActive ? 'bg-white' : 'bg-gray-400'}`} />
    ),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ul className="flex">{dots}</ul>
      </div>
    ),
    dotsClass: "slick-dots",
    responsive: [
      {
        breakpoint: 768, // Adjust for tablet and mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          customPaging: (i) => (
            <div className={`w-1 h-0.5 px-2 mx-1 cursor-pointer ${i === dotActive ? 'bg-white' : 'bg-gray-400'}`} />
          ),
        },
      },
      {
        breakpoint: 576, // Further adjustments for very small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          customPaging: (i) => (
            <div className={`w-1 h-0.5 px-2 mx-1 cursor-pointer ${i === dotActive ? 'bg-white' : 'bg-gray-400'}`} />
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: bannerImgTwo,
    },
    {
      imgSrc: bannerImgOne,
    },
    {
      imgSrc: bannerImgOne,
    },
  ];

  return (
    <div className="w-full bg-[#ffff] mt-6 relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
