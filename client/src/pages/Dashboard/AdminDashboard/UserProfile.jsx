import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import api from '../Api/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function UserProfile () {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
    const closeSidebar = () => { setIsSidebarOpen(false); };
    const { userId } = useParams();
    const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      contactNo: '',
      role: '',
      profileImageName: ''
    });
    const [roles, setRoles] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await api.get(`/GetUserData/${userId}`);
            const userData = response.data;
            console.log(userData)
            setValues({
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              fullName: userData.fullName,
              password: '',
              confirmPassword: '',
              contactNo: userData.contactNo,
              role: userData.role,
              profileImageName: userData.profileImage
            });
            const fetchAllRoles = await api.get('/Roles');
            setAllRoles(fetchAllRoles.data);
            const filteredRoles = filterRoles(userData.role, fetchAllRoles.data);
            setRoles(filteredRoles);
          } catch (error) {
            console.error('Error fetching user data: ', error);
          }
        };
        fetchUserData();
      }, [userId]);
      console.log(userId);


    const filterRoles = (currentRole, allRoles) => {
      if (currentRole === 'Admin') {
        return allRoles.filter(role => role.RoleName !== 'Admin');
      } else {
        return allRoles.filter(role => role.RoleName !== 'User');
      }
    };
  
    const handleEdit = () => {
      setEditing(true);
    };
  
    const backToUserManagement = () => {
      navigate('/dashboard/userManagement');
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
  
      if (name === 'role') {
        const filteredRoles = filterRoles(value, allRoles);
        setRoles(filteredRoles);
      }
    };
  
    const handleImageChange = (e) => {
      setValues({ ...values, profileImage: e.target.files[0] });
    };
  
    const handleSave = async () => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('contactNo', values.contactNo);
      formData.append('userRole', values.userRole);
      formData.append('password', values.password);
      formData.append('confirmPassword', values.confirmPassword);
      if (values.profileImage) {
        formData.append('profileImage', values.profileImage);
      }
  
      try {
        const response = await api.put(`/UpdateUserData/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        window.alert("User Updated Successfully!")
        window.location.reload();
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          window.alert(err.response.data.error);
        } else {
          window.alert("Try checking browser console!");
          console.log(err);
        }
      };
    };
  
    // const profileImage = `/images/users/${values.profileImage}`;
    const profileImage = `../../../assets/dashboardImages/users/${values.profileImage}`;
  
return (
    <div className="absolute top-0 left-0 w-full h-full">
        {/* Sidebar */}
        <div className={`fixed z-50 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out xl:translate-x-0`}>
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </div>

        {/* Main */}
        <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200 bg-light flex flex-col">
            {/* Topbar */}
            <Topbar toggleSidebar={toggleSidebar} />

            {/* Profile Form */}
            <div className="flex flex-1 justify-center mt-3 pt-5 px-0">
                <div className="w-full max-w-6xl">
                    <div className="border-b-2 flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="w-full md:w-2/5 p-6 bg-white shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <span className="w-full flex justify-center text-2xl font-semibold">{values.fullName}</span>
                            </div>
                            <span className="w-full flex justify-center text-gray-600">This information is secret so be careful</span>
                            <div className="w-full flex justify-center py-6">
                                <img src={profileImage} alt="Profile" className="h-32 w-32 rounded-full" />
                            </div>
                            <div className="w-full flex justify-center mt-4">
                                {editing ? (
                                    <div className="flex space-x-4">
                                        <button onClick={handleSave} className="text-sm font-bold bg-gradient-to-l from-[#843877a3] to-pink-600 text-white hover:bg-gradient-to-r hover:from-pink-700 hover:to-[#c558b398] rounded-full px-5 py-2 transition duration-300">Save Changes</button>
                                        <button onClick={() => setEditing(false)} className="text-sm font-bold text-white bg-gray-600 rounded-full px-5 py-2 transition duration-300 hover:bg-gray-800">Cancel</button>
                                    </div>
                                ) : (
                                    // <button onClick={handleEdit} className="text-sm font-bold text-white bg-gray-700 rounded-full px-5 py-2 transition duration-300 hover:bg-gray-800">Edit</button>
                                    <div className="flex space-x-4">
                                        <button onClick={handleEdit} className="text-sm font-bold bg-gradient-to-l from-[#843877a3] to-pink-600 text-white hover:bg-gradient-to-r hover:from-pink-700 hover:to-[#c558b398] rounded-full px-5 py-2 transition duration-300">Edit User</button>
                                        <button onClick={backToUserManagement} className="text-sm font-bold text-white bg-gray-600 rounded-full px-5 py-2 transition duration-300 hover:bg-gray-800">Go Back</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <form className="w-full md:w-4/5 p-5 space-y-4" onSubmit={handleSave} encType="multipart/form-data" >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-700">First Name:</label>
                                    <input type="text" id="firstName" name="firstName" value={values.firstName} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="lastName" className="mb-2 text-sm font-medium text-gray-700">Last Name:</label>
                                    <input type="text" id="lastName" name="lastName" value={values.lastName} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email:</label>
                                    <input type="email" id="email" name="email" value={values.email} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="contactNo" className="mb-2 text-sm font-medium text-gray-700">Contact Number:</label>
                                    <input type="text" id="contactNo" name="contactNo" value={values.contactNo} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">Password:</label>
                                    <input type="password" id="password" name="password" value={values.password} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-700">Confirm Password:</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" value={values.confirmPassword} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="role" className="mb-2 text-sm font-medium text-gray-700">User Role:</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-400" />
                                        </div>
                                        <select id="userRole" name="userRole" value={values.role} onChange={handleInputChange} className="text-sm text-gray-500 pl-9 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" style={{ appearance: 'none', backgroundImage: 'none' }} disabled={!editing} >
                                            <option value={values.role}>{values.role}</option>
                                            {roles.map((role) => (
                                                <option key={role._id} value={role.name}>{role.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="profileImage" className="mb-2 text-sm font-medium text-gray-700">Profile Image:</label>
                                    <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
};

export default UserProfile;
