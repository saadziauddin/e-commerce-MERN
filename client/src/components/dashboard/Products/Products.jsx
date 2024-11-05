import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../api/api.js';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

function Products() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const closeSidebar = () => { setIsSidebarOpen(false); };
  const [fetchProductsData, setfetchProductsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/fetchProducts');
        setfetchProductsData(response.data);
      } catch (error) {
        console.log("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);  

  const addProduct = async () => {
    navigate('/dashboard/products/addProduct');
  };

  const handleEdit = (row) => {
    const productId = row._id;
    navigate(`/dashboard/products/updateProduct/${productId}`);
  };

  const handleDelete = async (ProductId) => {
    try {
      const response = await api.delete('/api/deleteProduct', { params: { ProductId } });
      setfetchProductsData(fetchProductsData.filter(product => product.productId !== ProductId));
      toast.success(response.data.message);

      const reFetchProducts = await api.get('/api/fetchProducts');
      setfetchProductsData(reFetchProducts.data);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product, try checking browser console.');
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
                <h6 className="text-xl font-semibold">Products</h6>
                <button className="text-sm font-semibold text-white bg-[#2f456a] px-5 py-2 rounded-lg hover:bg-[#1d2c44] hover:shadow-lg transform hover:scale-105 transition-transform duration-300" onClick={addProduct}>
                  Add Product
                </button>
              </div>

              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <DataTable
                    columns={[
                      // {
                      //   name: 'Images',
                      //   selector: row => {
                      //     const hasImage = Array.isArray(row.images) && row.images.length > 0 && row.images[0].imageName;
                      //     return hasImage ? (
                      //       <div className="h-10 w-10 rounded-full">
                      //         <img src={`/uploads/product_images/${row.images[0].imageName}`}/>
                      //       </div>
                      //     ) : (
                      //       "No Image"
                      //     );
                      //   },
                      //   sortable: false,
                      //   center: true.toString(),
                      //   wrap: true,
                      // },                                      
                      {
                        name: 'Name',
                        selector: row => row.name,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Color',
                        selector: row => Array.isArray(row.color) && row.color.length > 0 && row.color[0] !== 'null' ? row.color[0] : 'N/A',
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Size',
                        selector: row => Array.isArray(row.size) && row.size.length > 0 && row.size[0] !== 'null' ? row.size[0] : 'N/A',
                        sortable: true,
                        wrap: true,
                      },
                      
                      {
                        name: 'Tags',
                        selector: row => row.tags && row.tags.length > 0 ? row.tags[0] : 'N/A',
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Stock',
                        selector: row => row.stock && row.stock.length > 0 ? row.stock[0] : 'N/A',
                        sortable: true,
                        wrap: true,
                      },                     
                      {
                        name: 'Category',
                        selector: row => row.category,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Discount',
                        selector: row => row.discount && row.discount.length > 0 ? row.discount[0] : 'N/A',
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Status',
                        selector: row => row.status,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'New Price',
                        selector: row => row.newPrice,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Old Price',
                        selector: row => row.oldPrice && row.oldPrice.length > 0 ? row.oldPrice[0] : 'N/A',
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Short Description',
                        selector: row => row.shortDescription,
                        sortable: true,
                        // wrap: true,
                      },
                      {
                        name: 'Long Description',
                        selector: row => row.longDescription,
                        sortable: true,
                        // wrap: true,
                      },
                      {
                        name: 'Date Added',
                        // selector: row => row.dateAdded ? new Date(row.dateAdded).toLocaleDateString() : 'No Date',
                        selector: row => new Date(row.dateAdded).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true, // This makes it 12-hour format (AM/PM). Set to false for 24-hour format.
                        }),
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
                    data={fetchProductsData}
                    fixedHeader
                    fixedHeaderScrollHeight="700px"
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
  );
};

export default Products;
