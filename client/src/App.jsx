import React, {useState, useEffect} from "react";
import { createBrowserRouter, RouterProvider, Outlet, createRoutesFromElements, Route, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from './pages/ecommerce/Loader/loader';

// ================= Website Home =====================
import Home from "./pages/ecommerce/Home/Home";
// ================= Navbar =====================
import Navbar from "./pages/ecommerce/Navbar/Navbar";
import NavbarBottom from "./pages/ecommerce/Navbar/NavbarBottom";
// ================= Footer =====================
import Footer from "./pages/ecommerce/Footer/Footer";
import FooterBottom from "./pages/ecommerce/Footer/FooterBottom";
// ================= About =====================
import About from "./pages/ecommerce/About/About";
// ================= Contact =====================
import Contact from "./pages/ecommerce/Contact/Contact";
// ================= Cart =====================
import Cart from "./pages/ecommerce/Cart/Cart";
// ================= Checkout Form =====================
import CheckoutForm from "./pages/ecommerce/CheckoutForm/CheckoutForm";
// ================= Payment =====================
import Payment from "./pages/ecommerce/payment/Payment";
// ================= Thankyou =====================
import Thankyou from "./pages/ecommerce/Thankyou/Thankyou";
// ================= Products =====================
import Product from "./pages/ecommerce/Products/Products";
import ProductDetails from "./pages/ecommerce/Products/ProductDetails";
// ================= Account =====================
import SignIn from "./pages/ecommerce/Account/SignIn";
import SignUp from "./pages/ecommerce/Account/SignUp";
import Reset from "./pages/ecommerce/Account/Reset";
import PrivacyPolicy from "./pages/ecommerce/PrivacyPolicy/PrivacyPolicy";

// ================= Dashboard =====================
// import DashboardHome from './pages/dashboard/Home/Home';
// ================= User management =====================
import UserManagement from "./pages/dashboard/UserManagement/UserManagement";
import UserProfile from './pages/dashboard/UserManagement/UserProfile';
// ================= Categories management =====================
import Categories from './pages/dashboard/Categories/Categories';
import AddCategory from "./pages/dashboard/Categories/AddCategory";
import UpdateCategory from './pages/dashboard/Categories/UpdateCategory';
// ================= Products management =====================
import Products from './pages/dashboard/Products/Products';
import AddProduct from "./pages/dashboard/Products/AddProduct";
import UpdateProduct from './pages/dashboard/Products/UpdateProduct';
// ================= Orders management =====================
import Orders from "./pages/dashboard/Orders/Orders";

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
        <Route path="/checkout" element={<><PageTitle title="Nayab Fashion - CheckoutForm" /><CheckoutForm /></>} />
        <Route path="/paymentgateway" element={<><PageTitle title="Nayab Fashion - Payment" /><Payment /></>} />
        <Route path="/thankyou" element={<><PageTitle title="Nayab Fashion - Thankyou" /><Thankyou /></>} />
      </Route>
      {/* Auth Routes */}
      <Route path="/signin" element={<><PageTitle title="Nayab Fashion - Sign In" /><SignIn /></>} />
      <Route path="/signup" element={<><PageTitle title="Nayab Fashion - Sign Up" /><SignUp /></>} />
      <Route path="/reset" element={<><PageTitle title="Nayab Fashion - Reset Password" /><Reset /></>} />
      <Route path="/signup/privacy-policy" element={<><PageTitle title="Nayab Fashion - Privacy Policy" /><PrivacyPolicy /></>} />
      {/* Dashboard Routes */}
      {/* <Route path="/dashboard/home" element={<><PageTitle title="Nayab Fashion - Dashboard" /><DashboardHome /></>} /> */}
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
      }, 3000);
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
