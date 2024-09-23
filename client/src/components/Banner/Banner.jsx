import React, {useState} from "react";
import Slider from "react-slick";
import { bannerImgOne, bannerImgTwo } from "../../assets/images/website_images";
import Image from "../designLayouts/Image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Custom arrows for navigation
const NextArrow = ({ onClick }) => (
  <div onClick={onClick} className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer text-black/80 bg-white/95 hover:bg-black/80 hover:text-white/95 rounded-full p-1.5 text-xs md:p-2 md:text-md lg:p-2 lg:text-md xl:p-2 xl:text-md 2xl:p-2 2xl:text-md 3xl:p-2 3xl:text-md 4xl:p-2 5xl:text-md">
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div onClick={onClick} className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer text-black/80 bg-white/95 hover:bg-black/80 hover:text-white/95 rounded-full p-1.5 text-xs md:p-2 md:text-md lg:p-2 lg:text-md xl:p-2 xl:text-md 2xl:p-2 2xl:text-md 3xl:p-2 3xl:text-md 4xl:p-2 5xl:text-md" >
    <FaArrowLeft />
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
      <div className={`w-4 h-1 px-4 mx-1 cursor-pointer ${i === dotActive ? 'bg-white' : 'bg-gray-300'}`} />
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
            <div className={`w-1 h-0.5 px-2 mx-1 cursor-pointer ${i === dotActive ? 'bg-white' : 'bg-gray-300'}`} />
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
            <div className={`w-1 h-0.5 px-2 mx-1 cursor-pointer ${i === dotActive ? 'bg-white' : 'bg-gray-300'}`} />
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
