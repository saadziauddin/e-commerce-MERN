import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBox, faPercent, faCartPlus, faSignOutAlt, faTimes, faList } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/images/website_images/nayabLogo1.png';
import api from '../../../Api/api.js';

function Sidebar({ isOpen, closeSidebar }) {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const result = await api.get('/api/signin');
        if (result.data.Status === "Success") {
          setRole(result.data.role);
        } else {
          console.error('Error fetching status: ', result.data);
        }
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        closeSidebar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  const logout = () => {
    api.get('/api/logout')
      .then(res => {
        navigate('/signin');
      })
      .catch(err => console.log(err));
  };

  return (
    <aside ref={sidebarRef} className={`fixed inset-y-0 my-4 ml-4 block w-64 flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-lg transition-transform duration-200 xl:left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}>

      <div className="flex justify-center items-center py-4">
        <NavLink to='/dashboard/home'>
          <img src="" className="h-16 w-auto" alt="main_logo" />
        </NavLink>
      </div>
      <hr className="h-px mt-0 mb-3 bg-gray-200" />
      <div className="items-center block w-auto max-h-screen h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-2 w-full">
            <NavLink to="/dashboard/home" className={({ isActive }) => `py-2.5 text-sm my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 transition-all ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-200 hover:text-black'}`}>
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          {role === "Admin" && (
            <>
              <li className="mt-2 w-full">
                <NavLink to="/dashboard/userManagement" className={({ isActive }) => `py-2.5 text-sm my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 transition-all ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-200 hover:text-black'}`}>
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  <span>User Management</span>
                </NavLink>
              </li>
            </>
          )}
          <li className="mt-2 w-full">
            <NavLink to="/dashboard/categories" className={({ isActive }) => `py-2.5 text-sm my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 transition-all ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-200 hover:text-black'}`}>
              <FontAwesomeIcon icon={faList} className="mr-2" />
              <span>Categories</span>
            </NavLink>
          </li>
          <li className="mt-2 w-full">
            <NavLink to="/dashboard/products" className={({ isActive }) => `py-2.5 text-sm my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 transition-all ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-200 hover:text-black'}`}>
              <FontAwesomeIcon icon={faBox} className="mr-2" />
              <span>Products</span>
            </NavLink>
          </li>
          <li className="mt-2 w-full">
            <NavLink to="/dashboard/sales" className={({ isActive }) => `py-2.5 text-sm my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 transition-all ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-200 hover:text-black'}`}>
              <FontAwesomeIcon icon={faPercent} className="mr-2" />
              <span>Sales</span>
            </NavLink>
          </li>
          <li className="mt-2 w-full">
            <NavLink to="/dashboard/orders" className={({ isActive }) => `py-2.5 text-sm my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 transition-all ${isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-200 hover:text-black'}`}>
              <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
              <span>Orders</span>
            </NavLink>
          </li>
          <li className="mt-2 w-full">
            <NavLink to="#" onClick={logout} className="py-2.5 text-sm my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 transition-all text-gray-600 hover:bg-gray-200 hover:text-black">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center w-full p-4 absolute bottom-0 right-0 cursor-pointer text-xl hover:text-slate-500 hover:bg-gray-100 text-gray-700 xl:hidden" onClick={closeSidebar}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </aside>
  );
}

export default Sidebar;
