import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { productImg1, productImg2, productImg3, productImg4, productImg5, productImg6, productImg7, productImg8, productImg9 } from '../../../assets/images/website_images/index';
import { FaExpand, FaTimes, FaChevronUp, FaChevronDown, FaTruckMonster, FaSearchPlus, FaSearchMinus } from "react-icons/fa";

function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const [prevLocation, setPrevLocation] = useState("");
    const [productInfo, setProductInfo] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);

    const productImages = [productImg1, productImg2, productImg3, productImg4, productImg5, productImg6, productImg7, productImg8, productImg9];

    useEffect(() => {
        setProductInfo(location.state.item);
        setPrevLocation(location.pathname);
    }, [location]);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value > 0 ? value : 1);
    };

    const handleAddCart = () => {
        dispatch(addToCart({ ...productInfo, quantity }));
        setIsModalOpen(false);
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const handleScrollThumbnails = (direction) => {
        const maxScrollPosition = (productImages.length - 3) * 60; // Height of 3 visible thumbnails
        const step = 60; // Scroll by 60px (height of each thumbnail)

        if (direction === 'up') {
            setScrollPosition((prev) => Math.max(prev - step, 0));
        } else if (direction === 'down') {
            setScrollPosition((prev) => Math.min(prev + step, maxScrollPosition));
        }
    };

    return (
        // <div className="max-w-container px-4 md:overflow-hidden sm:overflow-hidden">
        //     {/* Breadcrumb */}
        //     <div className="xl:mt-0 -mt-0 pl-5"><Breadcrumbs title="" prevLocation={prevLocation} /></div>

        //     {/* Columns */}
        //     <div className="max-w-container grid grid-cols-1 md:grid-cols-2">

        //         {/* Image section */}
        //         <div className="grid grid-cols-1 md:grid-cols-2 cursor-pointer">

        //             {/* Vertical Thumbnails */}
        //             <div className="flex flex-col w-[35%] h-[35%] overflow-hidden overflow-y-scroll scrollbar-hide">
        //                 <div
        //                     className="space-y-2 transition-transform duration-300"
        //                     style={{ transform: `translateY(-${scrollPosition}px)` }}
        //                 >
        //                     {productImages.map((image, index) => (
        //                         <img
        //                             key={index}
        //                             src={image}
        //                             alt={`Thumbnail ${index + 1}`}
        //                             className={`w-24 h-36 object-cover cursor-pointer rounded-lg border-2 transition-all duration-300 hover:border-[#7b246d] ${selectedImageIndex === index ? 'border-[#7b246d]' : 'border-transparent'}`}
        //                             onClick={() => setSelectedImageIndex(index)}
        //                         />
        //                     ))}
        //                 </div>
        //             </div>

        //             {/* Main Image */}
        //             <div className="flex flex-col relative rounded-lg overflow-hidden">
        //                 <div className="relative group">
        //                     <img
        //                         src={productImages[selectedImageIndex]}
        //                         alt={`Product Image ${selectedImageIndex + 1}`}
        //                         className="rounded-lg object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-2"
        //                         onClick={() => setIsModalOpen(true)}
        //                     />
        //                 </div>
        //             </div>

        //             {/* Image Viewer Modal with Zoom */}
        //             {isModalOpen && (
        //                 <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex items-center justify-center z-50">
        //                     <div className="relative">
        //                         {/* Zoomable Image */}
        //                         <div className="relative group">
        //                             <img
        //                                 src={productImages[selectedImageIndex]}
        //                                 alt="Large View"
        //                                 className="w-full h-full max-w-3xl max-h-[95vh] object-contain transition-transform duration-300"
        //                             />
        //                         </div>

        //                         {/* Close Button */}
        //                         <button
        //                             className="fixed top-4 right-4 bg-white text-black rounded-full p-4 shadow-lg z-50 hover:bg-gray-200 transition"
        //                             onClick={() => setIsModalOpen(false)}
        //                         >
        //                             <FontAwesomeIcon icon={FaTimes} size="2x" className="text-[#ffffff]" />
        //                         </button>

        //                         {/* Side Navigators */}
        //                         <button
        //                             className="fixed left-2 top-1/2 transform -translate-y-1/2 text-white bg-white bg-opacity-25 rounded-full p-3 hover:text-black hover:bg-opacity-75 transition focus:ring-2 focus:ring-blue-500"
        //                             onClick={() => handleImageClick((selectedImageIndex - 1 + productImages.length) % productImages.length)}
        //                         >
        //                             &lt;
        //                         </button>
        //                         <button
        //                             className="fixed right-2 top-1/2 transform -translate-y-1/2 text-white bg-white bg-opacity-25 rounded-full p-3 hover:text-black hover:bg-opacity-75 transition focus:ring-2 focus:ring-blue-500"
        //                             onClick={() => handleImageClick((selectedImageIndex + 1) % productImages.length)}
        //                         >
        //                             &gt;
        //                         </button>
        //                     </div>
        //                 </div>
        //             )}
        //         </div>

        //         {/* Product Info Section */}
        //         <div className="">
        //             {/* Product Name */}
        //             <div>
        //                 <h1 className="text-3xl font-bold text-gray-900 mb-2">3 Piece Embroidered Linen Suit</h1>
        //                 <p className="text-sm uppercase text-gray-500 font-semibold mb-2">DW-W24-20-GREEN-EX SMALL | IN STOCK</p>
        //                 <p className="text-2xl font-bold text-gray-900 mb-2">PKR 21,590</p>
        //                 <p className="text-red-600 text-xs">GST Inclusive</p>
        //             </div>

        //             {/* Color & Size Options */}
        //             <div className="my-4">
        //                 <div className="flex items-center gap-4 mb-4">
        //                     <p className="text-lg font-semibold text-gray-800">Color:</p>
        //                     <div className="flex gap-2">
        //                         <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer border-2 border-gray-200 hover:border-gray-400"></div>
        //                         <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer border-2 border-gray-200 hover:border-gray-400"></div>
        //                     </div>
        //                 </div>

        //                 <div className="flex items-center gap-2">
        //                     <p className="text-lg font-semibold text-gray-800">Size:</p>
        //                     <div className="flex gap-2">
        //                         {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
        //                             <button key={size} className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md">
        //                                 {size}
        //                             </button>
        //                         ))}
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Quantity Selector */}
        //             <div className="flex items-center gap-4 mb-6">
        //                 <p className="text-lg font-semibold text-gray-800">Qty</p>
        //                 <div className="flex items-center gap-2">
        //                     <button
        //                         onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
        //                         className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
        //                     >
        //                         -
        //                     </button>
        //                     <input
        //                         type="number"
        //                         value={quantity}
        //                         onChange={handleQuantityChange}
        //                         className="w-16 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
        //                     />
        //                     <button
        //                         onClick={() => setQuantity(quantity + 1)}
        //                         className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
        //                     >
        //                         +
        //                     </button>
        //                 </div>
        //             </div>

        //             {/* Action Buttons */}
        //             <div className="flex gap-4">
        //                 <button
        //                     onClick={handleAddCart}
        //                     className="w-full bg-[#7b246d] text-white hover:bg-gray-500 py-2 px-6 rounded-lg font-semibold transition-all"
        //                 >
        //                     Add to Cart
        //                 </button>
        //                 <button className="w-full bg-gray-200 hover:bg-gray-300 text-[#7b246d] py-2 px-6 rounded-lg font-semibold transition-all">
        //                     Buy Now
        //                 </button>
        //             </div>

        //             <p className="text-gray-500 mt-3">Weight: 1.25 Kg</p>
        //             <p className="text-red-500">Disclaimer: Product color may vary slightly due to photographic lighting sources or monitor settings.</p>

        //             {/* Product Description */}
        //             {/* <div className="mt-3">
        //                 <h2 className="text-2xl font-bold text-gray-900">Description</h2>
        //                 <h3 className="text-md text-gray-900 mt-1 font-semibold">Angrakha</h3>
        //                 <ul className="text-gray-700 text-sm mt-1">
        //                     <li>Embroidered Neckline With Tassel Detailing</li>
        //                     <li>Digital Printed Front With Embroidery</li>
        //                     <li>Full Sleeves With Embroidery & Peral Drops</li>
        //                     <li>Embroidered Organza Border</li>
        //                     <li>Digital Printed Back</li>
        //                     <li>Fit: Relaxed</li>
        //                     <li>Color: Pink</li>
        //                     <li>Fabric: Linen</li>
        //                     <li>Trousers</li>
        //                     <li>Dyed Dhaka Trousers</li>
        //                     <li>Elasticated Waistband</li>
        //                     <li>Fit: Relaxed</li>
        //                     <li>Color: Pink</li>
        //                     <li>Fabric: Linen</li>
        //                 </ul>
        //                 <h3 className="text-md text-gray-900 mt-1 font-semibold">Trousers</h3>
        //                 <ul className="text-gray-700 text-sm mt-1">
        //                     <li>Dyed Dhaka Trousers</li>
        //                     <li>Elasticated Waistband</li>
        //                     <li>Fit: Relaxed</li>
        //                     <li>Color: Pink</li>
        //                     <li>Fabric: Linen</li>
        //                 </ul>
        //                 <h3 className="text-md text-gray-900 mt-1 font-semibold">Dupatta</h3>
        //                 <ul className="text-gray-700 text-sm mt-1 mb-3">
        //                     <li>Digital Printed Dupatta</li>
        //                     <li>Four-Side Embroidered Border</li>
        //                     <li>Color: Pink</li>
        //                     <li>Fabric: Organza</li>
        //                     <li>Work Details: Thread, Sequins & Tilla Embroidery With Tassel & Pearl Detailing</li>
        //                     <li>Model is wearing XS size</li>
        //                     <li>Note: Dry Clean Only</li>
        //                 </ul>
        //             </div>
        //             <p className="text-blue-500 mt-4">Click here for more details on our shipping & delivery policies.</p> */}
        //         </div>
        //     </div>

        //     {/* Product Description */}
        //     <div className="mb-10 ml-[160px]">
        //         <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        //             {/* Angrakha */}
        //             <div className="bg-white p-4 rounded-lg shadow-lg">
        //                 <h3 className="text-md text-gray-900 font-semibold">Angrakha</h3>
        //                 <ul className="text-gray-700 text-sm mt-1">
        //                     <li>Embroidered Neckline With Tassel Detailing</li>
        //                     <li>Digital Printed Front With Embroidery</li>
        //                     <li>Full Sleeves With Embroidery & Pearl Drops</li>
        //                     <li>Embroidered Organza Border</li>
        //                     <li>Digital Printed Back</li>
        //                     <li>Fit: Relaxed</li>
        //                     <li>Color: Pink</li>
        //                     <li>Fabric: Linen</li>
        //                 </ul>
        //             </div>

        //             {/* Trousers */}
        //             <div className="bg-white p-4 rounded-lg shadow-lg">
        //                 <h3 className="text-md text-gray-900 font-semibold">Trousers</h3>
        //                 <ul className="text-gray-700 text-sm mt-1">
        //                     <li>Dyed Dhaka Trousers</li>
        //                     <li>Elasticated Waistband</li>
        //                     <li>Fit: Relaxed</li>
        //                     <li>Color: Pink</li>
        //                     <li>Fabric: Linen</li>
        //                 </ul>
        //             </div>

        //             {/* Dupatta */}
        //             <div className="bg-white p-4 rounded-lg shadow-lg">
        //                 <h3 className="text-md text-gray-900 font-semibold">Dupatta</h3>
        //                 <ul className="text-gray-700 text-sm mt-1">
        //                     <li>Digital Printed Dupatta</li>
        //                     <li>Four-Side Embroidered Border</li>
        //                     <li>Color: Pink</li>
        //                     <li>Fabric: Organza</li>
        //                     <li>Work Details: Thread, Sequins & Tilla Embroidery With Tassel & Pearl Detailing</li>
        //                     <li>Model is wearing XS size</li>
        //                     <li>Note: Dry Clean Only</li>
        //                 </ul>
        //             </div>
        //         </div>
        //         {/* <p className="text-blue-500 mt-4">Click here for more details on our shipping & delivery policies.</p> */}
        //     </div>

        // </div>

        <div className="max-w-container px-4 md:overflow-hidden sm:overflow-hidden">
    {/* Breadcrumb */}
    <div className="xl:mt-0 -mt-0 pl-5">
        <Breadcrumbs title="" prevLocation={prevLocation} />
    </div>

    {/* Columns */}
    <div className="max-w-container grid grid-cols-1 md:grid-cols-2">

        {/* Image section */}
        <div className="grid grid-cols-1 md:grid-cols-2 cursor-pointer">

            {/* Vertical Thumbnails */}
            <div className="flex flex-col w-[35%] h-[35%] overflow-hidden overflow-y-scroll scrollbar-hide">
                <div
                    className="space-y-2 transition-transform duration-300"
                    style={{ transform: `translateY(-${scrollPosition}px)` }}
                >
                    {productImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-24 h-36 object-cover cursor-pointer rounded-lg border-2 transition-all duration-300 hover:border-[#7b246d] ${selectedImageIndex === index ? 'border-[#7b246d]' : 'border-transparent'}`}
                            onClick={() => setSelectedImageIndex(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Main Image */}
            <div className="flex flex-col relative rounded-lg overflow-hidden mr-10 ">
                <div className="group">
                    <img
                        src={productImages[selectedImageIndex]}
                        alt={`Product Image ${selectedImageIndex + 1}`}
                        className="rounded-lg object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-2"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>

            {/* Image Viewer Modal with Zoom */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex items-center justify-center z-50">
                    <div className="relative">
                        {/* Zoomable Image */}
                        <div className="relative group">
                            <img
                                src={productImages[selectedImageIndex]}
                                alt="Large View"
                                className="w-full h-full max-w-3xl max-h-[95vh] object-contain transition-transform duration-300"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            className="fixed top-4 right-4 bg-white text-black rounded-full p-4 shadow-lg z-50 hover:bg-gray-200 transition"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <FontAwesomeIcon icon={FaTimes} size="2x" />
                        </button>

                        {/* Side Navigators */}
                        <button
                            className="fixed left-2 top-1/2 transform -translate-y-1/2 text-white bg-white bg-opacity-25 rounded-full p-3 hover:text-black hover:bg-opacity-75 transition focus:ring-2 focus:ring-blue-500"
                            onClick={() => handleImageClick((selectedImageIndex - 1 + productImages.length) % productImages.length)}
                        >
                            &lt;
                        </button>
                        <button
                            className="fixed right-2 top-1/2 transform -translate-y-1/2 text-white bg-white bg-opacity-25 rounded-full p-3 hover:text-black hover:bg-opacity-75 transition focus:ring-2 focus:ring-blue-500"
                            onClick={() => handleImageClick((selectedImageIndex + 1) % productImages.length)}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col justify-normal">
            {/* Product Name */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">3 Piece Embroidered Linen Suit</h1>
                <p className="text-sm uppercase text-gray-500 font-semibold mb-2">DW-W24-20-GREEN-EX SMALL | IN STOCK</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">PKR 21,590</p>
                <p className="text-red-600 text-xs">GST Inclusive</p>
            </div>

            {/* Color & Size Options */}
            <div className="my-4">
                <div className="flex items-center gap-4 mb-4">
                    <p className="text-lg font-semibold text-gray-800">Color:</p>
                    <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer border-2 border-gray-200 hover:border-gray-400"></div>
                        <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer border-2 border-gray-200 hover:border-gray-400"></div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-gray-800">Size:</p>
                    <div className="flex gap-2">
                        {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                            <button key={size} className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md">
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
                    <button
                        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-16 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
                    />
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                    >
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

            <p className="text-gray-500 mt-3">Weight: 1.25 Kg</p>
            <p className="text-red-500">Disclaimer: Product color may vary slightly due to photographic lighting sources or monitor settings.</p>
        </div>
    </div>

    {/* Product Description */}
    <div className="mb-10 mt-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Angrakha */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-md text-gray-900 font-semibold">Angrakha</h3>
                <ul className="text-gray-700 text-sm mt-1">
                    <li>Embroidered Neckline With Tassel Detailing</li>
                    <li>Digital Printed Front With Embroidery</li>
                    <li>Full Sleeves With Embroidery & Pearl Drops</li>
                    <li>Embroidered Organza Border</li>
                    <li>Digital Printed Back</li>
                    <li>Fit: Relaxed</li>
                    <li>Color: Pink</li>
                    <li>Fabric: Linen</li>
                </ul>
            </div>

            {/* Trousers */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-md text-gray-900 font-semibold">Trousers</h3>
                <ul className="text-gray-700 text-sm mt-1">
                    <li>Dyed Dhaka Trousers</li>
                    <li>Elasticated Waistband</li>
                    <li>Fit: Relaxed</li>
                    <li>Color: Pink</li>
                    <li>Fabric: Linen</li>
                </ul>
            </div>

            {/* Dupatta */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-md text-gray-900 font-semibold">Dupatta</h3>
                <ul className="text-gray-700 text-sm mt-1">
                    <li>Digital Printed Organza Dupatta</li>
                    <li>Embroidered Borders</li>
                    <li>Fit: Relaxed</li>
                    <li>Color: Pink</li>
                </ul>
            </div>
        </div>
    </div>
</div>

    );
}

export default ProductDetails;