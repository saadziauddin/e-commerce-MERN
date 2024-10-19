import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import FormatPrice from "../../../helpers/FormatPrice";

function Order() {
    const { selectedCurrency } = useOutletContext();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNo: "",
        shippingAddress: "",
        billingAddress: "",
        city: "",
        postalCode: "",
        country: "",
        notes: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const products = useSelector((state) => state.reduxReducer.products);
    const shippingCharge = 100;
    const totalAmt = products.reduce((total, item) => total + item.price * item.quantity, 0);
    const grandTotal = totalAmt + shippingCharge;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Valid email is required.";
        if (!formData.contactNo) newErrors.contactNo = "Contact number is required.";
        if (!formData.shippingAddress) newErrors.shippingAddress = "Shipping address is required.";
        if (!formData.billingAddress) newErrors.billingAddress = "Billing address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.country) newErrors.country = "Country is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            // Handle form submission logic here
            navigate('/paymentgateway');
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="max-w-container mx-auto px-4 py-6 lg:px-6 lg:py-10">
            <Breadcrumbs title="Billing Information" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Form */}
                <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-5 text-gray-700">Billing Information</h2>
                    <p className="text-gray-500 mb-5">Delivery takes 2 to 3 working days.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`border w-full p-3 rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#7b246d]`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`border w-full p-3 rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#7b246d]`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="contactNo"
                                    placeholder="Contact Number"
                                    value={formData.contactNo}
                                    onChange={handleChange}
                                    className={`border w-full p-3 rounded-lg ${errors.contactNo ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#7b246d]`}
                                />
                                {errors.contactNo && <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="shippingAddress"
                                    placeholder="Shipping Address"
                                    value={formData.shippingAddress}
                                    onChange={handleChange}
                                    className={`border w-full p-3 rounded-lg ${errors.shippingAddress ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#7b246d]`}
                                />
                                {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="billingAddress"
                                    placeholder="Billing Address"
                                    value={formData.billingAddress}
                                    onChange={handleChange}
                                    className={`border w-full p-3 rounded-lg ${errors.billingAddress ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#7b246d]`}
                                />
                                {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`border w-full p-3 rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#7b246d]`}
                                />
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={`border w-full p-3 rounded-lg ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#7b246d]`}
                                />
                                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Postal Code (Optional)"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className={`border w-full p-3 rounded-lg ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#7b246d]`}
                                />
                                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                            </div>
                        </div>
                        <div>
                            <textarea
                                name="notes"
                                placeholder="Additional Notes (optional)"
                                value={formData.notes}
                                onChange={handleChange}
                                className="border w-full p-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b246d]"
                                rows="3"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#7b246d] text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition duration-300"
                        >
                            Submit & Continue
                        </button>
                    </form>
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-1 bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-700">Order Summary</h2>
                    <div className="space-y-4">
                        {products.map((item, index) => (
                            <div key={item._id} className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{item.size} / {item.color}</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold"><FormatPrice price={item.price * item.quantity} currency={selectedCurrency} /></p>
                            </div>
                        ))}
                        <hr className="my-4" />
                        <div className="flex justify-between font-semibold">
                            <p className="font-bold">Total:</p>
                            <p className="font-semibold"><FormatPrice price={totalAmt} currency={selectedCurrency} /></p>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <p className="font-bold">Shipping:</p>
                            <p className="font-semibold"><FormatPrice price={shippingCharge} currency={selectedCurrency} /></p>
                        </div>
                        <div className="flex justify-between font-semibold text-xl">
                            <p className="font-bold">Grand Total:</p>
                            <p className="font-semibold"><FormatPrice price={grandTotal} currency={selectedCurrency} /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
