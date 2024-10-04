import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../api/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
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
    profileImage: ''
  });
  const [roles, setRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/api/getUserById/${userId}`);
        const userData = response.data[0];
        setValues({
          ...userData,
          password: '',
          confirmPassword: '',
          fullName: `${userData.firstName} ${userData.lastName}`
        });

        const fetchRolesResponse = await api.get('/api/roles');
        setAllRoles(fetchRolesResponse.data);
        setRoles(filterRoles(userData.role, fetchRolesResponse.data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const filterRoles = (currentRole, allRoles) => {
    return currentRole === 'Admin'
      ? allRoles.filter(role => role.RoleName !== 'Admin')
      : allRoles.filter(role => role.RoleName !== 'User');
  };

  const handleEdit = () => setEditing(true);

  const goBack = () => navigate('/dashboard/userManagement');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === 'role') {
      setRoles(filterRoles(value, allRoles));
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (imageFile) formData.append('image', imageFile);

    for (let key in values) {
      if (key !== 'profileImage') {
        formData.append(key, values[key]);
      }
    }

    try {
      await api.put(`/api/updateUser/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      toast.success("User Updated Successfully!");

      setEditing(false);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Error updating user!";
      toast.error(errorMessage);
      console.error("Error:", errorMessage);
    }
  };

  const profileImageUrl = values.profileImage
    ? `/uploads/user_images/${values.profileImage[0]?.imageName}`
    : '/uploads/user_images/defaultProfile.png';

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

      <div className={`fixed z-50 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out xl:translate-x-0`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>

      <main className="ease-soft-in-out xl:ml-68.5 relative h-full transition-all duration-200 bg-light flex flex-col">
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 justify-center mt-3 pt-5 px-0">
          <div className="w-full max-w-6xl">
            <div className="border-b-2 flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="w-full md:w-2/5 p-6 bg-white shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="w-full flex justify-center text-2xl font-semibold">{values.fullName}</span>
                </div>
                <span className="w-full flex justify-center text-gray-600">This information is secret so be careful</span>
                <div className="w-full flex justify-center py-6">
                  <img src={profileImageUrl} alt="Profile" className="h-40 w-40 rounded-full" />
                </div>
                <div className="w-full flex justify-center mt-32">
                  {editing ? (
                    <div className="flex space-x-4">
                      <button onClick={handleSave} className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2 transition duration-300 hover:bg-[#692056] focus:outline-none focus:ring-2 focus:ring-[#7b246d]">Save Changes</button>
                      <button onClick={() => setEditing(false)} className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex space-x-4">
                      <button onClick={handleEdit} className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2 transition duration-300 hover:bg-[#692056] focus:outline-none focus:ring-2 focus:ring-[#7b246d]">Edit User</button>
                      <button onClick={goBack} className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Go Back</button>
                    </div>
                  )}
                </div>
              </div>

              <form className="w-full md:w-4/5 p-5 space-y-4" onSubmit={handleSave} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['firstName', 'lastName', 'email', 'contactNo', 'address', 'city', 'country', 'postalCode'].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label htmlFor={field} className="mb-2 text-sm font-medium text-gray-700">
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </label>
                      <input
                        type="text"
                        id={field}
                        name={field}
                        value={values[field]}
                        onChange={handleInputChange}
                        className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                        disabled={!editing}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col">
                    <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name={values.password}
                      onChange={handleInputChange}
                      className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                      disabled={!editing}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-700">Confirm Password:</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name={values.confirmPassword}
                      onChange={handleInputChange}
                      className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                      disabled={!editing}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="image" className="mb-2 text-sm font-medium text-gray-700">Profile Image:</label>
                    <label className="w-full py-2 border border-gray-300 rounded-full flex items-center bg-white cursor-pointer pl-3 pr-5 focus:outline-none focus:ring-2 focus:ring-gray-400">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={!editing}
                      />
                      <span className="text-gray-400">{imageFile ? imageFile.name : 'Select Profile Image'}</span>
                    </label>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="role" className="mb-2 text-sm font-medium text-gray-700">User Role:</label>
                    <select
                      id="role"
                      name="role"
                      value={values.role}
                      onChange={handleInputChange}
                      className="text-sm text-gray-500 pl-3 pr-5 rounded-full border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                      disabled={!editing}
                    >
                      {roles.map((role, idx) => (
                        <option key={idx} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
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

