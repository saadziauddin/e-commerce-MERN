import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../api/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function UpdateProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    color: [''],
    size: [''],
    tags: '',
    stock: '',
    category: '',
    discount: '',
    status: '',
    price1: '',
    price2: '',
    description: '',
    images: [],
  });
  const [editing, setEditing] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();

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

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;

    if (field === 'color' || field === 'size') {
      const updatedArray = [...formData[field]];
      updatedArray[index] = value;
      setFormData({
        ...formData,
        [field]: updatedArray,
      });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleImageChange = (e) => {
  //   setNewImages([...newImages, ...e.target.files]);
  // };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalImages = formData.images.length + newImages.length + selectedFiles.length;
  
    if (totalImages > 5) {
      toast.error('You can only upload up to 5 images!');
      return;
    }
  
    setNewImages([...newImages, ...selectedFiles]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all fields except images, color, and size
    for (let key in formData) {
      if (key !== 'images' && key !== 'color' && key !== 'size') {
        formDataToSend.append(key, formData[key]);
      }
    }
    // Append color array
    formData.color.forEach((color) => {
      formDataToSend.append('color[]', color);
    });
    // Append size array
    formData.size.forEach((size) => {
      formDataToSend.append('size[]', size);
    });
    // Append new images if any
    newImages.forEach((image) => {
      formDataToSend.append('images', image);
    });
    // Send only remaining existing images
    formData.images.forEach((image) => {
      formDataToSend.append('existingImages', image);
    });

    try {
      const updateProduct = await api.put(`/api/updateProduct/${productId}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (updateProduct.data.message === "Product updated successfully!") {
        toast.success("Product updated successfully!");
        setNewImages([]);
        setEditing(false);

        const refetchProductsData = await api.get(`/api/fetchProductById/${productId}`);
        const product = refetchProductsData.data.product[0];
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
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error updating product!";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  const goBack = () => {
    navigate('/dashboard/products');
  };

  // const removeExistingImage = (index) => {
  //   const updatedImages = formData.images.filter((_, i) => i !== index);
  //   setFormData({ ...formData, images: updatedImages });
  // };

  const removeExistingImage = async (index) => {
    const imageToRemove = formData.images[index];

    try {
      const response = await api.delete(`/api/deleteProductImage/${productId}`, {
        data: { imageId: imageToRemove._id }
      });

      if (response.data.success) {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
        toast.success("Image removed successfully!");
      } else {
        toast.error("Failed to remove image.");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Error removing image.");
    }
  };

  const removeNewImage = (index) => {
    const updatedNewImages = newImages.filter((_, i) => i !== index);
    setNewImages(updatedNewImages);
  };

  const addColor = () => {
    setFormData((prevState) => ({
      ...prevState,
      color: [...prevState.color, '']
    }));
  };

  const removeColor = (index) => {
    const updatedColors = formData.color.filter((_, i) => i !== index);
    setFormData((prevState) => ({ ...prevState, color: updatedColors }));
  };

  const addSize = () => {
    setFormData((prevState) => ({
      ...prevState,
      size: [...prevState.size, '']
    }));
  };

  const removeSize = (index) => {
    const updatedSizes = formData.size.filter((_, i) => i !== index);
    setFormData((prevState) => ({ ...prevState, size: updatedSizes }));
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
        <div className="flex flex-1 justify-center mt-3 pt-5 px-2 sm:px-4 md:px-0">
          <div className="w-full max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
            <div className="border-b-2 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden p-4 sm:p-5 md:p-10">
              <form className="w-full grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Buttons */}
                {editing ? (
                  <div className="flex justify-between md:col-span-3">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2 transition duration-300 hover:bg-[#692056] focus:outline-none focus:ring-2 focus:ring-[#7b246d]"
                    >
                      Update Product
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between md:col-span-3">
                    <button
                      type="button"
                      onClick={goBack}
                      className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Go Back
                    </button>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2 transition duration-300 hover:bg-[#692056] focus:outline-none focus:ring-2 focus:ring-[#7b246d]"
                    >
                      Enable Edit
                    </button>
                  </div>
                )}

                {/* Product Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-2 text-sm font-semibold text-gray-700">Product Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  />
                </div>

                {/* Colors */}
                <div className="flex flex-col">
                  <label htmlFor="color" className="mb-2 text-sm font-semibold text-gray-700">Colors:</label>
                  {formData.color.map((color, index) => (
                    <div key={index} className="relative flex items-center mb-2">
                      <input
                        type="text"
                        id={`color-${index}`}
                        name="color"
                        value={color}
                        onChange={(e) => handleInputChange(e, index, 'color')}
                        className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                        disabled={!editing}
                      />
                      {editing && (
                        <>
                          {/* Add color button */}
                          {index === formData.color.length - 1 && (
                            <button
                              type="button"
                              className="absolute top-[10px] right-9 text-gray-700 hover:text-green-500 text-xs"
                              onClick={addColor}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          )}
                          {/* Remove color button */}
                          <button
                            type="button"
                            className="absolute top-2 right-4 text-gray-700 hover:text-red-500 font-semibold text-sm"
                            onClick={() => removeColor(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>

                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Sizes */}
                <div className="flex flex-col">
                  <label htmlFor="size" className="mb-2 text-sm font-semibold text-gray-700">Sizes:</label>
                  {formData.size.map((size, index) => (
                    <div key={index} className="relative flex items-center mb-2">
                      <input
                        type="text"
                        id={`size-${index}`}
                        name="size"
                        value={size}
                        onChange={(e) => handleInputChange(e, index, 'size')}
                        className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                        disabled={!editing}
                      />
                      {editing && (
                        <>
                          {/* Add size button */}
                          {index === formData.size.length - 1 && (
                            <button
                              type="button"
                              className="absolute top-[10px] right-9 text-gray-700 hover:text-green-500 text-xs"
                              onClick={addSize}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          )}
                          {/* Remove size button */}
                          <button
                            type="button"
                            className="absolute top-2 right-4 text-gray-700 hover:text-red-500 font-semibold text-sm"
                            onClick={() => removeSize(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-col">
                  <label htmlFor="status" className="mb-2 text-sm font-semibold text-gray-700">Tags:</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  />
                </div>

                {/* Stock */}
                <div className="flex flex-col">
                  <label htmlFor="stock" className="mb-2 text-sm font-semibold text-gray-700">Stock:</label>
                  <input
                    type="text"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                  <label htmlFor="category" className="mb-2 text-sm font-semibold text-gray-700">Category:</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Discount */}
                <div className="flex flex-col">
                  <label htmlFor="status" className="mb-2 text-sm font-semibold text-gray-700">Discount:</label>
                  <input
                    type="text"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  />
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <label htmlFor="status" className="mb-2 text-sm font-semibold text-gray-700">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  >
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                {/* Price 1 */}
                <div className="flex flex-col">
                  <label htmlFor="price1" className="mb-2 text-sm font-semibold text-gray-700">Price 1:</label>
                  <input
                    type="text"
                    id="price1"
                    name="price1"
                    value={formData.price1}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  />
                </div>

                {/* Price 2 */}
                <div className="flex flex-col">
                  <label htmlFor="price2" className="mb-2 text-sm font-semibold text-gray-700">Price 2:</label>
                  <input
                    type="text"
                    id="price2"
                    name="price2"
                    value={formData.price2}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col md:col-span-3">
                  <label htmlFor="description" className="mb-2 text-sm font-semibold text-gray-700">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${!editing ? 'cursor-not-allowed' : ''}`}
                    disabled={!editing}
                  />
                </div>

                {/* New Image Upload */}
                <div className="flex flex-col md:col-span-3">
                  <label htmlFor="images" className="mb-3 text-sm font-semibold text-gray-700">New Product Images:</label>
                  <div className="relative">
                    <label className="w-full py-2 rounded-lg border border-gray-300 rounded-lg-lg flex items-center bg-white cursor-pointer pl-3 pr-5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent">
                      <input onChange={handleImageChange} type="file" id="images" name="images" className="hidden" multiple disabled={!editing} />
                      <span className={`text-gray-400 ${!editing ? 'cursor-not-allowed' : ''}`} >{newImages.length > 0 ? `${newImages.length} images selected` : 'Select New Product Images'}</span>
                    </label>
                  </div>

                  {/* Preview New Images */}
                  <div className="mt-5 mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {newImages.map((image, index) => (
                      <div key={index} className="relative w-full h-full bg-gray-100 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
                        <img src={URL.createObjectURL(image)} alt="New Product" className="flex object-fit w-full h-full" />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-gray-300 text-slate-700 p-0.5 rounded-lg w-4 sm:w-5 h-4 sm:h-5 text-xs sm:text-sm hover:font-semibold flex items-center justify-center hover:bg-gray-200 ease-in-out"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              </form>

              {/* Existing Images Section */}
              <div className="">
              <label htmlFor="images" className="mb-3 text-[15px] font-semibold text-gray-700">Existing Product Images:</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {formData.images.length > 0 ? (
                    formData.images.map((image, index) => (
                      <div key={index} className="relative w-full h-full bg-gray-100 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
                        <img src={`/uploads/product_images/${image.imagePath.split('\\').pop()}`} alt="product_image" className="flex object-fit w-full h-full" />
                        <img
                          src={`/uploads/product_images/${image.imageName}`}
                          alt="product_image"
                          className="flex object-fit w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className={`absolute top-1 right-1 bg-gray-300 text-slate-700 p-0.5 rounded-lg w-4 sm:w-5 h-4 sm:h-5 text-xs sm:text-sm hover:font-semibold flex items-center justify-center hover:bg-gray-200 ease-in-out ${!editing ? 'cursor-not-allowed hover:bg-gray-300 hover:font-normal' : ''}`}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateProduct;