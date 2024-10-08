// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import Product from "../ProductCard";
// import api from '../../../../api/api.js';
// import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";

// function NewArrivals() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get("/api/fetchProductsByCategory/newArrivals");
//         const data = await response.data;
//         setProducts(data.products);
//       } catch (error) {
//         console.error("Error fetching new arrivals:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const NextArrow = (props) => {
//     const { onClick } = props;
//     return (
//       <div className="w-10 h-10 text-black text-xl duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-0" onClick={onClick}>
//         <span className="text-3xl">
//           <TfiAngleRight />
//         </span>
//       </div>
//     );
//   };

//   const PrevArrow = (props) => {
//     const { onClick } = props;
//     return (
//       <div className="w-10 h-10 text-black hover:text-[#4a1341] text-md duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] left-0" onClick={onClick}>
//         <span className="text-3xl">
//           <TfiAngleLeft />
//         </span>
//       </div>
//     );
//   };

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1025,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 769,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="w-full mb-10 mt-10">
//       <div className="text-3xl text-center font-semibold pb-5">New Arrivals</div>
//       <Slider {...settings}>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div className="px-2" key={product._id}>
//               <Product
//                 _id={product._id}
//                 img={
//                   product.images.length > 0
//                     ? product.images.map(img => img.imagePath.replace(/..[\\/]+client[\\/]+public/, ""))
//                     : ['/default_images/image-not-available.png']
//                 }
//                 productName={product.name}
//                 price={product.price1}
//                 color={product.color.join(", ")}
//                 size={product.size.join(", ")}
//                 tags={product.tags}
//                 description={product.description}
//               />
//             </div>
//           ))
//         ) : (
//           <p>No products found.</p>
//         )}
//       </Slider>
//     </div>
//   );
// };

// export default NewArrivals;

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "../ProductCard";
import api from '../../../../api/api.js';
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";

function NewArrivals() {
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
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Display 2 columns on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full mb-10 mt-10">
      <div className="text-3xl text-center font-semibold pb-5">New Arrivals</div>
      <Slider {...settings}>
        {products.length > 0 ? (
          products.map((product) => (
            <div className="px-2" key={product._id}>
              <Product
                _id={product._id}
                img={
                  product.images.length > 0
                    ? product.images.map(img => img.imagePath.replace(/..[\\/]+client[\\/]+public/, ""))
                    : ['/default_images/image-not-available.png']
                }
                productName={product.name}
                price={product.price1}
                color={product.color.join(", ")}
                size={product.size.join(", ")}
                tags={product.tags}
                description={product.description}
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

export default NewArrivals;

