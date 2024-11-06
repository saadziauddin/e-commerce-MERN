import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../api/api.js';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Categories() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const closeSidebar = () => { setIsSidebarOpen(false); };
  const [fetchCategoriesData, setfetchCategoriesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/fetchCategories');
        setfetchCategoriesData(response.data);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async () => {
    navigate('/dashboard/categories/addCategory');
  };

  const handleEdit = (row) => {
    const categoryId = row._id;
    navigate(`/dashboard/categories/updateCategory/${categoryId}`);
  };

  const handleDelete = async (CategoryId) => {
    try {
      const response = await api.delete('/api/deleteCategory', { params: { CategoryId } });
      setfetchCategoriesData(fetchCategoriesData.filter(category => category.categoryId !== CategoryId));
      toast.success(response.data.message);

      const reFetchCategories = await api.get('/api/fetchCategories');
      setfetchCategoriesData(reFetchCategories.data);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category, try checking browser console.');
    }
  };

  return (
    <div className="relative top-24 left-0 w-full h-full">
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
        theme="colored"
      />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 z-50 left-0 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>

      {/* Main */}
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full transition-all duration-200 bg-light">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Table Section */}
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex justify-between items-center p-6 pb-0 mb-3 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 className="text-xl font-semibold">Orders</h6>
              </div>

              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <DataTable
                    columns={[
                      {
                        name: 'Image',
                        selector: row => {
                          const hasImage = Array.isArray(row.image) && row.image.length > 0 && row.image[0].imageName;
                          return hasImage ? (
                            <div className="h-10 w-10 rounded-full">
                              <img src={`${apiUrl}/uploads/category_images/${row.image[0].imageName}`} alt="" />
                            </div>
                          ) : (
                            "No Image"
                          );
                        },
                        sortable: false,
                        center: true.toString(),
                        wrap: true,
                      },
                      {
                        name: 'Name',
                        selector: row => row.name,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Description',
                        selector: row => row.description,
                        sortable: true,
                        // wrap: true,
                      },
                      {
                        name: 'Date Added',
                        selector: row => row.dateAdded ? new Date(row.dateAdded).toLocaleDateString() : 'No Date',
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Actions',
                        cell: row => (
                          <div className="flex justify-center space-x-4">
                            <button className="hover:text-blue-800 hover:font-semibold" onClick={() => handleEdit(row)}>
                              <FontAwesomeIcon icon={faEye} /> View Details
                            </button>
                          </div>
                        ),
                        sortable: true,
                        center: true.toString(),
                      }
                    ]}
                    customStyles={{
                      headCells: {
                        style: {
                          fontWeight: 'bold',
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          backgroundColor: '#e8e8e8',
                        },
                      },
                      rows: {
                        style: {
                          minHeight: '50px',
                          '&:not(:last-of-type)': {
                            borderBottomStyle: 'solid',
                            borderBottomWidth: '1px',
                            borderBottomColor: '#d1d1d1',
                          },
                          '&:hover': {
                            backgroundColor: '#f1f1f1',
                          },
                        },
                      },
                      pagination: {
                        style: {
                          borderTopStyle: 'solid',
                          borderTopWidth: '1px',
                          borderTopColor: '#d1d1d1',
                        },
                      },
                    }}
                    data={fetchCategoriesData}
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 30, 50, 100]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
};

export default Categories;
