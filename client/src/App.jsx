import { createBrowserRouter, RouterProvider, Outlet, createRoutesFromElements, Route, ScrollRestoration } from "react-router-dom";
// eCommerce
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import About from "./pages/eCommerce/About/About";
import Cart from "./pages/eCommerce/Cart/Cart";
import Contact from "./pages/eCommerce/Contact/Contact";
import Home from "./pages/eCommerce/Home/Home";
import Offer from "./pages/eCommerce/Offer/Offer";
import Payment from "./pages/eCommerce/payment/Payment";
import ProductDetails from "./pages/eCommerce/ProductDetails/ProductDetails";
import Shop from "./pages/eCommerce/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Dashboard
import Login from './pages/Dashboard/Auth/Login';
import Register from './pages/Dashboard/Auth/Register';
import ResetPassword from "./pages/Dashboard/Auth/Reset";
import Dashboard from './pages/Dashboard/AdminDashboard/AdminDashboard';
import UserManagement from "./pages/Dashboard/AdminDashboard/UserManagement";
import ReportsData from './pages/Dashboard/AdminDashboard/Reports';
import UserProfile from './pages/Dashboard/AdminDashboard/UserProfile';


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
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      {/* Dashboard Routes */}
      <Route path="/signin" element={<Login />}></Route>
      <Route path="/signup" element={<Register />}></Route>
      <Route path="/reset" element={<ResetPassword />}></Route>
      <Route path="/dashboard/home" element={<Dashboard />}></Route>
      <Route path="/dashboard/userManagement" element={<UserManagement />}></Route>
      <Route path="/dashboard/userManagement/userProfile/:userId" element={<UserProfile />}></Route>
      {/* /UserManagement/UserProfile/:userId */}
      <Route path="/dashboard/reports" element={<ReportsData />}></Route>
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
