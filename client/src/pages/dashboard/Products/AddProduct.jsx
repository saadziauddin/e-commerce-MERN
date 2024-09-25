import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../Api/api.js';

function AddProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const [categories, setCategories] = useState([]);
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
    images: []
  });
  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleImageChange = (e) => {
  //   setFormData({ ...formData, images: [...formData.images, ...e.target.files] });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   for (let key in values) {
  //       formData.append(key, values[key]);
  //   }
  //   try {
  //       const uploadCategory = await api.post('/addProduct', formData);
  //       if (uploadCategory.data.message === "Product added successfully!") {
  //           toast.success("Product added successfully!");
  //           setValues({
  //             name: '',
  //             description: '',
  //             price1: '',
  //             price2: '',
  //             color: '',
  //             size: '',
  //             tags: '',
  //             category: '',
  //             stock: '',
  //             images: []
  //           });
  //       }
  //   } catch (error) {
  //       console.log("Internal server error: ", error);
  //       toast.error("Internal server error, try checking browser console.");
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...formData.images, ...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key === 'images') {
        // Append each image separately
        formData.images.forEach((image, index) => {
          formDataToSend.append(`images`, image);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    console.log("Form data to send: ", formDataToSend);

    try {
      const uploadProduct = await api.post('/addProduct', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (uploadProduct.data.message === "Product added successfully!") {
        toast.success("Product added successfully!");
        setFormData({
          name: '',
          description: '',
          price1: '',
          price2: '',
          color: '',
          size: '',
          tags: '',
          category: '',
          stock: '',
          images: []
        });
      }
    } catch (error) {
      console.log("Internal server error: ", error);
      toast.error("Internal server error, check the browser console for details.");
    }
  };

  const goBack = () => {
    navigate('/dashboard/products');
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/fetchCategories');
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  return(
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
                {/* Other input fields */}
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
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="flex flex-col">
                  <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Category:</label>
                  <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div> */}
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
                  <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-700">Description:</label>
                  <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white" />
                </div>

                {/* Multiple Image Upload */}
                <div className="flex flex-col">
                  <label htmlFor="images" className="mb-2 text-sm font-medium text-gray-700">Product Images:</label>
                  <div className="relative">
                    <label className="w-full py-2 border border-gray-300 rounded-lg flex items-center bg-white cursor-pointer pl-3 pr-5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent">
                      <input onChange={handleImageChange} type="file" id="images" name="images" className="hidden" multiple />
                      <span className="text-gray-400">{formData.images.length > 0 ? `${formData.images.length} images selected` : 'Select Product Images'}</span>
                    </label>
                  </div>

                  {/* Preview Images */}
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative w-full h-24 bg-gray-100 border rounded-lg overflow-hidden shadow-md">
                        <img src={URL.createObjectURL(image)} alt="Product Preview" className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
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
