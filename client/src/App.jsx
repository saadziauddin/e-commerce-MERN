import React, {useState, useEffect} from "react";
import { createBrowserRouter, RouterProvider, Outlet, createRoutesFromElements, Route, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from './components/ecommerce/Loader/loader';

// ================= Website =====================
import Home from "./components/ecommerce/Home/Home";
// ================= Footer =====================
import Footer from "./components/ecommerce/Footer/Footer";
import FooterBottom from "./components/ecommerce/Footer/FooterBottom";
// ================= Navbar =====================
import Navbar from "./components/ecommerce/Navbar/Navbar";
import NavbarBottom from "./components/ecommerce/Navbar/NavbarBottom";
// ================= About =====================
import About from "./components/ecommerce/About/About";
// ================= Cart =====================
import Cart from "./components/ecommerce/Cart/Cart";
// ================= Contact =====================
import Contact from "./components/ecommerce/Contact/Contact";
// ================= Payment =====================
import Payment from "./components/ecommerce/payment/Payment";
// ================= Order Form =====================
import Order from "./components/ecommerce/Order/Order";
// ================= Products =====================
import Product from "./components/ecommerce/Products/Products";
import ProductDetails from "./components/ecommerce/Products/ProductDetails";
// ================= Account =====================
import SignIn from "./components/ecommerce/Account/SignIn";
import SignUp from "./components/ecommerce/Account/SignUp";
import Reset from "./components/ecommerce/Account/Reset";
import PrivacyPolicy from "./components/ecommerce/PrivacyPolicy/PrivacyPolicy";

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
import Orders from "./components/dashboard/Orders/Orders";

const Layout = () => {
  const [currency, setCurrency] = useState("PKR");

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

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
      <Navbar onCurrencyChange={handleCurrencyChange} />
      <NavbarBottom />
      <ScrollRestoration />
      <Outlet context={{ selectedCurrency: currency }} />
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
        <Route path="/product/:id" element={<><PageTitle title="Nayab Fashion - Product Details" /><ProductDetails /></>} />
        <Route path="/cart" element={<><PageTitle title="Nayab Fashion - Cart" /><Cart /></>} />
        <Route path="/order" element={<><PageTitle title="Nayab Fashion - Order" /><Order /></>} />
        <Route path="/paymentgateway" element={<><PageTitle title="Nayab Fashion - Payment" /><Payment /></>} />
      </Route>
      {/* Auth Routes */}
      <Route path="/signin" element={<><PageTitle title="Nayab Fashion - Sign In" /><SignIn /></>} />
      <Route path="/signup" element={<><PageTitle title="Nayab Fashion - Sign Up" /><SignUp /></>} />
      <Route path="/reset" element={<><PageTitle title="Nayab Fashion - Reset Password" /><Reset /></>} />
      <Route path="/signup/privacy-policy" element={<><PageTitle title="Nayab Fashion - Privacy Policy" /><PrivacyPolicy /></>} />
      {/* Dashboard Routes */}
      <Route path="/dashboard/home" element={<><PageTitle title="Nayab Fashion - Dashboard" /><DashboardHome /></>} />
      {/* User management routes */}
      <Route path="/dashboard/userManagement" element={<><PageTitle title="Nayab Fashion - User Management" /><UserManagement /></>} />
      <Route path="/dashboard/userManagement/userProfile/:userId" element={<><PageTitle title="Nayab Fashion - Edit User" /><UserProfile /></>} />
      <Route path="/dashboard/userProfile/:userId" element={<><PageTitle title="Nayab Fashion - Edit Profile" /><UserProfile /></>} />
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
    </Route>
  )
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Adjust the timeout as needed
    };

    handlePageLoad();

    // Attach the event listener
    window.addEventListener('load', handlePageLoad);

    // Clean up the event listener
    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="font-bodyFont">
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
};

export default App;
