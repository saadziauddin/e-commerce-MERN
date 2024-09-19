import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { FaDownload } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const ProductDetails = () => {
  const tabs = [
    {
      id: "productOptions",
      label: "Product Options",
    },
    {
      id: "Description",
      label: "Description",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    },
    {
      id: "Video",
      label: "Video",
      content: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/watch?v=6e0yIRDVPlA&list=RD6e0yIRDVPlA&start_radio=1"
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ),
    },
    // Add more tabs as needed
  ];
  const location = useLocation();
  const dispatch = useDispatch();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const highlightStyle = {
    color: "#d0121a", // Change this to the desired color
    fontWeight: "bold", // Change this to the desired font weight
  };
  const renderDescription = () => {
    if (!productInfo.des) {
      return null; // or handle accordingly if product.des is not defined
    }

    const description = productInfo.des.split(/:(.*?)-/).map((part, index) => {
      return (
        <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
          {part}
        </span>
      );
    });

    return <>{description}</>;
  };
  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo.ficheTech]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4 card">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover rounded-lg shadow-md"
              src={productInfo.img}
              alt={productInfo.img}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-5">
              <h2 className="text-4xl font-semibold">
                {productInfo.productName}
              </h2>
              <p className="text-2xl font-semibold">
                {productInfo.price} Dt
                <span className="text-xl font-semibold line-through ml-2">
                  540
                </span>
                <span className="text-xs ml-2 inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white">
                  Save 100
                </span>
              </p>
              <hr />
              <p className="text-base text-gray-600">{renderDescription()}</p>

              <div className="flex items-center">
                <p className="text-sm mr-2"> leave a review </p>

                {/* Rating stars */}
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                <svg
                  className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>

              <p className="text-base text-green-600 font-medium">En Stock</p>
              <p className="font-medium text-lg">
                <span className="font-normal">Colors:</span> {productInfo.color}
              </p>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: productInfo.id,
                      name: productInfo.productName,
                      quantity: 1,
                      image: productInfo.img,
                      badge: productInfo.badge,
                      price: productInfo.price,
                      colors: productInfo.color,
                    })
                  )
                }
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
              >
                Add to Cart
              </button>
              <p className="font-normal text-sm">
                <span className="text-base font-medium"> Categories:</span>{" "}
                Spring collection, Streetwear, Women Tags: featured SKU: N/A
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="space-x-4 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-4 rounded-t-lg ${activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
                  }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="my-4 card">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={activeTab === tab.id ? "" : "hidden"}
              >
                {tab.id === "productOptions" && productInfo.ficheTech ? (
                  <div>
                    <table className="table-auto w-full">
                      <tbody>
                        {productInfo.ficheTech.map((row) => (
                          <tr key={row.label} className="bg-gray-100">
                            <td className="border px-4 py-2 font-semibold">
                              {row.label}
                            </td>
                            <td className="border px-4 py-2">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* <div className="my-4 flex justify-end">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 hover:bg-blue-600 text-white font-bodyFont">
                        <FaDownload className="h-5 w-5 mr-2 text-white" />
                        <a
                          href={productInfo.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          Download PDF
                        </a>{" "}
                      </button>
                    </div> */}
                  </div>
                ) : (
                  <p>{tab.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
