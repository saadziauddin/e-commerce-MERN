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
        <Route index element={<><PageTitle title="Nayab Fashion - Best Ecommerce Store in Pakistan" /><Home /></>} />
        <Route path="/products" element={<><PageTitle title="Nayab Fashion - Products" /><Product /></>} />
        <Route path="/about" element={<><PageTitle title="Nayab Fashion - About" /><About /></>} />
        <Route path="/contact" element={<><PageTitle title="Nayab Fashion - Contact" /><Contact /></>} />
        
        <Route path="/category/:category" element={<><PageTitle title="Nayab Fashion - Offer" /><Offer /></>} />
        <Route path="/product/:id" element={<><PageTitle title="Nayab Fashion - Product Details" /><ProductDetails /></>} />
        <Route path="/cart" element={<><PageTitle title="Nayab Fashion - Cart" /><Cart /></>} />
        <Route path="/paymentgateway" element={<><PageTitle title="Nayab Fashion - Payment" /><Payment /></>} />
      </Route>
      {/* Auth Routes */}
      <Route path="/signin" element={<><PageTitle title="Nayab Fashion - Sign In" /><SignIn /></>} />
      <Route path="/signup" element={<><PageTitle title="Nayab Fashion - Sign Up" /><SignUp /></>} />
      <Route path="/reset" element={<><PageTitle title="Nayab Fashion - Reset Password" /><Reset /></>} />
      {/* Dashboard Routes */}
      <Route path="/dashboard/home" element={<><PageTitle title="Nayab Fashion - Dashboard" /><DashboardHome /></>} />
      {/* User management routes */}
      <Route path="/dashboard/userManagement" element={<><PageTitle title="Nayab Fashion - User Management" /><UserManagement /></>} />
      <Route path="/dashboard/userManagement/userProfile/:userId" element={<><PageTitle title="Nayab Fashion - Edit User" /><UserProfile /></>} />
      {/* Categories management routes */}
      <Route path="/dashboard/categories" element={<><PageTitle title="Nayab Fashion - Categories" /><Categories /></>} />
      <Route path="/dashboard/categories/addCategory" element={<><PageTitle title="Nayab Fashion - Add Category" /><AddCategory /></>} />
      <Route path="/dashboard/categories/updateCategory/:categoryId" element={<><PageTitle title="Nayab Fashion - Update Category" /><UpdateCategory /></>} />
      {/* Products management routes */}
      <Route path="/dashboard/products" element={<><PageTitle title="Nayab Fashion - Products" /><Products /></>} />
      <Route path="/dashboard/products/addProduct" element={<><PageTitle title="Nayab Fashion - Add Product" /><AddProduct /></>} />
      <Route path="/dashboard/products/updateProduct/:productId" element={<><PageTitle title="Nayab Fashion - Update Product" /><UpdateProduct /></>} />
      {/* Orders management routes */}
      <Route path="/dashboard/orders" element={<><PageTitle title="Nayab Fashion - Orders" /><Orders /></>} />
      {/* Sales management routes */}
      <Route path="/dashboard/sales" element={<><PageTitle title="Nayab Fashion - Sales" /><Sales /></>} />
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
