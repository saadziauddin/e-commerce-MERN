import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const closeSidebar = () => { setIsSidebarOpen(false); };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price1: '',
    price2: '',
    color: '',
    size: '',
    tags: '',
    category: '',
    stock: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data
    toast.success("Product added successfully!");
  };

  const goBack = () => {
    navigate('/dashboard/categories');
  }
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

        {/* Add Product Form */}
        <div className="flex flex-1 justify-center mt-3 pt-5 px-0">
          <div className="w-full max-w-6xl">
            <div className="border-b-2 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden p-5">
              <form className="w-full grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">Product Name:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="color" className="mb-2 text-sm font-medium text-gray-700">Color:</label>
                  <input type="text" id="color" name="color" value={formData.color} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="size" className="mb-2 text-sm font-medium text-gray-700">Size:</label>
                  <input type="text" id="size" name="size" value={formData.size} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Category:</label>
                  <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="tags" className="mb-2 text-sm font-medium text-gray-700">Tags:</label>
                  <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="stock" className="mb-2 text-sm font-medium text-gray-700">Stock:</label>
                  <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price1" className="mb-2 text-sm font-medium text-gray-700">Price 1:</label>
                  <input type="number" id="price1" name="price1" value={formData.price1} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price2" className="mb-2 text-sm font-medium text-gray-700">Price 2:</label>
                  <input type="number" id="price2" name="price2" value={formData.price2} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image" className="mb-2 text-sm font-medium text-gray-700">Product Image:</label>
                  <div className="relative">
                    <label className="w-full py-2 border border-gray-300 rounded-lg flex items-center bg-white cursor-pointer pl-3 pr-5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent">
                      <input onChange={handleImageChange} type="file" id="image" name="image" className="hidden" />
                      <span className="text-gray-400">{formData.image ? formData.image.name : 'Select Product Image'}</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description:</label>
                  <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>

                {/* Buttons */}
                <div className="col-span-3 flex justify-between mt-5">
                  <button
                    type="button"
                    onClick={goBack}
                    className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    Go Back
                  </button>

                  <button
                    type="submit"
                    className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2 transition duration-300 hover:bg-[#692056] focus:outline-none focus:ring-2 focus:ring-[#7b246d]">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddProduct;
