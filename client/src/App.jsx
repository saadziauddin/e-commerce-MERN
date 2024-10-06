import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, createRoutesFromElements, Route, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ================= Website =====================
import Home from "./components/ecommerce/Home/Home";
// ================= Footer =====================
import Footer from "./components/ecommerce/Home/Footer/Footer";
import FooterBottom from "./components/ecommerce/Home/Footer/FooterBottom";
// ================= Header =====================
import Header from "./components/ecommerce/Home/Header/Header";
import HeaderBottom from "./components/ecommerce/Home/Header/HeaderBottom";
// ================= About =====================
import About from "./components/ecommerce/About/About";
// ================= Cart =====================
import Cart from "./components/ecommerce/Cart/Cart";
// ================= Contact =====================
import Contact from "./components/ecommerce/Contact/Contact";
// ================= Offer =====================
import Offer from "./components/ecommerce/Products/Offer/Offer";
// ================= Payment =====================
import Payment from "./components/ecommerce/payment/Payment";
// ================= Products =====================
import Product from "./components/ecommerce/Products/Products";
import ProductDetails from "./components/ecommerce/Products/ProductDetails";
// ================= Account =====================
import SignIn from "./components/ecommerce/Account/SignIn";
import SignUp from "./components/ecommerce/Account/SignUp";
import Reset from "./components/ecommerce/Account/Reset";


// ================= Dashboard =====================
import DashboardHome from './components/dashboard/Home/Home';
// ================= User management =====================
import UserManagement from "./components/dashboard/UserManagement/UserManagement";
import UserProfile from './components/dashboard/UserManagement/UserProfile';
// ================= Categories management =====================
import Categories from './components/dashboard/Categories/Categories';
import AddCategory from "./components/dashboard/Categories/AddCategory";
import UpdateCategory from './components/dashboard/Categories/UpdateCategory';
// ================= Products management =====================
import Products from './components/dashboard/Products/Products';
import AddProduct from "./components/dashboard/Products/AddProduct";
import UpdateProduct from './components/dashboard/Products/UpdateProduct';
// ================= Orders management =====================
import Orders from './components/dashboard/Orders/Orders';
// ================= Sales management =====================
import Sales from './components/dashboard/Sales/Sales';

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

const PageTitle = ({ title }) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Website Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<><PageTitle title="" /><Home /></>} />
        <Route path="/products" element={<><PageTitle title="" /><Product /></>} />
        <Route path="/about" element={<><PageTitle title="" /><About /></>} />
        <Route path="/contact" element={<><PageTitle title="" /><Contact /></>} />
        
        <Route path="/category/:category" element={<><PageTitle title="" /><Offer /></>} />
        <Route path="/product/:id" element={<><PageTitle title="" /><ProductDetails /></>} />
        <Route path="/cart" element={<><PageTitle title="" /><Cart /></>} />
        <Route path="/paymentgateway" element={<><PageTitle title="" /><Payment /></>} />
      </Route>
      {/* Auth Routes */}
      <Route path="/signin" element={<><PageTitle title="" /><SignIn /></>} />
      <Route path="/signup" element={<><PageTitle title="" /><SignUp /></>} />
      <Route path="/reset" element={<><PageTitle title="" /><Reset /></>} />
      {/* Dashboard Routes */}
      <Route path="/dashboard/home" element={<><PageTitle title="" /><DashboardHome /></>} />
      {/* User management routes */}
      <Route path="/dashboard/userManagement" element={<><PageTitle title="" /><UserManagement /></>} />
      <Route path="/dashboard/userManagement/userProfile/:userId" element={<><PageTitle title="" /><UserProfile /></>} />
      {/* Categories management routes */}
      <Route path="/dashboard/categories" element={<><PageTitle title="" /><Categories /></>} />
      <Route path="/dashboard/categories/addCategory" element={<><PageTitle title="" /><AddCategory /></>} />
      <Route path="/dashboard/categories/updateCategory/:categoryId" element={<><PageTitle title="" /><UpdateCategory /></>} />
      {/* Products management routes */}
      <Route path="/dashboard/products" element={<><PageTitle title="" /><Products /></>} />
      <Route path="/dashboard/products/addProduct" element={<><PageTitle title="" /><AddProduct /></>} />
      <Route path="/dashboard/products/updateProduct/:productId" element={<><PageTitle title="" /><UpdateProduct /></>} />
      {/* Orders management routes */}
      <Route path="/dashboard/orders" element={<><PageTitle title="" /><Orders /></>} />
      {/* Sales management routes */}
      <Route path="/dashboard/sales" element={<><PageTitle title="" /><Sales /></>} />
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
