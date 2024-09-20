import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faExclamationCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import api from "../../../Api/api.js";
import LottieAnimation from "../../../assets/animations/LottieAnimation";
import animationData from "../../../assets/animations/LoginAnimation.json";
import { ToastContainer, toast } from 'react-toastify';

const Reset = () => {
    const [values, setValues] = useState({ email: '', currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const [errors, setErrors] = useState({});
    const [filled, setFilled] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkFilled = () => {
            const { email, currentPassword, newPassword, confirmNewPassword } = values;
            setFilled(email && (emailVerified ? (currentPassword && newPassword && confirmNewPassword) : email));
        };
        checkFilled();
    }, [values, emailVerified]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleEmailVerification = async (e) => {
        e.preventDefault();
        const isValid = validateEmail();
        if (!isValid) return;

        try {
            const result = await api.post("/verifyEmail", { email: values.email });
            if (result.data.message === "Email verified successfully!") {
                setEmailVerified(true);  // Show password fields after successful email verification
            } else {
                toast.error(result.data.error);
            }
        } catch (err) {
            toast.error("Failed to verify email!");
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const isValid = validatePassword();
        if (!isValid) return;

        try {
            const result = await api.post("/resetPassword", values);
            if (result.data.message === "Password reset successfully!") {
                toast.success("Password reset successfully!");
                setValues({
                    email: '', 
                    currentPassword: '', 
                    newPassword: '', 
                    confirmNewPassword: '' 
                });
                // navigate('/signin');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                console.error("Request failed during reset password:", error);
                toast.error("Request failed during password reset!");
            }
        }
    };

    const validateEmail = () => {
        let errors = {};
        let isValid = true;

        if (!values.email) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const validatePassword = () => {
        let errors = {};
        let isValid = true;

        if (!values.currentPassword) {
            errors.currentPassword = "Current Password is required";
            isValid = false;
        }

        if (!values.newPassword) {
            errors.newPassword = "New Password is required";
            isValid = false;
        } else if (values.newPassword.length < 8 || !/(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}/.test(values.newPassword)) {
            errors.newPassword = "Password must be at least 8 characters long and include at least one uppercase letter and one number";
            isValid = false;
        }

        if (!values.confirmNewPassword) {
            errors.confirmNewPassword = "Confirm new password is required";
            isValid = false;
        } else if (values.confirmNewPassword !== values.newPassword) {
            errors.confirmNewPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Animation Section */}
            <div className="w-0 lgl:w-[50%] h-full flex items-center justify-center p-10">
                <LottieAnimation animationData={animationData} loop={true} autoplay={true} />
            </div>

            {/* Form Section */}
            <div className="w-full lgl:w-1/2 h-full flex items-center justify-center">
                <form onSubmit={emailVerified ? handlePasswordReset : handleEmailVerification} className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
                    <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                        <h1 className="font-titleFont font-semibold text-3xl mdl:text-4xl mb-4">
                            {emailVerified ? "Reset Password" : "Verify Email"}
                        </h1>

                        <div className="flex flex-col gap-3">
                            {/* Email Input */}
                            <div className="mb-0">
                                <label className="text-gray-600 font-titleFont ml-2 mb-1 font-semibold">Email*</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        onChange={handleChange}
                                        value={values.email}
                                        className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl focus:outline-none focus:border-primeColor"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        disabled={emailVerified}  // Disable email field after verification
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Show password fields only after email is verified */}
                            {emailVerified && (
                                <>
                                    {/* Current Password */}
                                    <div className="mb-0">
                                        <label className="text-gray-600 font-titleFont ml-2 mb-1 font-semibold">Current Password*</label>
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3.5 text-gray-400" />
                                            <input
                                                onChange={handleChange}
                                                value={values.currentPassword}
                                                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl focus:outline-none focus:border-primeColor"
                                                type="password"
                                                name="currentPassword"
                                                placeholder="********"
                                            />
                                        </div>
                                        {errors.currentPassword &&
                                            <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                                <FontAwesomeIcon icon={faExclamationCircle} />
                                                {errors.currentPassword}
                                            </p>
                                        }
                                    </div>

                                    {/* New Password */}
                                    <div className="mb-0">
                                        <label className="text-gray-600 font-titleFont ml-2 mb-1 font-semibold">New Password*</label>
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3.5 text-gray-400" />
                                            <input
                                                onChange={handleChange}
                                                value={values.newPassword}
                                                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl focus:outline-none focus:border-primeColor"
                                                type="password"
                                                name="newPassword"
                                                placeholder="********"
                                            />
                                        </div>
                                        {errors.newPassword && (
                                            <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                                <FontAwesomeIcon icon={faExclamationCircle} />
                                                {errors.newPassword}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="mb-0">
                                        <label className="text-gray-600 font-titleFont ml-2 mb-1 font-semibold">Confirm New Password*</label>
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3.5 text-gray-400" />
                                            <input
                                                onChange={handleChange}
                                                value={values.confirmNewPassword}
                                                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl focus:outline-none focus:border-primeColor"
                                                type="password"
                                                name="confirmNewPassword"
                                                placeholder="********"
                                            />
                                        </div>
                                        {errors.confirmNewPassword && (
                                            <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                                <FontAwesomeIcon icon={faExclamationCircle} />
                                                {errors.confirmNewPassword}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            <button type="submit"
                                className={`${filled
                                    ? "bg-[#7b246d] hover:bg-slate-500 hover:text-white hover:border-none cursor-pointer"
                                    : "bg-gray-500 hover:bg-gray-500 hover:text-white cursor-not-allowed"
                                    } text-white py-2 w-4/5 rounded-xl text-base font-medium duration-300`}
                                disabled={!filled} >
                                {emailVerified ? "Reset Password" : "Verify Email"}
                            </button>

                            <p className="text-gray-700 text-sm text-center w-4/5">
                                Back to sign in?{' '}
                                <Link to="/signin" className="text-primeColor font-medium hover:text-blue-600 duration-300">
                                    Sign in
                                </Link>
                            </p>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reset;
