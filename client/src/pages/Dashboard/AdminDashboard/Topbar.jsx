import React, { useState, useEffect } from 'react';
import api from '../Api/api.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

function Topbar({ toggleSidebar }) {
  const [name, setName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen); };
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/signin')
      .then(res => {
        if (res.data.Status === "Success") {
          setName(res.data.name);
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [navigate]);

  const Logout = () => {
    api.get('/Logout')
      .then(res => {
        navigate('/');
      })
      .catch(err => console.log(err));
  };
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 my-4 shadow-md rounded-md">
      <div className="flex items-center justify-between w-full px-4 py-1 mx-auto">
        <div>
          <h1 className="font-semibold uppercase m-auto text-gray-700">Dashboard</h1>
        </div>

        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4"></div>
          <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
            <li className="relative">
              <button id="dropdownNavbarLink" onClick={toggleDropdown} className="pl-3 pr-4 py-2 text-gray-700  md:hover:text-slate-500 md:p-0 justify-between w-full md:w-auto items-center block px-0 font-semibold transition-all ease-nav-brand">
                Hi, {name}
              </button>
              <div id="dropdownNavbar" className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44`} >
                <ul className="py-1 rounded-lg" aria-labelledby="dropdownNavbarLink">
                  <li className="text-md text-center w-full font-semibold hover:text-slate-500 hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    <button onClick={Logout}>Logout!</button>
                  </li>
                </ul>
              </div>
            </li>
            <button onClick={toggleSidebar} className="block xl:hidden px-1 pl-3 focus:outline-none transition-all text-gray-700 hover:text-slate-500 text-xl">
              <FontAwesomeIcon icon={faBarsStaggered} />
            </button>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Topbar;
