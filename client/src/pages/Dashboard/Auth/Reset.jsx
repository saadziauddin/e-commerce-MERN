import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/webImages/nayabLogo1.png';
import '../../../assets/css/style.css';
import api from '../Api/api.js';

function ResetPassword () {
    const [values, setValues] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await api.post('/ResetPassword', values, { withCredentials: true });
                setValues({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                window.alert("Password reset successfully!");
                navigate('/');
        }
        catch(err) {
            if (err.response.data.error) {
                window.alert(err.response.data.error);
            } else {
                console.log(err);
            }
        }
    };
return (
    <div className="bg-image flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex items-center justify-center h-full w-full">
            <div className="flex flex-col bg-white bg-opacity-50 shadow-xl px-10 py-12 rounded-3xl w-full max-w-md">
                <div className="self-center mb-4">
                    <img src={logo} alt="Pronet Logo" className="h-2/4 w-40" />
                </div>
                <div className="text-center text-gray-800 mb-5 text-md font-light">
                    Reset your password
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="currentPassword" className="mb-2 text-sm font-medium text-gray-700">Current Password:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                            </div>
                            <input id="currentPassword" type="password" name="currentPassword" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your current password" required onChange={handleChange} value={values.currentPassword} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="newPassword" className="mb-2 text-sm font-medium text-gray-700">New Password:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                            </div>
                            <input id="newPassword" type="password" name="newPassword" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Enter your new password" required onChange={handleChange} value={values.newPassword} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-8">
                        <label htmlFor="confirmNewPassword" className="mb-2 text-sm font-medium text-gray-700">Confirm New Password:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                            </div>
                            <input id="confirmNewPassword" type="password" name="confirmNewPassword" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent" placeholder="Confirm your new password" required onChange={handleChange} value={values.confirmNewPassword} />
                        </div>
                    </div>
                    <div className="flex w-full">
                        <button type="submit" className="flex items-center justify-center focus:outline-none bg-gradient-to-r from-red-800 to-pink-700 text-white hover:bg-gradient-to-r hover:from-red-700 hover:to-pink-800 text-sm sm:text-base rounded-full py-3 w-full transition duration-150 ease-in">
                            <span className="mr-2 uppercase">Reset Password</span>
                            <span>
                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    // <div className="bg-image flex items-center justify-center h-full bg-cover bg-center bg-no-repeat" >
    //     <div className="flex flex-col bg-gray-200 shadow-lg px-7 py-7 rounded-2xl w-full max-w-sm">

    //         <div className="self-center h-16 w-32 mb-4">
    //             <img src={logo} alt="Pronet Logo" />
    //         </div>

    //         <div className="font-light self-center text-gray-800 mb-4 mt-2">
    //             Reset Password
    //         </div>

    //         <form onSubmit={handleSubmit}>

    //             <div className="flex flex-col mb-3">
    //                 <label htmlFor="currentPassword" className="mb-1 text-xs tracking-wide text-gray-600">Current Password:</label>
    //                 <div className="relative">
    //                     <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
    //                         <FontAwesomeIcon icon={faLock} />
    //                     </div>
    //                     <input id="currentPassword" type="password" name="currentPassword" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-500" placeholder="Enter current password" autoFocus required onChange={handleChange} value={values.currentPassword}/>
    //                 </div>
    //             </div>

    //             <div className="flex flex-col mb-3">
    //                 <label htmlFor="newPassword" className="mb-1 text-xs tracking-wide text-gray-600">New Password:</label>
    //                 <div className="relative">
    //                     <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
    //                         <FontAwesomeIcon icon={faLock} />
    //                     </div>
    //                     <input id="newPassword" type="password" name="newPassword" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-500" placeholder="Enter new password" required onChange={handleChange} value={values.newPassword}/>
    //                 </div>
    //             </div>
                
    //             <div className="flex flex-col mb-3">
    //                 <label htmlFor="confirmNewPassword" className="mb-1 text-xs tracking-wide text-gray-600">Confirm New Password:</label>
    //                 <div className="relative">
    //                     <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
    //                         <FontAwesomeIcon icon={faLock} />
    //                     </div>
    //                     <input id="confirmNewPassword" type="password" name="confirmNewPassword" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-500" placeholder="Confirm new password" required onChange={handleChange} value={values.confirmNewPassword}/>
    //                 </div>
    //             </div>

    //             <div className="flex w-full">
    //                 <button type="submit" className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-gray-600 hover:bg-gray-400 rounded-2xl py-2 w-full transition duration-150 ease-in">
    //                     <span className="mr-2 uppercase">Save</span><span><svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
    //                 </button>
    //             </div>
    //         </form>

    //     </div>
    // </div>
)}

export default ResetPassword;