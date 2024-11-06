import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Constants/Topbar.jsx';
import Sidebar from '../Constants/Sidebar.jsx';
import api from '../../../api/api.js';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

function UserManagement() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    // setIsSidebarOpen(!isSidebarOpen);
    setIsSidebarOpen(prevState => !prevState);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const [fetchUsersData, setFetchUsersData] = useState([]);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const result = await api.get('/api/signin');
        if (result.data.Status === "Success") {
          setUserRole(result.data.role);
        }
      } catch (error) {
        console.log("Error fetching logged-in user data: ", error);
        navigate('/signin');
      }
    };
    fetchLoggedUser();
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await api.get('/api/getUser');
        setFetchUsersData(result.data);
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsersData = fetchUsersData.filter(user => {
    // If the logged-in user is SubAdmin, exclude administrators from the list
    if (userRole === 'SubAdmin') {
      return user.role !== 'Admin';
    }
    return true; // Otherwise, return all users
  });

  const addUser = async () => {
    navigate('/signup');
  };

  const handleEdit = (row) => {
    const userId = row._id;
    navigate(`/dashboard/userManagement/userProfile/${userId}`);
  };

  const handleDelete = async (UserId) => {
    try {
      const response = await api.delete('/api/deleteUser', {
        params: { UserId }
      });
      setFetchUsersData(fetchUsersData.filter(user => user.UserId !== UserId));
      toast.success(response.data.message);

      const result = await api.get('/api/getUser');
      setFetchUsersData(result.data);

    } catch (error) {
      console.error('Error deleting user:', error);
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
        theme='colored'
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 z-50 left-0 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>

      {/* Main */}
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full transition-all duration-200 bg-light">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />
        {/* Table */}
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex justify-between items-center p-6 pb-0 mb-3 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 className="text-xl font-semibold">User Management</h6>

                <button className="text-sm font-semibold text-white bg-[#2f456a] px-5 py-2 rounded-lg hover:bg-[#1d2c44] hover:shadow-lg transform hover:scale-105 transition-transform duration-300" onClick={addUser}>
                  Add User
                </button>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <DataTable
                    columns={[
                      {
                        name: 'Profile Image',
                        cell: row => {
                          const profileImage =
                            row.profileImage && row.profileImage[0] && row.profileImage[0].imageName
                              ? `${apiUrl}/uploads/user_images/${row.profileImage[0]?.imageName}`
                              : `${apiUrl}/default_images/default_profile.png`;

                          return (
                            <div>
                              <img
                                src={profileImage}
                                alt="User Image"
                                className="h-10 w-10 rounded-full"
                              />
                            </div>
                          );
                        },
                        sortable: false,
                        center: true,
                        wrap: true,
                      },
                      {
                        name: 'Full name',
                        selector: row => row.fullName,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Email',
                        selector: row => row.email,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Contact No',
                        selector: row => row.contactNo,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Address',
                        selector: row => row.address,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'City',
                        selector: row => row.city,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Country',
                        selector: row => row.country,
                        sortable: true,
                        wrap: true,
                      },
                      {
                        name: 'Zip/Postal Code',
                        selector: row => row.postalCode,
                        sortable: true,
                        wrap: true,
                      },
                      ...(userRole !== 'SubAdmin' ? [
                        {
                          name: 'Role',
                          selector: row => row.role,
                          sortable: true,
                          wrap: true,
                        }
                      ] : []),
                      ...(userRole !== 'SubAdmin' ? [
                        {
                          name: 'Date Created',
                          selector: row => new Date(row.dateOfCreation).toLocaleString('en-US', {
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
                      ] : []),
                      {
                        name: 'Actions',
                        cell: row => (
                          <div className='flex justify-center space-x-4'>
                            <button className='hover:text-blue-800 hover:font-semibold' onClick={() => handleEdit(row)}><FontAwesomeIcon icon={faEdit} /></button>
                            <button className='hover:text-rose-800 hover:font-extrabold' onClick={() => handleDelete(row._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                          </div>
                        ),
                        sortable: false,
                        center: true,
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
                    data={filteredUsersData}
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 50, 100]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserManagement;
