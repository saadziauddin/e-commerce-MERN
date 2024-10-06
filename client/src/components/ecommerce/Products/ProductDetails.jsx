import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reduxSlice.jsx";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
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
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [productInfo, setProductInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await api.get(`/api/fetchProductById/${id}`);
                setProductInfo(response.data.product[0]);
                setIsLoading(false);

                console.log(response.data.product[0]);
            } catch (error) {
                console.error("Error fetching product data: ", error);
                toast.error("Error fetching product data.");
                setIsLoading(false);
            }
        };
        fetchProductById();
    }, [id]);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value > 0 ? value : 1);
    };

    const handleAddCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select color and size.");
            return;
        }

        const cartItem = {
            id: productInfo._id,
            name: productInfo.name,
            image: productImages[selectedImageIndex],
            color: selectedColor,
            size: selectedSize,
            category: productInfo.category,
            price: productInfo.price1,
            quantity: quantity,
        };

        dispatch(addToCart(cartItem));
        setIsModalOpen(true);
    };

    const productImages = productInfo?.images?.length > 0
        ? productInfo.images.map(image => image.imagePath.replace(/..[\\/]+client[\\/]+public/, ''))
        : ['/default_images/image-not-available.png'];

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!productInfo) {
        return <p>Product not found!</p>;
    }

    return (
        <div className="max-w-container px-4">
            {/* Breadcrumb */}
            <div className="xl:mt-0 mt-4 pl-5">
                <Breadcrumbs title="Product Details" />
            </div>

            {/* Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                {/* Image Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,6fr] gap-4 lg:gap-3">
                    {/* Vertical Thumbnails */}
                    <div className="flex flex-row lg:flex-col lg:max-h-[350px] overflow-y-auto scrollbar-none">
                        {productImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-16 h-16 lg:w-20 lg:h-20 object-cover cursor-pointer rounded-lg border-2 transition-all duration-300 hover:border-[#7b246d] my-1 lg:my-2 ${selectedImageIndex === index ? 'border-[#7b246d]' : 'border-transparent'}`}
                                onClick={() => setSelectedImageIndex(index)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="relative rounded-lg overflow-hidden mb-6">
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
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{productInfo.name}</h1>
                    <p className="text-sm uppercase text-gray-500 font-semibold mb-2">{productInfo.status}</p>
                    <div className="text-2xl font-bold text-gray-900 mb-2 flex gap-2 items-center">
                        <p>PKR {productInfo?.price1 ? productInfo.price1.toLocaleString() : "N/A"}</p>
                        {productInfo?.price2 && (
                            <p className="line-through text-gray-500 text-lg">PKR {productInfo.price2.toLocaleString()}</p>
                        )}
                    </div>
                    <p className="text-red-600 text-xs">GST Inclusive</p>
                    
                    {/* Color & Size selector */}
                    <div className="my-4">
                        {/* Color Selection */}
                        <div className="flex flex-col gap-2 mb-4">
                            <p className="text-lg font-semibold text-gray-800">Color:</p>
                            <div className="flex flex-wrap gap-4">
                                {productInfo?.color?.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`py-1 px-2 md:py-1 md:px-3 rounded-lg cursor-pointer transition-all duration-300 font-semibold capitalize hover:shadow-lg transform hover:scale-105
                                                ${selectedColor === color ? 'bg-[#7b246d] text-white border-[#7b246d] border-2' : 'bg-gray-100 text-gray-800 border-2 border-gray-200'}`}
                                        onClick={() => setSelectedColor(color)}
                                        title={color}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-gray-800">Size:</p>
                            <div className="flex gap-2">
                                {productInfo?.size?.map((size) => (
                                    <button
                                        key={size}
                                        className={`py-1 px-2 md:py-1 md:px-3 rounded-lg cursor-pointer transition-all duration-300 font-semibold capitalize hover:shadow-lg transform hover:scale-105
                                                ${selectedSize === size ? 'bg-[#7b246d] text-white border-[#7b246d] border-2' : 'bg-gray-100 text-gray-800 border-2 border-gray-200'}`}
                                        onClick={() => setSelectedSize(size)}
                                        title={size}
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
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 md:py-2 md:px-4 rounded-md">
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-10 md:w-16 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 md:py-2 md:px-4 rounded-md"
                            />
                            <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 md:py-2 md:px-4 rounded-md">
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-4">
                        <button
                            onClick={handleAddCart}
                            className="w-full lg:w-auto bg-[#7b246d] text-white hover:bg-gray-500 py-2 px-4 md:py-2 md:px-6 rounded-lg font-semibold transition-all"
                        >
                            Add to Cart
                        </button>
                        <button className="w-full lg:w-auto bg-gray-200 hover:bg-gray-300 text-[#7b246d] py-2 px-4 md:py-2 md:px-6 rounded-lg font-semibold transition-all">
                            Buy Now
                        </button>
                    </div>

                    <p className="text-gray-800 mt-2 "><b className="text-lg font-semibold">Stock:</b> {productInfo.stock}</p>
                    <p className="text-red-500 text-sm mt-2"><b className="text-md font-semibold">Disclaimer:</b> Product color may vary slightly due to photographic lighting sources or monitor settings.</p>

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
        </div>
    );
};

export default ProductDetails;
