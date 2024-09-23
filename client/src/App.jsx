import { createBrowserRouter, RouterProvider, Outlet, createRoutesFromElements, Route, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Website 
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import About from "./pages/ecommerce/About/About";
import Cart from "./pages/ecommerce/Cart/Cart";
import Contact from "./pages/ecommerce/Contact/Contact";
import Home from "./pages/ecommerce/Home/Home";
import Offer from "./pages/ecommerce/Offer/Offer";
import Payment from "./pages/ecommerce/payment/Payment";
import ProductDetails from "./pages/ecommerce/ProductDetails/ProductDetails";
import ProductDetails1 from "./pages/ecommerce/ProductDetails/ProductDetails1";
import Shop from "./pages/ecommerce/Shop/Shop";
import SignIn from "./pages/ecommerce/Account/SignIn";
import SignUp from "./pages/ecommerce/Account/SignUp";
import Reset from "./pages/ecommerce/Account/Reset";
// Dashboard
import DashboardHome from './pages/dashboard/Home/Home';

// User management
import UserManagement from "./pages/dashboard/UserManagement/UserManagement";
import UserProfile from './pages/dashboard/UserManagement/UserProfile';

// Categories management
import Categories from './pages/dashboard/Categories/Categories';
import AddCategory from "./pages/dashboard/Categories/AddCategory";

// Products management
import Products from './pages/dashboard/Products/Products';
import AddProduct from "./pages/dashboard/Products/AddProduct";

// Orders management
import Orders from './pages/dashboard/Orders/Orders';

// Sales management
import Sales from './pages/dashboard/Sales/Sales';

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      {/* <SpecialCase /> */}
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Website Routes */}
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/products" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category" element={<Offer />}></Route>
        {/* <Route path="/product/:_id" element={<ProductDetails />}></Route> */}
        <Route path="/product/:_id" element={<ProductDetails1 />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      {/* Auth Routes */}
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/reset" element={<Reset />}></Route>
      {/* Dashboard Routes */}
      <Route path="/dashboard/home" element={<DashboardHome />}></Route>

      {/* User management routes */}
      <Route path="/dashboard/userManagement" element={<UserManagement />}></Route>
      <Route path="/dashboard/userManagement/userProfile/:userId" element={<UserProfile />}></Route>

      {/* Categories management routes */}
      <Route path="/dashboard/categories" element={<Categories />}></Route>
      <Route path="/dashboard/categories/addCategory" element={<AddCategory />}></Route>

      {/* Products management routes */}
      <Route path="/dashboard/products" element={<Products />}></Route>
      <Route path="/dashboard/products/addProduct" element={<AddProduct />}></Route>

      {/* Orders management routes */}
      <Route path="/dashboard/orders" element={<Orders />}></Route>
      
      {/* Sales management routes */}
      <Route path="/dashboard/sales" element={<Sales />}></Route>
    </Route>
  )
);

function App() {
  // const PageTitle = ({ title }) => {
  //     React.useEffect(() => {
  //       document.title = title;
  //     }, [title]);
  //     return null;
  //   };
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './Components/Auth/Register';
// import Login from './Components/Auth/Login';
// import ResetPassword from './Components/Auth/Reset';
// import AdminDashboard from './Components/Dashboard/AdminDashboard/AdminDashboard';
// import Reports from './Components/Dashboard/AdminDashboard/Reports';
// import UserManagement from './Components/Dashboard/AdminDashboard/UserManagement';
// import UserDashboard from './Components/Dashboard/UserDashboard/UserDashboard';
// import UserProfile from './Components/Dashboard/AdminDashboard/UserProfile';
// // import api from './utils/api';
// // import tokenExpiryCheck from './utils/tokenExpiryCheck';

// function App() {
//   const PageTitle = ({ title }) => {
//     React.useEffect(() => {
//       document.title = title;
//     }, [title]);
//     return null;
//   };
//   // tokenExpiryCheck();
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<><PageTitle title="Login | Pronet" /><Login /></>}/>

//         <Route path='/Register'element={<><PageTitle title="Register | Pronet" /><Register /></>}/>

//         <Route path='/ResetPassword' element={<><PageTitle title="Reset Password | Pronet" /><ResetPassword /></>}/>

//         <Route path='/Admin'element={<><PageTitle title="Admin Dashboard | Pronet" /><AdminDashboard /></>}/>

//         <Route path='/User' element={<><PageTitle title="User Dashboard | Pronet" /><UserDashboard /></>}/>

//         <Route path='/UserManagement' element={<><PageTitle title="User Management | Pronet" /><UserManagement /></>}/>
        
//         <Route path='/UserManagement/CreateNew' element={<> <PageTitle title="Create New User | Pronet" /><Register /></>}/>

//         <Route path='/UserManagement/UserProfile/:userId' element={<><PageTitle title="User Profile | Pronet" /><UserProfile /></>}/>

//         <Route path='/Reports' element={<><PageTitle title="Reports | Pronet" /><Reports /></>}/>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
