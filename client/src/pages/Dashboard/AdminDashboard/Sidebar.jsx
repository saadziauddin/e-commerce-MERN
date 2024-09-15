import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUser, faChartLine, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/webImages/nayabLogo1.png';
import api from '../Api/api.js';

function Sidebar({ isOpen, closeSidebar }) {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const result = await api.get('/signin');

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
  
  return (
    <aside className={`fixed inset-y-0 my-4 ml-4 block w-64 flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-lg transition-transform duration-200 xl:left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}>
      <div className="flex justify-center items-center py-4">
        {/* {role === "Admin" ?  */}
          <NavLink to={'/dashboard/home'}>
            <img src={logo} className="h-18 w-30 ease-nav-brand" alt="main_logo" />
          </NavLink>
        {/* :
          <NavLink to={'/User'}>
            <img src="" className="h-14 w-30 ease-nav-brand" alt="main_logo" />
          </NavLink>
        } */}
      </div>
      <hr className="h-px mt-0 mb-3 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <div className="items-center block w-auto max-h-screen h-sidenav grow basis-full">
        {/* {role === "Admin" ? */}
          <ul className="flex flex-col pl-0 mb-0">
            <li className="mt-0.5 w-full">
              <NavLink to="/dashboard/home"
                className={({ isActive }) => `group py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-all 
                  ${isActive ? 'bg-gradient-to-r from-pink-500 to-[#8f4783] text-white' : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-[#8f4783] hover:to-pink-500 hover:text-white'}`} >
                {({ isActive }) => (
                  <>
                    <div className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 
                      ${isActive ? 'bg-gradient-to-tl from-[#b958a984] to-pink-500 shadow-soft-2xl text-white' : 'bg-gradient-to-tl from-pink-500 to-[#8f4783] shadow-soft-2xl'}`}>
                      <FontAwesomeIcon icon={faHome} className={`${isActive ? 'text-white' : 'text-white group-hover:text-slate-700'}`} />
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="mt-0.5 w-full">
              {<NavLink to="/dashboard/userManagement"></NavLink> ?
                <NavLink to="/dashboard/userManagement"
                  className={({ isActive }) => `group py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-all 
                    ${isActive ? 'bg-gradient-to-r from-pink-500 to-[#8f4783] text-white' : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-[#8f4783] hover:to-pink-500 hover:text-white'}`} >
                  {({ isActive }) => (
                    <>
                      <div className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 
                        ${isActive ? 'bg-gradient-to-tl from-[#b958a984] to-pink-500 shadow-soft-2xl text-white' : 'bg-gradient-to-tl from-pink-500 to-[#8f4783] shadow-soft-2xl'}`}>
                        <FontAwesomeIcon icon={faUsers} className={`${isActive ? 'text-white' : 'text-white group-hover:text-slate-700'}`} />
                      </div>
                      <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">User Management</span>
                    </>
                  )}
                </NavLink>
              :
                <NavLink to="/dashboard/userManagement/userProfile"
                  className={({ isActive }) => `group py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-all 
                    ${isActive ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white' : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 hover:text-white'}`} >
                  {({ isActive }) => (
                    <>
                      <div className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 
                        ${isActive ? 'bg-gradient-to-tl from-red-600 to-pink-600 shadow-soft-2xl text-white' : 'bg-gradient-to-tl from-red-600 to-pink-600 shadow-soft-2xl'}`}>
                        <FontAwesomeIcon icon={faUsers} className={`${isActive ? 'text-white' : 'text-white group-hover:text-slate-700'}`} />
                      </div>
                      <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">User Profile</span>
                    </>
                  )}
                </NavLink>
              }
            </li>

            {/* <li className="mt-0.5 w-full">
              <NavLink to="/dashboard/reports"
                className={({ isActive }) => `group py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-all 
                  ${isActive ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white' : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 hover:text-white'}`} >
                {({ isActive }) => (
                  <>
                    <div className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 
                      ${isActive ? 'bg-gradient-to-tl from-red-600 to-pink-600 shadow-soft-2xl text-white' : 'bg-gradient-to-tl from-red-600 to-pink-600 shadow-soft-2xl'}`}>
                      <FontAwesomeIcon icon={faChartLine} className={`${isActive ? 'text-white' : 'text-white group-hover:text-slate-700'}`} />
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Reports</span>
                  </>
                )}
              </NavLink>
            </li> */}
          </ul>
        {/* :
          <ul className="flex flex-col pl-0 mb-0">
            <li className="mt-0.5 w-full">
            <NavLink to="/User"
              className={({ isActive }) => `group py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-all 
                ${isActive ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white' : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 hover:text-white'}`} >
              {({ isActive }) => (
                <>
                  <div className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 
                    ${isActive ? 'bg-gradient-to-tl from-red-600 to-pink-600 shadow-soft-2xl text-white' : 'bg-gradient-to-tl from-red-600 to-pink-600 shadow-soft-2xl'}`}>
                    <FontAwesomeIcon icon={faHome} className={`${isActive ? 'text-white' : 'text-white group-hover:text-slate-700'}`} />
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
                </>
              )}
            </NavLink>
            </li>

            <li className="mt-0.5 w-full">
              <NavLink to="/Reports"
                className={({ isActive }) => `group py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-all 
                  ${isActive ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' : 'bg-white text-slate-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white'}`} >
                {({ isActive }) => (
                  <>
                    <div className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 
                      ${isActive ? 'bg-gradient-to-tl from-red-600 to-pink-600 shadow-soft-2xl text-white' : 'bg-gradient-to-tl from-red-600 to-pink-600 shadow-soft-2xl'}`}>
                      <FontAwesomeIcon icon={faChartLine} className={`${isActive ? 'text-white' : 'text-white group-hover:text-slate-700'}`} />
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Reports</span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        } */}
      </div>

      <div className="flex justify-center items-center w-full p-4 absolute bottom-0 right-0 cursor-pointer text-xl hover:text-slate-500 hover:bg-gray-100 text-gray-700 xl:hidden" onClick={closeSidebar}>
        <FontAwesomeIcon icon={faTimes} />
      </div>

    </aside>
  );
}

export default Sidebar;
