import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../Api/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const closeSidebar = () => { setIsSidebarOpen(false); };
  const { userId } = useParams();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: '',
    profileImageName: '',
    profileImagePath: '',
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

        setValues({
          firstName: userData[0].firstName,
          lastName: userData[0].lastName,
          email: userData[0].email,
          contactNo: userData[0].contactNo,
          address: userData[0].address,
          city: userData[0].city,
          country: userData[0].country,
          postalCode: userData[0].postalCode,
          password: '',
          confirmPassword: '',
          fullName: userData[0].fullName,
          role: userData[0].role,
          profileImageName: userData[0].profileImageName,
          profileImagePath: userData[0].profileImagePath
        });

        const fetchAllRoles = await api.get('/Roles');
        setAllRoles(fetchAllRoles.data);

        const filteredRoles = filterRoles(response.data.role, fetchAllRoles.data);
        setRoles(filteredRoles);

      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
    fetchUserData();
  }, [userId]);

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

  const goBack = () => {
    navigate('/dashboard/userManagement');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (name === 'userRole') {
      const filteredRoles = filterRoles(value, allRoles);
      setRoles(filteredRoles);
    }
  };

  const handleImageChange = (e) => {
    setValues({ ...values, profileImageName: e.target.files[0] });
  };

  const handleSave = async () => {
    if (values.password !== values.confirmPassword) {
      return window.alert("Passwords do not match");
    }
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('contactNo', values.contactNo);
    formData.append('address', values.address);
    formData.append('city', values.city);
    formData.append('country', values.country);
    formData.append('postalCode', values.postalCode);
    formData.append('userRole', values.role);
    formData.append('password', values.password);
    formData.append('confirmPassword', values.confirmPassword);
    if (values.profileImageName) {
      formData.append('image', values.profileImageName);
    }
    try {
      const response = await api.put(`/UpdateUserData/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success("User Updated Successfully!");

      setValues(prevValues => ({
        ...prevValues,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        contactNo: values.contactNo,
        address: values.address,
        city: values.city,
        country: values.country,
        postalCode: values.postalCode,
        password: '',
        confirmPassword: '',
        fullName: `${values.firstName} ${values.lastName}`,
        role: values.role,
        profileImagePath: `/uploads/user_images/${values.profileImageName}`,
        // profileImageName: values.profileImageName ? `${values.profileImageName}?t=${new Date().getTime()}` : prevValues.profileImageName
        // profileImageName: values.profileImageName || prevValues.profileImageName,
      }));
      setEditing(false);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Try checking browser console!", err.response.data.error);
        console.log("Error in UserProfile.jsx: ", err);
      }
    };
  };

  const profileImage = `/uploads/user_images/${values.profileImageName}`;
  // const profileImage = values.profileImage ? `/images/users/${values.profileImage}` : '/images/defaultProfile.png';

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                  <span className="w-full flex justify-center text-2xl font-semibold" disabled={!editing}>{values.fullName}</span>
                </div>
                <span className="w-full flex justify-center text-gray-600">This information is secret so be careful</span>
                <div className="w-full flex justify-center py-6">
                  <img src={profileImage} alt="Profile" className="h-40 w-40 rounded-full" disabled={!editing} />
                </div>
                <div className="w-full flex justify-center mt-32">
                  {editing ? (
                    <div className="flex space-x-4">
                      <button onClick={handleSave} className="text-sm font-bold bg-gradient-to-l from-[#843877a3] to-pink-600 text-white hover:bg-gradient-to-r hover:from-pink-700 hover:to-[#c558b398] rounded-full px-5 py-2 transition duration-300">Save Changes</button>
                      <button onClick={() => setEditing(false)} className="text-sm font-bold text-white bg-gray-600 rounded-full px-5 py-2 transition duration-300 hover:bg-gray-800">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex space-x-4">
                      <button onClick={handleEdit} className="text-sm font-bold bg-gradient-to-l from-[#843877a3] to-pink-600 text-white hover:bg-gradient-to-r hover:from-pink-700 hover:to-[#c558b398] rounded-full px-5 py-2 transition duration-300">Edit User</button>
                      <button onClick={goBack} className="text-sm font-bold text-white bg-gray-600 rounded-full px-5 py-2 transition duration-300 hover:bg-gray-800">Go Back</button>
                    </div>
                  )}
                </div>
              </div>
              {/* <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}> */}
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
                    <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-700">Address:</label>
                    <input type="text" id="address" name="address" value={values.address} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="city" className="mb-2 text-sm font-medium text-gray-700">City:</label>
                    <input type="text" id="city" name="city" value={values.city} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="country" className="mb-2 text-sm font-medium text-gray-700">Country:</label>
                    <input type="text" id="country" name="country" value={values.country} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="postalCode" className="mb-2 text-sm font-medium text-gray-700">Zip/Postal Code:</label>
                    <input type="text" id="postalCode" name="postalCode" value={values.postalCode} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="image" className="mb-2 text-sm font-medium text-gray-700">Profile Image:</label>
                    <div className="relative">
                      <label className="w-full py-2 border border-gray-300 rounded-full flex items-center bg-white cursor-pointer pl-3 pr-5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent">
                        <input
                          onChange={handleImageChange}
                          type="file"
                          id="image"
                          name="image"
                          className="hidden"
                          disabled={!editing}
                        />
                        <span className="text-gray-500">{values.profileImageName ? values.profileImageName.name : 'Select Profile Image'}</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="role" className="mb-2 text-sm font-medium text-gray-700">User Role:</label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        value={values.role}
                        onChange={handleInputChange}
                        className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white"
                        style={{ appearance: 'none', backgroundImage: 'none' }}
                        disabled={!editing}
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">Password:</label>
                    <input type="password" id="password" name="password" value={values.password} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-700">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={values.confirmPassword} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" disabled={!editing} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserProfile;
