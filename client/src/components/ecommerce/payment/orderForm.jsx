import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function OrderForm() {
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
    const navigate = useNavigate(); // Use navigate to programmatically redirect

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email || !emailRegex.test(formData.email))
            newErrors.email = "Valid email is required.";
        if (!formData.contactNo) newErrors.contactNo = "Contact number is required.";
        if (!formData.shippingAddress) newErrors.shippingAddress = "Shipping address is required.";
        if (!formData.billingAddress) newErrors.billingAddress = "Billing address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.postalCode) newErrors.postalCode = "Postal code is required.";
        if (!formData.country) newErrors.country = "Country is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            // Call the parent function with form data if needed, or handle logic here
            console.log("Form submitted successfully!", formData);

            // Redirect to the payment gateway page after successful form submission
            navigate('/paymentgateway');
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="Order Form" />
            <div className="bg-white p-6 mb-10 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-4">Delivery will take 2 to 3 working days.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <input
                        type="tel"
                        name="contactNo"
                        placeholder="Contact Number"
                        value={formData.contactNo}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    {errors.contactNo && <p className="text-red-500 text-sm">{errors.contactNo}</p>}

                    <input
                        type="text"
                        name="shippingAddress"
                        placeholder="Shipping Address"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    {errors.shippingAddress && <p className="text-red-500 text-sm">{errors.shippingAddress}</p>}

                    <input
                        type="text"
                        name="billingAddress"
                        placeholder="Billing Address"
                        value={formData.billingAddress}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    {errors.billingAddress && <p className="text-red-500 text-sm">{errors.billingAddress}</p>}

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

                    <textarea
                        name="notes"
                        placeholder="Additional Notes (optional)"
                        value={formData.notes}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2"
                        rows="3"
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#7b246d] text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                        Submit & Continue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OrderForm;
