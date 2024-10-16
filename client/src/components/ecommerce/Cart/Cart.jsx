import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { resetCart, deleteItem, decreaseQuantity, increaseQuantity } from "../../../redux/reduxSlice";
import emptyCart from "../../../assets/images/website_images/emptyCart.png";
import { ImCross } from "react-icons/im";

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.reduxReducer.products);
  const [shippingCharge, setShippingCharge] = useState(0);

  const totalAmt = products.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    setShippingCharge(200); // Set fixed shipping for now
  }, [totalAmt]);

  return (
    <div className="max-w-container mx-auto px-4 py-8">
      <Breadcrumbs title="Shopping Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          {/* Cart Items - Mobile */}
          <div className="lg:hidden xl:hidden flex flex-col gap-6">
            {products.map((item) => (
              <div key={item._id} className="border border-gray-200 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105">
                <div className="flex items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded-md cursor-pointer"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800">{item.name || "N/A"}</h2>
                    <p className="text-md text-gray-500 mt-2">Size: {item.size || "N/A"}</p>
                    <p className="text-md text-gray-500 mt-2">Color: {item.color || "N/A"}</p>
                    <p className="text-lg font-bold text-gray-800 mt-2">Rs. {item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity({ _id: item._id, size: item.size, color: item.color }))
                      }
                      className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(increaseQuantity({ _id: item._id, size: item.size, color: item.color }))
                      }
                      className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(deleteItem({ _id: item._id, size: item.size, color: item.color }))}
                    className="text-red-400 hover:text-red-600 transition duration-200"
                  >
                    <ImCross />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Items - Desktop */}
          <div className="hidden lg:block xl:block">
            <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold text-gray-600 text-center">Image</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Product Name</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Size</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Color</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-center">Quantity</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Subtotal</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-center">
                      <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded-md cursor-pointer"/>
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4">{item.color}</td>
                    <td className="px-6 py-4">Rs. {item.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => dispatch(decreaseQuantity({ _id: item._id, size: item.size, color: item.color }))}
                          className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-300 transition"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity({ _id: item._id, size: item.size, color: item.color }))}
                          className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => dispatch(deleteItem({ _id: item._id, size: item.size, color: item.color }))}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <ImCross />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Totals */}
          <div className="flex justify-end mt-8">
            <div className="w-full md:w-96 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Totals</h2>
              <div className="space-y-3">
                <p className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">Rs. {totalAmt.toLocaleString()}</span>
                </p>
                <p className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Shipping</span>
                  <span className="font-bold">Rs. {shippingCharge}</span>
                </p>
                <p className="flex justify-between items-center text-gray-900 text-lg font-bold">
                  <span>Total</span>
                  <span>Rs. {(totalAmt + shippingCharge).toLocaleString()}</span>
                </p>
              </div>
              <Link to="/orderForm" className="mt-6 block">
                <button className="w-full py-3 bg-[#7b246d] text-white text-lg font-semibold rounded-lg hover:bg-black transition duration-300">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-6 py-16"
        >
          <img src={emptyCart} alt="emptyCart" className="w-80" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <button className="px-8 py-3 bg-[#7b246d] text-white rounded-lg hover:bg-black transition duration-300">
              Start Shopping
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default Cart;
