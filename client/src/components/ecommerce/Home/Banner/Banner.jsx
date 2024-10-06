// import React, { useState } from "react";
// import Slider from "react-slick";
// import bannerImgOne from "../../../../assets/images/website_images/banner/bannerImgOne.jpg";
// import bannerImgTwo from "../../../../assets/images/website_images/banner/bannerImgTwo.jpg";
// import bannerImgThree from "../../../../assets/images/website_images/banner/bannerImgThree.jpg";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const NextArrow = ({ onClick }) => (
//   <div
//     onClick={onClick}
//     className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer 
//     text-black bg-gray-200 hover:bg-[#7b246d] hover:text-white 
//     rounded-l-lg p-2 transition-all duration-300 ease-in-out"
//   >
//     <FaChevronRight className="text-xs md:text-xl lg:text-xl xl:text-xl" />
//   </div>
// );

// const PrevArrow = ({ onClick }) => (
//   <div
//     onClick={onClick}
//     className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer 
//     text-black bg-gray-200 hover:bg-[#7b246d] hover:text-white 
//     rounded-r-lg p-2 transition-all duration-300 ease-in-out"
//   >
//     <FaChevronLeft className="text-xs md:text-xl lg:text-xl xl:text-xl" />
//   </div>
// );

// const CustomSlide = ({ imgSrc }) => (
//   <div className="relative flex justify-center items-center">
//     <img
//       className="w-full h-[250px] md:h-[550px] lg:h-[550px] xl:h-[550px] object-cover cursor-pointer"
//       src={imgSrc}
//       alt="banner"
//     />
//   </div>
// );

// const Banner = () => {
//   const [dotActive, setDotActive] = useState(0);
//   const settings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     beforeChange: (prev, next) => setDotActive(next),
//     customPaging: (i) => (
//       <div
//         className={`w-4 h-1 px-4 mx-1 cursor-pointer ${
//           i === dotActive ? "bg-white" : "bg-gray-400"
//         }`}
//       />
//     ),
//     appendDots: (dots) => (
//       <div
//         style={{
//           position: "absolute",
//           bottom: "5px",
//           left: "50%",
//           transform: "translateX(-50%)",
//         }}
//       >
//         <ul className="flex">{dots}</ul>
//       </div>
//     ),
//     dotsClass: "slick-dots",
//     responsive: [
//       {
//         breakpoint: 768, // Tablet and mobile screens
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: true,
//           customPaging: (i) => (
//             <div
//               className={`w-1 h-0.5 px-2 mx-1 cursor-pointer ${
//                 i === dotActive ? "bg-white" : "bg-gray-400"
//               }`}
//             />
//           ),
//         },
//       },
//       {
//         breakpoint: 576, // Very small screens
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: true,
//           customPaging: (i) => (
//             <div
//               className={`w-1 h-0.5 px-2 mx-1 cursor-pointer ${
//                 i === dotActive ? "bg-white" : "bg-gray-400"
//               }`}
//             />
//           ),
//         },
//       },
//     ],
//   };

//   const slides = [
//     { imgSrc: bannerImgOne },
//     { imgSrc: bannerImgTwo },
//     { imgSrc: bannerImgThree },
//   ];

//   return (
//     <div className="w-full bg-white mt-6 relative">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <CustomSlide key={index} imgSrc={slide.imgSrc} />
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Banner;

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import bannerImgOne from "../../../../assets/images/website_images/banner/bannerImgOne.jpg";
import bannerImgTwo from "../../../../assets/images/website_images/banner/bannerImgTwo.jpg";
import bannerImgThree from "../../../../assets/images/website_images/banner/bannerImgThree.jpg";
import mobileBannerImgOne from "../../../../assets/images/website_images/banner/mobileBannerImgThree.jpg";
import mobileBannerImgTwo from "../../../../assets/images/website_images/banner/mobileBannerImgThree.jpg";
import mobileBannerImgThree from "../../../../assets/images/website_images/banner/mobileBannerImgThree.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer 
    text-black bg-gray-200 hover:bg-[#7b246d] hover:text-white 
    rounded-l-lg p-2 transition-all duration-300 ease-in-out"
  >
    <FaChevronRight className="text-xs md:text-xl lg:text-xl xl:text-xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer 
    text-black bg-gray-200 hover:bg-[#7b246d] hover:text-white 
    rounded-r-lg p-2 transition-all duration-300 ease-in-out"
  >
    <FaChevronLeft className="text-xs md:text-xl lg:text-xl xl:text-xl" />
  </div>
);

const CustomSlide = ({ imgSrc }) => (
  <div className="relative flex justify-center items-center">
    <img
      className="w-full h-[480px] md:h-[550px] lg:h-[550px] xl:h-[550px] object-cover cursor-pointer"
      src={imgSrc}
      alt="banner"
    />
  </div>
);

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen is less than or equal to 768px (mobile screens)
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Call on component mount
    window.addEventListener("resize", handleResize); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

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
      <div
        className={`w-4 h-1 px-4 mx-1 cursor-pointer ${
          i === dotActive ? "bg-white" : "bg-gray-400"
        }`}
      />
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
        breakpoint: 768, // Tablet and mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          customPaging: (i) => (
            <div
              className={`w-1 h-0.5 px-2 mx-1 cursor-pointer ${
                i === dotActive ? "bg-white" : "bg-gray-400"
              }`}
            />
          ),
        },
      },
      {
        breakpoint: 576, // Very small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          customPaging: (i) => (
            <div
              className={`w-1 h-0.5 px-2 mx-1 cursor-pointer ${
                i === dotActive ? "bg-white" : "bg-gray-400"
              }`}
            />
          ),
        },
      },
    ],
  };

  // Mobile images for small screens and default images for large screens
  const slides = isMobile
    ? [
        { imgSrc: mobileBannerImgOne },
        { imgSrc: mobileBannerImgTwo },
        { imgSrc: mobileBannerImgThree },
      ]
    : [
        { imgSrc: bannerImgOne },
        { imgSrc: bannerImgTwo },
        { imgSrc: bannerImgThree },
      ];

  return (
    <div className="w-full bg-white mt-6 relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} imgSrc={slide.imgSrc} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
