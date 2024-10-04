import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reduxSlice";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { FaTimes } from "react-icons/fa";
import api from '../../../api/api.js';
import { toast } from "react-toastify";

import Lightbox from "yet-another-react-lightbox";
import { Counter, Fullscreen, Slideshow, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";


function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [productInfo, setProductInfo] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const fetchProductById = async () => {
        try {
            const response = await api.get(`/api/fetchProductById/${id}`);
            const product = response.data.product[0];
            // const product = response.data.product;
            console.log("Product Data: ", product);
            setProductInfo(product);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching product data: ", error);
            toast.error("Error fetching product data.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductById();
    }, [id]);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value > 0 ? value : 1);
    };

    const handleAddCart = () => {
        dispatch(addToCart({ ...productInfo, quantity }));
        setIsModalOpen(true);
    };

    // const handleScrollThumbnails = (direction) => {
    //     const maxScrollPosition = (productInfo?.images?.length - 3) * 60; // Adjust thumbnail height
    //     const step = 60; // Scroll by 60px (height of each thumbnail)

    //     if (direction === 'up') {
    //         setScrollPosition((prev) => Math.max(prev - step, 0));
    //     } else if (direction === 'down') {
    //         setScrollPosition((prev) => Math.min(prev + step, maxScrollPosition));
    //     }
    // };

    // Ensure product images are available before using them

    const productImages = productInfo?.images?.map(image => image.imagePath.replace("..\\client\\public", "")) || [];

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!productInfo) {
        return <p>Product not found!</p>;
    }

    return (
        <div className="max-w-container px-4">
            {/* Breadcrumb */}
            <div className="xl:mt-0 -mt-0 pl-5">
                <Breadcrumbs title={productInfo.name} />
            </div>

            {/* Columns */}
            <div className="max-w-container grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Image Section */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr,6fr] gap-3">
                    {/* Vertical Thumbnails */}
                    <div className="flex flex-col overflow-hidden overflow-y-auto scrollbar-none max-h-[400px]">
                        {productImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover cursor-pointer rounded-lg border-2 transition-all duration-300 hover:border-[#7b246d] my-2 ${selectedImageIndex === index ? 'border-[#7b246d]' : 'border-transparent'}`}
                                onClick={() => setSelectedImageIndex(index)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="relative rounded-lg overflow-hidden mb-10">
                        <img
                            src={productImages[selectedImageIndex]}
                            alt={`Product Image ${selectedImageIndex + 1}`}
                            className="rounded-lg object-cover w-full h-full transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={productImages.map((image) => ({ src: image }))}
                        plugins={[Counter, Slideshow, Fullscreen, Thumbnails, Zoom]}
                    />
                </div>

                {/* Product Info Section */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{productInfo.name}</h1>
                    <p className="text-sm uppercase text-gray-500 font-semibold mb-2">{productInfo.status}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                        PKR {productInfo?.price1 ? productInfo.price1.toLocaleString() : "N/A"}
                    </p>
                    {/* <p className="text-2xl font-bold text-gray-900 mb-2">PKR {productInfo.price1.toLocaleString()}</p> */}
                    <p className="text-red-600 text-xs">GST Inclusive</p>

                    {/* Color & Size Options */}
                    <div className="my-4">
                        <div className="flex items-center gap-4 mb-4">
                            <p className="text-lg font-semibold text-gray-800">Color:</p>
                            <div className="flex gap-2">
                                {productInfo?.color?.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`w-6 h-6 rounded-full bg-${color.toLowerCase()} cursor-pointer border-2 border-gray-200 hover:border-gray-400`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-gray-800">Size:</p>
                            <div className="flex gap-2">
                                {productInfo?.size?.map((size) => (
                                    <button
                                        key={size}
                                        className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-6">
                        <p className="text-lg font-semibold text-gray-800">Qty</p>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md">
                                -
                            </button>
                            <input
                                type=""
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-16 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
                            />
                            <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md">
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-4">
                        <button
                            onClick={handleAddCart}
                            className="w-full bg-[#7b246d] text-white hover:bg-gray-500 py-2 px-6 rounded-lg font-semibold transition-all"
                        >
                            Add to Cart
                        </button>
                        <button className="w-full bg-gray-200 hover:bg-gray-300 text-[#7b246d] py-2 px-6 rounded-lg font-semibold transition-all">
                            Buy Now
                        </button>
                    </div>

                    <p className="text-gray-800 mt-2 "><b className="text-lg font-semibold">Stock:</b> {productInfo.stock}</p>
                    <p className="text-red-500 text-sm mt-2">Disclaimer: Product color may vary slightly due to photographic lighting sources or monitor settings.</p>

                    {/* Product Description */}
                    <div className="mb-10 mt-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700">{productInfo.description}</p>
                    </div>
                </div>
            </div>

            {/* Modal for Cart Confirmation */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <FaTimes />
                        </button>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Added to Cart!</h3>
                        <p className="text-gray-700 mb-6 text-center">
                            You have added {quantity} unit(s) of {productInfo.name} to your cart.
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg focus:outline-none transition duration-200 ease-in-out"
                            >
                                Continue Shopping
                            </button>
                            <Link to='/cart'>
                                <button
                                    className="bg-[#7b246d] hover:bg-[#5c1a4e] text-white font-semibold py-2 px-6 rounded-lg focus:outline-none transition duration-200 ease-in-out"
                                >
                                    View Cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}

export default ProductDetails;

