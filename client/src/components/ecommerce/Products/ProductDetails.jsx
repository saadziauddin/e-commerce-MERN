import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reduxSlice.jsx";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
import { FaTimes } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import api from '../../../api/api.js';
import { toast } from "react-toastify";
import Lightbox from "yet-another-react-lightbox";
import { Counter, Fullscreen, Slideshow, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import FormatPrice from "../../../helpers/FormatPrice.js";
import SizeGuideIcon from "/Images/SizeGuideScaleIcon.png";
import SizeGuideImage from "/Images/SizeGuideImage.jpg";

function ProductDetails() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { selectedCurrency } = useOutletContext();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

    const productImages = Array.isArray(productInfo?.images) && productInfo.images.length > 0
        ? productInfo.images.map(image => `${apiUrl}/uploads/product_images/${image.imageName}`)
        : [`${apiUrl}/default_images/image-not-available.png`];

    // Utility function to check if the array is valid (no null or "null" values)
    const isValidArray = (arr) => Array.isArray(arr) && arr.length > 0 && arr.some(item => item !== null && item !== 'null');

    // Filter out null or "null" values from arrays
    const availableColors = isValidArray(productInfo?.color) ? productInfo.color.filter(color => color !== null && color !== 'null') : [];
    const availableSizes = isValidArray(productInfo?.size) ? productInfo.size.filter(size => size !== null && size !== 'null') : [];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setSelectedImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
        }, 3000);

        return () => clearInterval(slideInterval);
    }, [productImages.length]);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await api.get(`/api/fetchProductById/${id}`);
                setProductInfo(response.data.product[0]);
                setIsLoading(false);
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

    // Set default color and size if only one option exists and it's not null
    useEffect(() => {
        if (availableColors.length === 1) {
            setSelectedColor(availableColors[0]);
        }
        if (availableSizes.length === 1) {
            setSelectedSize(availableSizes[0]);
        }
    }, [availableColors, availableSizes]);

    const handleAddCart = () => {
        if (availableColors.length > 1 && !selectedColor) {
            alert("Please select a color before adding to cart.");
            return;
        }
        if (availableSizes.length > 1 && !selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }

        const cartItem = {
            id: `${productInfo._id}-${selectedColor}-${selectedSize}-${productInfo.category}`, // Unique ID
            name: productInfo.name,
            image: productImages[selectedImageIndex],
            color: selectedColor,
            size: selectedSize,
            category: productInfo.category,
            price: productInfo.newPrice,
            quantity: quantity,
        };          

        dispatch(addToCart(cartItem));
        setIsModalOpen(true);
    };

    const handleBuyNow = () => {
        if (availableColors.length > 1 && !selectedColor) {
            alert("Please select a color before proceeding to checkout.");
            return;
        }
        if (availableSizes.length > 1 && !selectedSize) {
            alert("Please select a size before proceeding to checkout.");
            return;
        }
        
        const cartItem = {
            id: `${productInfo._id}-${selectedColor}-${selectedSize}-${productInfo.category}`, // Unique ID
            name: productInfo.name,
            image: productImages[selectedImageIndex],
            color: selectedColor,
            size: selectedSize,
            category: productInfo.category,
            price: productInfo.newPrice,
            quantity: quantity,
        };  

        dispatch(addToCart(cartItem));
        navigate('/cart');
    };

    const handleNavigate = () => {
        navigate('/cart');
    }

    if (isLoading) {
        return <p>Loading...</p>;
    };

    if (!productInfo) {
        return <p>Product not found!</p>;
    };

    const formatDescription = (description) => {
        const keywords = ["FABRIC:", "DUPPATA:", "LENGTH:", "WIDTH:", "TROUSER:", "WORK:", "STITCHING FACILITY:"];
        const regex = new RegExp(`(${keywords.join('|')})`, 'gi');

        // First, replace keywords with bold text
        let formattedDescription = description.replace(regex, '<strong>$1</strong>').trim();

        // Then, replace newlines with <br> tags
        formattedDescription = formattedDescription.replace(/\n/g, '<br />');

        return formattedDescription;
    };

    return (
        <div className="max-w-container px-4">
            {/* Breadcrumb */}
            <div className="xl:mt-0 mt-4 pl-5">
                <Breadcrumbs title="Product Details" />
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                {/* Image Section */}
                {productImages.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,6fr] gap-4 lg:gap-3">
                        {/* Thumbnails */}
                        <div className="flex flex-row-reverse sm:flex-row sm:justify-center lg:flex-col lg:max-h-[350px] overflow-y-auto scrollbar-none lg:gap-3">
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
                                className="rounded-lg object-cover w-full h-[100%] transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105"
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
                )}

                {/* Product Info Section */}
                <div className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-titleFont text-gray-900 mb-2">{productInfo.name}</h1>
                    <p className="text-lg uppercase text-gray-500 font-semibold mb-2">{productInfo.status}</p>
                    <div className="text-2xl font-bold text-gray-800 mb-2 flex gap-2 items-center">
                        <p><FormatPrice price={productInfo.newPrice} currency={selectedCurrency} /></p>
                        {productInfo?.oldPrice && (
                            <p className="line-through text-gray-500 text-lg"><FormatPrice price={productInfo.oldPrice} currency={selectedCurrency} /></p>
                        )}
                    </div>
                    {/* <p className="text-red-600 text-sm">GST Inclusive</p> */}

                    {/* Color & Size selector */}
                    <div className="my-2">
                        {Array.isArray(availableColors) && availableColors.length > 0 && (
                            <div className="flex flex-col gap-2 mb-3">
                                <p className="text-lg font-semibold text-gray-800">Color:</p>
                                <div className="flex flex-wrap gap-2">
                                    {availableColors.map((color, index) => (
                                        <button
                                            key={index}
                                            className={`py-1 px-2 rounded-lg transition-all duration-300 font-titleFont capitalize hover:shadow-lg transform hover:scale-105 ${selectedColor === color ? 'bg-[#7b246d] text-white border-[#7b246d] border-1' : 'bg-gray-100 text-gray-800 border-1 border-gray-200'}`}
                                            onClick={() => setSelectedColor(color)}
                                            title={color}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {Array.isArray(availableSizes) && availableSizes.length > 0 && (
                            <div className="flex flex-col gap-2 mb-3">
                                <p className="text-lg font-semibold text-gray-800">Size:</p>
                                <div className="flex gap-2">
                                    {availableSizes.map((size, index) => (
                                        <button
                                            key={index}
                                            className={`py-1 px-2 rounded-lg transition-all duration-300 font-titleFont capitalize hover:shadow-lg transform hover:scale-105 ${selectedSize === size ? 'bg-[#7b246d] text-white border-[#7b246d] border-1' : 'bg-gray-100 text-gray-800 border-1 border-gray-200'}`}
                                            onClick={() => setSelectedSize(size)}
                                            title={size}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quantity Selector & Size Guide */}
                    <div className="flex items-center justify-between mb-6">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <p className="text-lg font-semibold text-gray-800">Quantity:</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md">
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-10 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-md"
                                />
                                <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Size Guide */}
                        <div className="flex items-center gap-1">
                            <img src={SizeGuideIcon} alt="Size Guide Icon" className="w-4 h-4 md:w-5 md:h-5" />
                            <a onClick={() => setSizeGuideOpen(true)} className="text-[#7b246d] text-sm cursor-pointer hover:underline uppercase">
                                Size Guide
                            </a>
                        </div>
                    </div>

                    {/* YouTube Video */}
                    {productInfo.youtubeVideoLink &&
                        <div className="relative pt-[55%] w-full md:pt-[46%] md:w-[90%] shadow-lg rounded-lg overflow-hidden">
                            <iframe
                                src={productInfo.youtubeVideoLink}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        </div>
                    }

                    {/* Action Buttons */}
                    <div className="flex flex-col lg:flex-row gap-4 mt-4 mb-4">
                        <button
                            className="w-full md:w-[270px] bg-[#7b246d] text-white hover:bg-gray-500 py-2 px-4 md:py-2 md:px-6 rounded-lg font-semibold transition-all uppercase"
                            onClick={() => { handleBuyNow() }}
                        >
                            Buy Now
                        </button>
                        <button
                            className="w-full md:w-[270px] bg-gray-200 hover:bg-gray-300 text-[#7b246d] py-2 px-4 md:py-2 md:px-6 rounded-lg font-semibold transition-all uppercase"
                            onClick={handleAddCart}>
                            Add to Cart
                        </button>
                    </div>

                    {/* <p className="text-gray-800 text-lg mt-2 "><b className="text-lg">Stock:</b> {productInfo.stock}</p> */}
                    <p className="text-red-500 text-[15px] mt-2">
                        <b className="text-[15px] uppercase">Disclaimer: </b>
                        Product color may vary slightly due to photographic lighting sources or monitor settings.
                    </p>
                </div>

                {/* Tabs for Description, Shipping, and Returns */}
                <div className="md:px-4">
                    <div className="flex gap-10 border-b-2 border-gray-200 pb-2 mb-4">
                        <button
                            className={`text-sm md:text-lg font-semibold relative transition-all uppercase ${activeTab === "description" ? "text-[#7b246d]" : "text-gray-600 hover:text-[#7b246d]"}`}
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                            {activeTab === "description" && (
                                <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#7b246d] rounded"></span>
                            )}
                        </button>
                        <button
                            className={`text-sm md:text-lg font-semibold relative transition-all uppercase ${activeTab === "shipping" ? "text-[#7b246d]" : "text-gray-600 hover:text-[#7b246d]"
                                }`}
                            onClick={() => setActiveTab("shipping")}
                        >
                            Shipping Details
                            {activeTab === "shipping" && (
                                <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#7b246d] rounded"></span>
                            )}
                        </button>
                        <button
                            className={`text-sm md:text-lg font-semibold relative transition-all uppercase ${activeTab === "returns" ? "text-[#7b246d]" : "text-gray-600 hover:text-[#7b246d]"}`}
                            onClick={() => setActiveTab("returns")}
                        >
                            Return & Refund
                            {activeTab === "returns" && (
                                <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#7b246d] rounded"></span>
                            )}
                        </button>
                    </div>

                    {/* Tabs Content */}
                    <div>
                        {activeTab === "description" && (
                            <div className="mb-10">
                                <h2 className="text-lg font-bold font-heading text-gray-800 mb-2">Description:</h2>
                                <p
                                    className="text-gray-700"
                                    dangerouslySetInnerHTML={{
                                        __html: formatDescription(productInfo.longDescription),
                                    }}
                                ></p>
                            </div>
                        )}
                        {activeTab === "shipping" && (
                            <div className="mb-10 ml-5">
                                <h2 className="text-lg font-bold font-heading text-gray-800 mb-4">Shipping Policy</h2>
                                <p className="text-gray-700 mb-4">
                                    At Nayab Fashion, we are committed to delivering your orders accurately and promptly. Please review our shipping policy to understand how we process and ship your orders.
                                </p>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">1. Shipping Methods</h3>
                                <p className="text-gray-700 mb-4">
                                    We offer various shipping methods to meet your needs. The available options will be presented at checkout, and they include:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 mb-4">
                                    <li>Standard Shipping: Estimated delivery within 5-7 business days.</li>
                                    <li>Expedited Shipping: Estimated delivery within 2-3 business days.</li>
                                    <li>Overnight Shipping: Next-day delivery for orders placed before [insert cutoff time].</li>
                                </ul>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">2. Shipping Charges</h3>
                                <p className="text-gray-700 mb-4">
                                    Shipping charges are calculated based on the weight of your order and the shipping method selected.
                                    You will see the total shipping cost at checkout before you complete your order.
                                </p>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">3. Order Processing Time</h3>
                                <p className="text-gray-700 mb-4">
                                    Orders are typically processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.
                                </p>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">4. Delivery Timeframes</h3>
                                <p className="text-gray-700 mb-4">
                                    Delivery times may vary based on your location and the shipping method selected. Please note that delays may occur due to unforeseen circumstances such as extreme weather, holidays, or carrier delays.
                                </p>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">5. Tracking Your Order</h3>
                                <p className="text-gray-700 mb-4">
                                    Once your order has shipped, you will receive a confirmation email with tracking information. You can use this tracking number to monitor the status of your shipment.
                                </p>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">6. Shipping to International Addresses</h3>
                                <p className="text-gray-700 mb-4">
                                    We are pleased to offer international shipping. Please note that customs duties, taxes, and fees are the responsibility of the customer and may be charged upon delivery.
                                </p>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">7. Contact Us</h3>
                                <p className="text-gray-700 mb-4">
                                    If you have any questions about your order or our shipping policy, please reach out to our customer service team at [insert contact information].
                                </p>

                                <p className="text-gray-700">
                                    Thank you for choosing Nayab Fashion! We appreciate your business and look forward to serving you.
                                </p>
                            </div>
                        )}
                        {activeTab === "returns" && (
                            <div className="mb-10 ml-5">
                                <h2 className="text-lg font-bold font-heading text-gray-800 mb-4">Returns Policy</h2>
                                <p className="text-gray-700 mb-4">
                                    At Nayab Fashion, customer satisfaction is our top priority. We strive to provide high-quality products and exceptional service. However, we understand that sometimes returns or refunds may be necessary. Please read our returns policy carefully to ensure that you understand our terms and conditions.
                                </p>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">1. Eligibility for Refunds</h3>
                                <ul className="list-disc list-inside text-gray-700 mb-4">
                                    <li><strong>Defective or Damaged Items:</strong> If you receive a defective or damaged item, please contact us within 7 days of delivery. Be sure to include a photo and description of the defect or damage. We will review the issue and, if approved, offer a replacement or refund.</li>
                                    <li><strong>Incorrect Item Received:</strong> If you received the wrong item, please contact us within 7 days of delivery. We will arrange for the correct item to be shipped and provide instructions for returning the incorrect item.</li>
                                </ul>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">2. Conditions for Refunds</h3>
                                <ul className="list-disc list-inside text-gray-700 mb-4">
                                    <li>The item must be unused, unwashed, and in its original packaging with all tags attached.</li>
                                    <li>You must provide proof of purchase, such as an order confirmation or receipt.</li>
                                    <li>Items marked as "final sale" or "clearance" are not eligible for refunds or returns.</li>
                                </ul>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">3. Refund Process</h3>
                                <ol className="list-decimal list-inside text-gray-700 mb-4">
                                    <li><strong>Initiating a Refund:</strong> To initiate a refund, please contact our customer support team at [insert contact information] within the timeframes specified above.</li>
                                    <li><strong>Return Shipping:</strong> If approved for a return, we will provide instructions for shipping the item back to us. Please note that customers are responsible for return shipping costs, unless the return is due to a defect or error on our part.</li>
                                    <li><strong>Refund Approval:</strong> Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund.</li>
                                    <li><strong>Refund Method:</strong> Approved refunds will be processed to the original payment method. Refunds may take up to 7-10 business days to appear on your account, depending on your bank or card issuer.</li>
                                </ol>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">4. Non-Refundable Items</h3>
                                <ul className="list-disc list-inside text-gray-700 mb-4">
                                    <li>Items that are used, washed, or not in their original condition.</li>
                                    <li>Final sale or clearance items.</li>
                                    <li>Gift cards or promotional items.</li>
                                </ul>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">5. International Orders</h3>
                                <p className="text-gray-700 mb-4">
                                    For international orders, please note:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 mb-4">
                                    <li>Nayab Fashion does not cover customs duties, import taxes, or other charges. These are the responsibility of the customer and are non-refundable.</li>
                                    <li>Any additional costs or fees associated with the return of international orders are the customer’s responsibility.</li>
                                </ul>

                                <h3 className="font-bold text-gray-800 mt-6 mb-2">6. Contact Us</h3>
                                <p className="text-gray-700 mb-4">
                                    If you have any questions regarding our refund policy or need assistance with your return, please reach out to our customer service team at [insert contact information].
                                </p>
                                <p className="text-gray-700">
                                    Thank you for choosing Nayab Fashion! We are here to make your shopping experience as smooth and satisfying as possible.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Size Guide Modal */}
                {sizeGuideOpen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-lg font-titleFont text-gray-800 uppercase">Size Guide</h2>
                                <button onClick={() => setSizeGuideOpen(false)} className="bg-transparent text-gray-600 hover:text-gray-800 transition text-xl">
                                    <RxCross1 />
                                </button>
                            </div>
                            <img
                                src={SizeGuideImage}
                                alt="Size Chart"
                                className="w-full h-auto mb-4" // Adjust styling as needed
                            />
                        </div>
                    </div>
                )}

                {/* Cart Confirmation Modal */}
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
                                <button
                                    onClick={handleNavigate}
                                    className="bg-[#7b246d] hover:bg-[#5c1a4e] text-white font-semibold py-2 px-6 rounded-lg focus:outline-none transition duration-200 ease-in-out"
                                >
                                    View Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
