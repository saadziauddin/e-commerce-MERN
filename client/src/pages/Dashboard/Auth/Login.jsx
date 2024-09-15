import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/webImages/nayabLogo1.png';
import api from '../Api/api.js';

function Login() {
    const [values, setValues] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/signin', values);

            if (response.data.message === 'Login Successfull!') {
                setValues({ email: '', password: '' });

                const role = response.data.role;

                if (role === "Admin") {
                    navigate('/dashboard/home');
                } else if (role === "User") {
                    navigate('/dashboard/home');
                } else {
                    window.alert('Invalid Role!');
                }
            } else if (response.data.resetPassword) {
                window.alert(response.data.message);
                navigate('/reset');
            } else {
                window.alert(response.data.message);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                window.alert(err.response.data.error);
            } else {
                window.alert('Request failed from Login');
            }
        }
    };
return (    
        <div className="bg-image flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat">
            <div className="flex items-center justify-center h-full w-full">
                <div className="flex flex-col bg-white bg-opacity-25 shadow-xl px-10 py-8 rounded-3xl w-full max-w-md">
                    <div className="self-center mb-4">
                        <img src={logo} alt="logoImage" className="h-2/4 w-40" />
                    </div>
                    <div className="text-center text-gray-300 mb-5 text-md font-light">
                        Enter your credentials to access your account
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-400">E-Mail Address:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                </div>
                                <input id="email" type="email" name="email" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" autoFocus placeholder="Enter your email" required onChange={handleChange} value={values.email} />
                            </div>
                        </div>
                        <div className="flex flex-col mb-8">
                            <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-400">Password:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                </div>
                                <input id="password" type="password" name="password" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your password" required onChange={handleChange} value={values.password} />
                            </div>
                        </div>
                        <div className="flex w-full">
                            <button type="submit" className="flex items-center justify-center focus:outline-none bg-gradient-to-r from-[#c558b398] to-pink-700 text-white hover:bg-gradient-to-r hover:from-pink-700 hover:to-[#c558b398] text-sm sm:text-base rounded-full py-3 w-full transition duration-150 ease-in">
                                <span className="mr-2 uppercase">Login</span>
                                <span>
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className="text-center text-gray-400 text-sm mt-4">
                            Don't have an account? <a href="/signup" className="text-pink-700 hover:text-pink-900">SignUp now!</a>
                        </div>
                        <div className="text-center text-gray-400 text-sm mt-2">
                            Forgot password? <a href="/reset" className="text-pink-700 hover:text-pink-900">Reset password</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
