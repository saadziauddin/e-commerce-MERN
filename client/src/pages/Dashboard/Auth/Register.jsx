import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faCaretDown, faImage, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import api from '../Api/api.js';
import '../../../assets/css/style.css';
import logo from '../../../assets/webImages/nayabLogo1.png';
import { useNavigate } from 'react-router-dom';

function register() {
    const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', contactNo: '', userRole: '', profileImage: '' });
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get('/Roles');
                console.log(response)
                setRoles(response.data);
            }
            catch (error) {
                console.error("Error fetching roles in register form: " + error);
            }
        }
        fetchRoles();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const handleFileChange = (e) => {
        setValues({ ...values, image: e.target.files[0] });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        try {
            await api.post('/Register', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(res => {
                    setValues({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', contactNo: '', userRole: '', profileImage: '' });
                    window.alert('Registration successful!');
                    navigate('/signin');
                })
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                window.alert(err.response.data.error);
            } else {
                console.log(err);
            }
        }
    };
    const backToHome = () => {
        navigate('/')
    };
    return (
        <div className="bg-image flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
            <div className="flex items-center justify-center h-full w-full">
                <div className="relative flex flex-col bg-white bg-opacity-25 shadow-xl px-10 py-12 rounded-3xl w-full max-w-4xl">
                    <button onClick={backToHome} className="absolute top-4 left-4 flex items-center bg-gradient-to-r from-[#c558b398] to-pink-700 hover:bg-gradient-to-r hover:from-pink-700 hover:to-[#c558b398] text-white rounded-full px-4 py-2">
                        <FontAwesomeIcon icon={faLongArrowAltLeft} className="mr-2" />Go Back
                    </button>
                    <div className="flex justify-center">
                        <img src={logo} alt="logoImage" className="h-20 w-40" />
                    </div>
                    <div className="text-center text-gray-300 mt-2 mb-5 text-lg font-light">
                        Enter credentials to register yourself
                    </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-400">First Name:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                </div>
                                <input id="firstName" type="text" name="firstName" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" autoFocus placeholder="Enter your first name" required onChange={handleChange} value={values.firstName} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastName" className="mb-2 text-sm font-medium text-gray-400">Last Name:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                </div>
                                <input id="lastName" type="text" name="lastName" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your last name" required onChange={handleChange} value={values.lastName} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-400">E-Mail Address:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                </div>
                                <input id="email" type="email" name="email" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your email" required onChange={handleChange} value={values.email} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="contactNo" className="mb-2 text-sm font-medium text-gray-400">Contact No:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                                </div>
                                <input id="contactNo" type="tel" name="contactNo" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your contact no" required onChange={handleChange} value={values.contactNo} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="image" className="mb-2 text-sm font-medium text-gray-400">Profile Image:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faImage} className="text-gray-400" />
                                </div>
                                <label className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white cursor-pointer">
                                    <input id="image" type="file" name="image" className="hidden" onChange={handleFileChange} />
                                    <span className="text-gray-500">{values.image ? values.image.name : 'Select Profile Image'}</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="userRole" className="mb-2 text-sm font-medium text-gray-400">User Role:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-400" />
                                </div>
                                <select id="userRole" name="userRole" value={values.userRole} onChange={handleChange} className="text-sm text-gray-500 pl-9 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" style={{ appearance: 'none', backgroundImage: 'none' }}>
                                    <option value="">Select Role</option>
                                    {roles.map((role) => (
                                    <option key={role._id} value={role.name}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-400">Password:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                </div>
                                <input id="password" type="password" name="password" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your password" required onChange={handleChange} value={values.password} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-400">Confirm Password:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                </div>
                                <input id="confirmPassword" type="password" name="confirmPassword" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Confirm your password" required onChange={handleChange} value={values.confirmPassword} />
                            </div>
                        </div>
                        <div className="flex w-full col-span-1 sm:col-span-2 mt-5">
                            <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-gradient-to-r from-[#c558b398] to-pink-700 hover:bg-gradient-to-r hover:from-pink-700 hover:to-[#c558b398] rounded-full py-3 w-full transition duration-150 ease-in">
                                <span className="mr-2 uppercase">Register</span>
                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-center text-gray-400 text-sm mt-4">
                            Already have an account? <a href="/signup" className="text-pink-700 hover:text-pink-900">Sign in!</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default register;
