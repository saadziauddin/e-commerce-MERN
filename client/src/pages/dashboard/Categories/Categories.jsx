import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../Api/api.js';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

function Categories() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const closeSidebar = () => { setIsSidebarOpen(false); };
  const [fetchUsersData, setFetchUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await api.get('/fetchCategories');
        console.log("Result: ", result);
        setFetchUsersData(result.data);
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
    const userId = row._id;
    navigate(`/dashboard/userManagement/userProfile/${userId}`);
  };

  const handleDelete = async (UserId) => {
    try {
      const response = await api.delete('/Delete', {
        params: { UserId }
      });
      setFetchUsersData(fetchUsersData.filter(user => user.UserId !== UserId));
      toast.success(response.data.message);

      const result = await api.get('/GetUserData');
      setFetchUsersData(result.data);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user:', error);
    }
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
        theme="colored"
      />
      {/* Sidebar */}
      <div className={`fixed z-50 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out xl:translate-x-0`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>

      {/* Main */}
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-lg shadow-lg transition-all duration-200 bg-light">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Table Section */}
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex justify-between items-center p-6 pb-0 mb-3 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 className="text-xl font-semibold">Categories</h6>
                
                <button className="text-sm font-semibold text-white bg-[#2f456a] px-5 py-2 rounded-lg hover:bg-[#1d2c44] hover:shadow-lg transform hover:scale-105 transition-transform duration-300" onClick={addCategory}>
                  Add Category
                </button>
              </div>

              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <DataTable
                    columns={[
                      {
                        name: 'Image',
                        selector: row => {
                          if(row.image && row.image.length > 0){
                            const image = `/uploads/category_images/${row.image[0].imageName}`;
                            return (
                              <div><img src={image} alt="category_image" className="h-10 w-10 rounded-full" /></div>
                            );
                          } else {
                            "No Image"
                          }
                        },
                        sortable: false,
                        center: true.toString(),
                        wrap: true,
                      },
                      // {
                      //   name: 'Images',
                      //   selector: row => {
                      //     return row.image && row.image.length > 0 ? (
                      //       <div className="flex space-x-2">
                      //         {row.image.map((img, index) => (
                      //           <img
                      //             key={index}
                      //             src={`/uploads/category_images/${img.imageName}`}
                      //             alt="Category"
                      //             className="h-10 w-10 rounded-full"
                      //           />
                      //         ))}
                      //       </div>
                      //     ) : (
                      //       "No Image"
                      //     );
                      //   },
                      //   sortable: false,
                      //   center: true,
                      //   wrap: true,
                      // },
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
                        wrap: true,
                      },
                      {
                        name: 'Date Added',
                        selector: row => row.dateAdded,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Actions',
                        cell: row => (
                          <div className="flex justify-center space-x-4">
                            <button className="hover:text-blue-800 hover:font-semibold" onClick={() => handleEdit(row)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="hover:text-rose-800 hover:font-extrabold" onClick={() => handleDelete(row._id)}>
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        ),
                        sortable: false,
                        center: true.toString(),
                        wrap: true,
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
                    fixedHeader
                    data={fetchUsersData}
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
