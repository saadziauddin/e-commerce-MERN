import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faExclamationCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import api from "../../../Api/api.js";
import LottieAnimation from "../../../assets/animations/LottieAnimation";
import animationData from "../../../assets/animations/LoginAnimation.json";

const Reset = () => {
    const [values, setValues] = useState({ email: '', currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const [errors, setErrors] = useState({});
    const [filled, setFilled] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkFilled = () => {
            const { email, currentPassword, newPassword, confirmNewPassword } = values;
            setFilled(email && currentPassword && newPassword && confirmNewPassword);
        };

        checkFilled();
    }, [values]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        console.log("Is form valid?", isValid);

        if (!isValid) return;

        try {
            const response = await api.post("/passwordReset", { email, password });

            if (response.data.message === "Login Successfull!") {
                setEmail("");
                setPassword("");

                const role = response.data.role;

                if (role === "Admin") { navigate("/dashboard/home"); }
                else if (role === "User") { navigate("/dashboard/home"); } else { window.alert("Invalid Role!"); }

            } else if (response.data.resetPassword) {
                window.alert(response.data.message);
                navigate("/reset");
            } else {
                window.alert(response.data.message);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                window.alert(err.response.data.error);
            } else {
                window.alert("Request failed from Login");
            }
        }
    };

    const validate = () => {
        let errors = {};
        let isValid = true;

        if (!values.email) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email";
            isValid = false;
        }

        if (!values.currentPassword) {
            errors.currentPassword = "Current Password is required";
            isValid = false;
        } else if (values.currentPassword.length < 8 || !/(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}/.test(values.currentPassword)) {
            errors.currentPassword = "Password must be at least 8 characters long and include at least one uppercase letter and one number";
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
        } else if (values.confirmNewPassword !== values.password) {
            errors.confirmNewPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleReset = () => {
        handleSubmit();
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            {/* Animation Section */}
            <div className="w-0 lgl:w-[50%] h-full flex items-center justify-center p-10">
                <LottieAnimation animationData={animationData} loop={true} autoplay={true} />
            </div>

            {/* Form Section */}
            <div className="w-full lgl:w-1/2 h-full flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
                    <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                        <h1 className="font-titleFont font-semibold text-3xl mdl:text-4xl mb-4">
                            Reset
                        </h1>
                        <div className="flex flex-col gap-3">
                            {/* Email */}
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
                                    />
                                </div>
                                {errors.email &&
                                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                        {errors.email}
                                    </p>
                                }
                            </div>

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
                                {errors.newPassword &&
                                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                        {errors.newPassword}
                                    </p>
                                }
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
                                {errors.confirmNewPassword &&
                                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                        {errors.confirmNewPassword}
                                    </p>
                                }
                            </div>

                            <button type="submit"
                                className={`${filled
                                    ? "bg-[#7b246d] hover:bg-slate-500 hover:text-white hover:border-none cursor-pointer"
                                    : "bg-gray-500 hover:bg-gray-500 hover:text-white cursor-not-allowed"
                                    } text-white py-2 w-4/5 rounded-xl text-base font-medium duration-300`}
                                disabled={!filled} >
                                Verify Email
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
