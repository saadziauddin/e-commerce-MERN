import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProduct() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price1: '',
    price2: '',
    color: [],
    size: [],
    tags: '',
    category: '',
    stock: '',
    images: []
  });

  const [categories, setCategories] = useState([]);

  // Fetch product by ID
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);
        const product = await response.json();
        setFormData({
          name: product.name,
          description: product.description,
          price1: product.price1,
          price2: product.price2,
          color: product.color,
          size: product.size,
          tags: product.tags.join(', '),
          category: product.category,
          stock: product.stock,
          images: product.images // Existing images
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

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
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price1', formData.price1);
    formDataToSend.append('price2', formData.price2);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock', formData.stock);

    formData.color.forEach((c) => formDataToSend.append('color[]', c));
    formData.size.forEach((s) => formDataToSend.append('size[]', s));
    formData.tags.split(',').forEach((t) => formDataToSend.append('tags[]', t.trim()));

    // Append new images if any
    Array.from(formData.images).forEach((file) => {
      formDataToSend.append('images', file);
    });

    try {
      const response = await fetch(`/api/products/update/${id}`, {
        method: 'PUT',
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        navigate('/dashboard/products');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  };

  const goBack = () => {
    navigate('/dashboard/products');
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <ToastContainer />
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200 bg-light flex flex-col">
        <div className="flex flex-1 justify-center mt-3 pt-5 px-0">
          <div className="w-full max-w-6xl">
            <div className="border-b-2 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden p-5">
              <form className="w-full grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">Product Name:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">Category:</label>
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="price1" className="mb-2 text-sm font-medium text-gray-700">Price 1:</label>
                  <input type="number" id="price1" name="price1" value={formData.price1} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="price2" className="mb-2 text-sm font-medium text-gray-700">Price 2:</label>
                  <input type="number" id="price2" name="price2" value={formData.price2} onChange={handleInputChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2" />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="image" className="mb-2 text-sm font-medium text-gray-700">Update Images:</label>
                  <input type="file" multiple onChange={handleImageChange} className="text-sm text-gray-500 pl-3 pr-5 rounded-lg border border-gray-300 w-full py-2" />
                </div>

                <div className="col-span-3 flex justify-between mt-5">
                  <button type="button" onClick={goBack} className="text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg px-4 py-2">
                    Go Back
                  </button>

                  <button type="submit" className="text-sm font-semibold text-white bg-[#7b246d] rounded-lg px-4 py-2">
                    Update Product
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

export default UpdateProduct;
