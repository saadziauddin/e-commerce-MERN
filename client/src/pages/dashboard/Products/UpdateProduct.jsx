import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../Api/api.js';

function UpdateProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price1: '',
    price2: '',
    discount: '',
    status: '',
    color: '',
    size: '',
    tags: '',
    category: '',
    stock: '',
    images: []
  });
  const [editing, setEditing] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();

  // Fetch categories and existing product data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/fetchCategories');
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };

    const fetchProductById = async () => {
      try {
        const response = await api.get(`/api/fetchProductById/${productId}`);
        const product = response.data.product[0];
        console.log("Product: ", product);
        setFormData({
          name: product.name,
          description: product.description,
          price1: product.price1,
          price2: product.price2,
          color: product.color,
          size: product.size,
          tags: product.tags,
          discount: product.discount,
          status: product.status,
          category: product.category,
          stock: product.stock,
          images: product.images
        });
      } catch (error) {
        console.log("Error fetching product data: ", error);
        toast.error("Error fetching product data.");
      }
    };

    fetchCategories();
    fetchProductById();
  }, [productId]);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle new image changes
  const handleImageChange = (e) => {
    setNewImages([...newImages, ...e.target.files]);
  };

  // Remove existing image (client-side)
  const removeExistingImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  // Remove newly selected image
  const removeNewImage = (index) => {
    const updatedNewImages = newImages.filter((_, i) => i !== index);
    setNewImages(updatedNewImages);
  };

  // Handle form submission for updating product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append all fields except images
    for (let key in formData) {
      if (key !== 'images') {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append new images if any
    newImages.forEach((image) => {
      formDataToSend.append('images', image);
    });

    // Send only remaining existing images
    formData.images.forEach((image) => {
      formDataToSend.append('existingImages', image); // Server should handle these
    });

    try {
      const updateProduct = await api.put(`/api/products/updateProduct/${productId}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (updateProduct.data.message === "Product updated successfully!") {
        toast.success("Product updated successfully!");
        navigate('/dashboard/products');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error updating product!";
      toast.error(errorMessage);
      console.error("Error updating product: ", errorMessage);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  const goBack = () => {
    navigate('/dashboard/products');
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

        {/* Update Product Form */}
        <div className="flex flex-1 justify-center mt-3 pt-5 px-0">
          <div className="w-full max-w-6xl">
            <div className="border-b-2 flex flex-col shadow-lg rounded-lg overflow-hidden p-5">
              {/* Buttons */}
              {editing ? (
                <div className="col-span-3 flex justify-between mt-5 px-5">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2 transition duration-300 hover:bg-[#692056] focus:outline-none focus:ring-2 focus:ring-[#7b246d]">
                    Update Product
                  </button>
                </div>
              ) : (
                <div className="col-span-3 flex justify-between mt-5 px-5">
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
              <form className="w-full grid grid-cols-1 gap-8" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Input Fields Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 text-sm font-semibold text-gray-700">Product Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} 
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} 
                    disabled={!editing} />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="color" className="mb-2 text-sm font-semibold text-gray-700">Color:</label>
                    <input type="text" id="color" name="color" value={formData.color} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing} />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="size" className="mb-2 text-sm font-semibold text-gray-700">Size:</label>
                    <input type="text" id="size" name="size" value={formData.size} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing} />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="tags" className="mb-2 text-sm font-semibold text-gray-700">Tags:</label>
                    <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing} />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="stock" className="mb-2 text-sm font-semibold text-gray-700">Status:</label>
                    <input type="text" id="stock" name="stock" value={formData.status} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing} />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="category" className="mb-2 text-sm font-semibold text-gray-700">Category:</label>
                    <select id="category" name="category" value={formData.category} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing}>
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="price1" className="mb-2 text-sm font-semibold text-gray-700">Price 1:</label>
                    <input type="number" id="price1" name="price1" value={formData.price1} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing} />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="price2" className="mb-2 text-sm font-semibold text-gray-700">Price 2:</label>
                    <input type="number" id="price2" name="price2" value={formData.price2} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing} />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="discount" className="mb-2 text-sm font-semibold text-gray-700">Discount:</label>
                    <input type="text" id="discount" name="discount" value={formData.discount} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing} />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="description" className="mb-2 text-sm font-semibold text-gray-700">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`} disabled={!editing} />
                  </div>

                  {/* New Image Upload */}
                  <div className="flex flex-col">
                    <label htmlFor="images" className="mb-2 text-sm font-medium text-gray-700">New Product Images:</label>
                    <div className="relative">
                      <label className="w-full py-2 border border-gray-300 rounded-lg flex items-center bg-white cursor-pointer pl-3 pr-5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent">
                        <input onChange={handleImageChange} type="file" id="images" name="images" className="hidden" multiple disabled={!editing} />
                        <span className={`text-gray-400 ${!editing ? 'cursor-not-allowed' : ''}`} >{newImages.length > 0 ? `${newImages.length} images selected` : 'Select New Product Images'}</span>
                      </label>
                    </div>

                    {/* Preview New Images */}
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {newImages.map((image, index) => (
                        <div key={index} className="relative w-full h-24 bg-gray-100 border rounded-lg overflow-hidden shadow-md">
                          <img src={URL.createObjectURL(image)} alt="New Product" className="object-cover w-full h-full" />
                          <button type="button" onClick={() => removeNewImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded">X</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Existing Images Section */}
                <div className="bg-white p-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-700">Product Images:</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {formData.images.length > 0 ? (
                      formData.images.map((image, index) => (
                        <div key={index} className="relative w-full h-full bg-gray-100 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
                          <img src={`/uploads/product_images/${image.imagePath.split('\\').pop()}`} alt="product_image" className="flex object-fit w-full h-full" />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className={`w-[30px] h-[30px] flex items-center justify-center absolute top-1 right-1 bg-gray-300 text-slate-700 p-1 rounded hover:bg-gray-200 transition-colors duration-200 ${!editing ? 'cursor-not-allowed' : ''}`}
                            disabled={!editing}
                          >
                            x
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No images available.</p>
                    )}
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

export default UpdateProduct;
