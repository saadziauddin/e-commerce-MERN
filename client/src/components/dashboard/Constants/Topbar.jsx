// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
// import api from '../../../api/api.js';

// function Topbar({ toggleSidebar }) {
//   const [userId, setUserId] = useState('');
//   const [name, setName] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   useEffect(() => {
//     api.get('/api/signin')
//       .then(res => {
//         if (res.data.Status === "Success") {
//           setUserId(res.data.id);
//           console.log(res.data.id);
//           setName(res.data.name);
//         } else {
//           navigate('/');
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, [navigate]);

//   // const handleEdit = (row) => {
//   //   const userId = row._id;
//   //   navigate(`/dashboard/userManagement/userProfile/${userId}`);
//   // };

//   const handleEditProfile = (user) => {
//     const userId = user._id;
//     navigate(`/dashboard/userProfile/${userId}`);
//   };

//   const logout = () => {
//     api.get('/api/logout')
//       .then(res => {
//         navigate('/signin');
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <nav className="relative flex items-center justify-between px-6 py-2 mx-6 my-4 shadow-lg rounded-lg bg-white">
//       <div className="flex justify-between w-full items-center mx-auto">
//         <h1 className="text-gray-700 font-semibold uppercase">Dashboard</h1>

//         <div className="flex items-center">
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={toggleDropdown}
//               className="flex items-center text-gray-700 px-3 py-2 font-semibold font-bodyFont focus:outline-none hover:text-slate-500 transition-all"
//             >
//               Hi, {name}
//             </button>
//             <div
//               className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 bg-white font-normal shadow-lg rounded-lg w-32 z-10`}
//             >
//               <ul className="py-1">
//                 <li className="px-4 py-2 text-gray-800 text-center hover:bg-gray-100">
//                   <button onClick={handleEditProfile}>Edit Profile</button>
//                 </li>
//                 <li className="px-4 py-2 text-gray-800 text-center hover:bg-gray-100">
//                   <button onClick={logout}>Logout</button>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Sidebar toggle for mobile */}
//           <button onClick={toggleSidebar} className="ml-4 text-lg text-gray-700 hover:text-slate-500 transition-all xl:hidden focus:outline-none">
//             <FontAwesomeIcon icon={faBarsStaggered} />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Topbar;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import api from '../../../api/api.js';

function Topbar({ toggleSidebar }) {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    api.get('/api/signin')
      .then(res => {
        if (res.data.Status === "Success") {
          setUserId(res.data.id);
          console.log("User ID:", res.data.id);
          setName(res.data.name); 
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [navigate]);

  // const handleEditProfile = () => {
  //   navigate(`/dashboard/userProfile/${userId}`);
  // };

  const handleEditProfile = () => {
    console.log("User ID on edit profile:", userId); // Debugging
    if (userId) {
      navigate(`/dashboard/userProfile/${userId}`);
    } else {
      console.error("User ID is not defined");
    }
  };
  

  const logout = () => {
    api.get('/api/logout')
      .then(res => {
        navigate('/signin');
      })
      .catch(err => console.log(err));
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-2 mx-6 my-4 shadow-lg rounded-lg bg-white">
      <div className="flex justify-between w-full items-center mx-auto">
        <h1 className="text-gray-700 font-semibold uppercase">Dashboard</h1>

        <div className="flex items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-700 px-3 py-2 font-semibold font-bodyFont focus:outline-none hover:text-slate-500 transition-all"
            >
              Hello, {name}!
            </button>
            <div
              className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 bg-white font-normal shadow-lg rounded-md w-32 z-10`}
            >
              <ul className="py-1">
                <li className="px-3 py-2 hover:bg-gray-100 border-b">
                  <button className='text-gray-800' onClick={handleEditProfile}>Edit Profile</button>
                </li>
                <li className="px-3 py-2 hover:bg-gray-100">
                  <button className='text-gray-800' onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar toggle for mobile */}
          <button onClick={toggleSidebar} className="ml-4 text-lg text-gray-700 hover:text-slate-500 transition-all xl:hidden focus:outline-none">
            <FontAwesomeIcon icon={faBarsStaggered} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
