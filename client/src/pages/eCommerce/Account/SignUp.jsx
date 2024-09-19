import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faImage, faExclamationCircle, faUserTag, faLongArrowAltLeft, faAddressBook, faAddressCard, faCity, faEarth, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import '../../../assets/css/style.css';
import api from '../../../Api/api.js';
import LottieAnimation from "../../../assets/animations/LottieAnimation";
import animationData from "../../../assets/animations/SignUpAnimation2.json";
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', country: '', postalCode: '', password: '', confirmPassword: '', contactNo: '', userRole: '', profileImage: '' });
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/Roles');
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles in register form: " + error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const formData = new FormData();
    
    for (let key in values) {
      formData.append(key, values[key]);
    }
    try {
      await api.post('/Register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNo: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        userRole: '',
        profileImage: ''
      });
      window.alert('Registration successful!');
      navigate('/signin');

    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        window.alert(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  const backToHome = () => {
    navigate('/')
  };

  const validate = () => {
    let errors = {};
    let isValid = true;
    if (!values.firstName || values.firstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters";
      isValid = false;
    }
    if (!values.lastName || values.lastName.length < 3) {
      errors.lastName = "Last name must be at least 3 characters";
      isValid = false;
    }
    if (!values.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email";
      isValid = false;
    }
    if (!values.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (values.password.length < 8 || !/(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}/.test(values.password)) {
      errors.password = "Password must be at least 8 characters long and include at least one uppercase letter and one number";
      isValid = false;
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!values.contactNo) {
      errors.contactNo = "Phone number is required";
      isValid = false;
    } else if (!/^\+92\d{3}\d{7}$/.test(values.contactNo)) {
      errors.contactNo = "Invalid phone number (Format: +92XXXXXXXXXX)";
      isValid = false;
    }
    if (!values.address) {
      errors.address = "Address is required";
      isValid = false;
    }
    if (!values.city) {
      errors.city = "City is required";
      isValid = false;
    }
    if (!values.country) {
      errors.country = "Country is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleSignUp = () => {
    handleSubmit();
  };

  return (
    <div className="w-full h-full mt-10 flex flex-col lgl:flex-row items-center justify-between">
      {/* Form Section */}
      <div className="w-full lgl:w-[50%] px-6 lg:px-36 py-10 lgl:py-0 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
          <h1 className="font-titleFont font-medium text-3xl mdl:text-3xl mb-6">
            Create Your Account
          </h1>

          {/* First Name */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">First Name*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                className="w-4/5 rounded-xl pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:border-primeColor "
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Last Name*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl  focus:outline-none focus:border-primeColor"
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Email*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl  focus:outline-none focus:border-primeColor"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Phone Number*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="tel"
                name="contactNo"
                value={values.contactNo}
                onChange={handleChange}
                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl  focus:outline-none focus:border-primeColor"
                placeholder="eg. 123-456-7890"
              />
            </div>
            {errors.contactNo && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.contactNo}</p>}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Address*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faAddressCard} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                className="w-4/5 rounded-xl pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:border-primeColor "
                placeholder="Enter your address"
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.address}</p>}
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">City*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faCity} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="city"
                value={values.city}
                onChange={handleChange}
                className="w-4/5 rounded-xl pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:border-primeColor "
                placeholder="Enter your city"
              />
            </div>
            {errors.city && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.city}</p>}
          </div>

          {/* Country */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Country*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEarth} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="country"
                value={values.country}
                onChange={handleChange}
                className="w-4/5 rounded-xl pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:border-primeColor "
                placeholder="Enter your country"
              />
            </div>
            {errors.country && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.country}</p>}
          </div>

          {/* Zip/Postal Code */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Zip/Postal Code (Optional)</label>
            <div className="relative">
              <FontAwesomeIcon icon={faAddressCard} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="postalCode"
                value={values.postalCode}
                onChange={handleChange}
                className="w-4/5 rounded-xl pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:border-primeColor "
                placeholder="Enter your Zip/Postal Code"
              />
            </div>
            {errors.postalCode && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.postalCode}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Password*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                onChange={handleChange}
                value={values.password}
                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl  focus:outline-none focus:border-primeColor"
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Confirm Password*</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                onChange={handleChange}
                value={values.confirmPassword}
                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl  focus:outline-none focus:border-primeColor"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.confirmPassword}</p>}
          </div>

          {/* User Role */}
          {/* <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">User Role (Optional)</label>
            <div className="relative">
              <FontAwesomeIcon icon={faUserTag} className="absolute left-3 top-3.5 text-gray-400" />
              <select
                onChange={handleChange}
                value={values.userRole}
                className="pl-10 pr-3 py-2 border border-gray-300 w-4/5 rounded-xl  focus:outline-none focus:border-primeColor"
                name="userRole"
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.userRole && <p className="text-red-500 text-sm mt-1"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.userRole}</p>}
          </div> */}

          {/* Profile Image */}
          <div className="mb-3">
            <label className="text-gray-600 ml-2 mb-1 font-titleFont font-medium">Profile Image (Optional)</label>
            <div className="relative">
              <FontAwesomeIcon icon={faImage} className="absolute left-3 top-3.5 text-gray-400" />
              <label className="w-4/5 py-2 border border-gray-300 rounded-xl flex items-center bg-white cursor-pointer pl-10 pr-3 focus:outline-none focus:border-primeColor">
                <input
                  onChange={handleFileChange}
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                />
                <span className="text-gray-500">{values.image ? values.image.name : 'Select Profile Image'}</span>
              </label>
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">
                <FontAwesomeIcon icon={faExclamationCircle} /> {errors.profileImage}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2 mb-3">
            <input
              onChange={() => setChecked(!checked)}
              className="w-3 h-3 mt-1 text-md cursor-pointer rounded-3xl"
              type="checkbox"
            />
            <p className="text-sm text-primeColor">
              I agree to the Nayab Fashion{" "}
              <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{" "}
              <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
            </p>
          </div>

          <button
            onClick={handleSignUp}
            className={`${checked
              ? "bg-[#7b246d] hover:bg-slate-500 hover:text-white hover:border-none cursor-pointer"
              : "bg-gray-500 hover:bg-gray-500 hover:text-white cursor-not-allowed"
              } text-white py-2 mt-4 mb-5 w-4/5 rounded-xl text-base font-medium duration-300`}
            disabled={!checked}
          >
            Create Account
          </button>

          <p className="text-gray-600 text-sm text-center mb-10 w-4/5">
            Already have an account?{' '}
            <Link to="/signin" className="text-primeColor font-medium hover:text-blue-600 duration-300">
              Sign in
            </Link>
          </p>

          {/* Back Button */}
          {/* <div className="text-center">
            <button
              onClick={backToHome}
              className="flex items-center justify-center bg-gray-200 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primeColor"
            >
              <FontAwesomeIcon icon={faLongArrowAltLeft} className="mr-2" />
              Back to Home
            </button>
          </div> */}
        </form>
      </div>

      {/* Animation Section */}
      <div className="w-0 lgl:w-[50%] h-full flex items-center justify-center mb-[25%]">
        <LottieAnimation animationData={animationData} loop={true} autoplay={true} />
      </div>
    </div>
  );
}

export default SignUp;
