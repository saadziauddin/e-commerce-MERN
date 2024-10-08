import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { resetCart } from "../../../redux/reduxSlice";
import emptyCart from "../../../assets/images/website_images/emptyCart.png";
import { ImCross } from "react-icons/im";
import { deleteItem, decreaseQuantity, increaseQuantity } from "../../../redux/reduxSlice";

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.reduxReducer.products);
  const [shippingCharge, setShippingCharge] = useState(0);

  const totalAmt = products.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    // if (totalAmt <= 200) {
    //   setShippingCharge(30);
    // } else if (totalAmt <= 400) {
    //   setShippingCharge(25);
    // } else {
    //   setShippingCharge(20);
    // }
    setShippingCharge(200);
  }, [totalAmt]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          {/* Cart Table */}
          <div className="overflow-x-auto mb-5 rounded-lg shadow-md">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="w-full bg-[#F5F7F7] text-[#7b246d] text-left text-sm uppercase border-b border-gray-200">
                  <th className="py-3 px-6 text-center">Image</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Size</th>
                  <th className="py-3 px-6">Color</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Quantity</th>
                  <th className="py-3 px-6">Sub Total</th>
                  <th className="py-3 px-6">Remove</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  // key={`${item._id}-${item.size}-${item.color}`}
                  <tr key={item._id} className="border-b border-gray-200">
                    <td className="py-4 px-6 text-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-4 px-6">{item.name || "N/A"}</td>
                    <td className="py-4 px-6">{item.size || "N/A"}</td>
                    <td className="py-4 px-6">{item.color || "N/A"}</td>
                    <td className="py-4 px-6">{item.category || "N/A"}</td>
                    <td className="py-4 px-6">PKR {item.price.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <div className="">
                        <button onClick={() => dispatch(decreaseQuantity({ _id: item._id, size: item.size, color: item.color }))} className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-300">
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button onClick={() => dispatch(increaseQuantity({ _id: item._id, size: item.size, color: item.color }))} className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-300">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">PKR {(item.price * item.quantity).toLocaleString()}</td>
                    <td className="py-4 px-12">
                      <button onClick={() => dispatch(deleteItem({ _id: item._id, size: item.size, color: item.color }))}>
                        <ImCross className="text-red-500 cursor-pointer hover:text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            Reset Cart
          </button>

          {/* Cart Totals */}
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4 border-[1px] border-gray-200 p-4 rounded-md shadow-md">
              <h1 className="text-2xl font-semibold text-left mb-2">Cart totals</h1>
              <div className="space-y-2">
                <p className="flex justify-between border-b py-2 text-md font-medium">
                  Subtotal <span className="font-semibold">PKR {totalAmt.toLocaleString()}</span>
                </p>
                <p className="flex justify-between border-b py-2 text-md font-medium">
                  Shipping Charge <span className="font-semibold">PKR {shippingCharge}</span>
                </p>
                <p className="flex justify-between py-2 text-md font-medium">
                  Total <span className="font-semibold text-lg">PKR {(totalAmt + shippingCharge).toLocaleString()}</span>
                </p>
              </div>
              <div className="flex justify-start">
                <Link to="/orderForm">
                  <button className="w-52 h-10 bg-primeColor text-white font-semibold rounded-md hover:bg-black duration-300 transition-all ease-in-out shadow-md hover:shadow-lg">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div className="p-4">
            <img className="w-80 mx-auto" src={emptyCart} alt="emptyCart" />
          </div>
          <div className="max-w-[500px] p-6 bg-white flex gap-4 flex-col items-center rounded-lg shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-8 -mt-2 text-gray-600">
              Your Shopping cart lives to serve. Give it purpose - fill it with products to make it happy.
            </p>
            <Link to="/products">
              <button className="bg-[#7b246d] text-white rounded-md px-8 py-2 font-titleFont font-semibold text-md hover:bg-black duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
