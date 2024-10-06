import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api.js';

function UpdateCategory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', description: '', image: '' });
  const { categoryId } = useParams();
  const [editing, setEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        const response = await api.get(`/api/fetchCategoryById/${categoryId}`);
        const categoryData = response.data;
        const category = categoryData.category[0];
        setValues({
          name: category.name,
          description: category.description,
          image: category.image[0].imageName
        });
      } catch (error) {
        console.log("Error fetching category data: ", error);
        toast.error("Error fetching category data, try checking browser console.");
      }
    };
    fetchCategoryById();
  }, [categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    try {
      const response = await api.put(`/api/updateCategory/${categoryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.message === "Category updated successfully!") {
        toast.success("Category updated successfully!");
        setEditing(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error updating category!";
      toast.error(errorMessage); // Display the error message from the server
      console.error("Error:", errorMessage);
    };
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  const goBack = () => {
    navigate('/dashboard/categories');
  };

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

        {/* Form */}
        <div className="flex flex-1 justify-center mt-3 pt-5 px-0">
          <div className="w-full max-w-6xl">
            <div className="border-b-2 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden p-5">
              <form className="w-full grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">Category Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''
                      }`}
                    disabled={!editing}
                  />
                </div>

                {/* Image Field */}
                <div className="flex flex-col">
                  <label htmlFor="image" className="mb-2 text-sm font-medium text-gray-700">Category Image:</label>
                  <div className="relative">
                    <label className="w-full py-2 border border-gray-300 rounded-lg flex items-center bg-white cursor-pointer pl-3 pr-5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={!editing}
                      />
                      <span className={`text-gray-400 ${!editing ? 'cursor-not-allowed' : ''}`}>{imageFile ? imageFile.name : values.image|| "No image in database"}</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  />
                </div>

                {/* Buttons */}
                {editing ? (
                  <div className="col-span-3 flex justify-between mt-5">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2 transition duration-300 hover:bg-[#692056] focus:outline-none focus:ring-2 focus:ring-[#7b246d]">
                      Update Category
                    </button>
                  </div>
                ) : (
                  <div className="col-span-3 flex justify-between mt-5">
                    <button
                      type="button"
                      onClick={goBack}
                      className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                      Go Back
                    </button>

                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2 transition duration-300 hover:bg-[#692056] focus:outline-none focus:ring-2 focus:ring-[#7b246d]">
                      Enable Edit
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

  export default UpdateCategory;
