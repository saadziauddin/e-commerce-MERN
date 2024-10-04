// import React from "react";
// import { ImCross } from "react-icons/im";
// import { useDispatch } from "react-redux";
// import {
//   deleteItem,
//   drecreaseQuantity,
//   increaseQuantity,
// } from "../../../redux/reduxSlice";

// const ItemCard = ({ item }) => {
//   const dispatch = useDispatch();

//   return (
//     <div className="grid grid-cols-9 bg-white rounded-lg shadow-lg p-4 items-center gap-4 mb-4 border">
//       {/* Image */}
//       <div className="col-span-1 flex justify-center">
//         <img
//           className="w-20 h-20 object-cover rounded-lg"
//           src={item.image}
//           alt="productImage"
//         />
//       </div>

//       {/* Name and Description */}
//       <div className="col-span-2">
//         <h1 className="text-md font-semibold">{item.name}</h1>
//         {/* <p className="text-sm text-gray-500">{item.description}</p> */}
//       </div>

//       {/* Size */}
//       <p className="text-sm font-semibold text-gray-800 text-center">
//         {item.size || "N/A"}
//       </p>

//       {/* Color */}
//       <p className="text-sm font-semibold text-gray-800 text-center">
//         {item.color || "N/A"}
//       </p>

//       {/* Price */}
//       <p className="text-sm font-semibold text-gray-800 text-center">
//         {item.price ? `PKR ${item.price.toLocaleString()}` : "N/A"}
//       </p>

//       {/* Quantity Selector */}
//       <div className="flex items-center justify-center space-x-2">
//         <button
//           onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
//           className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-300"
//         >
//           -
//         </button>
//         <p className="text-sm font-semibold text-gray-800">{item.quantity}</p>
//         <button
//           onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
//           className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-300"
//         >
//           +
//         </button>
//       </div>

//       {/* Subtotal */}
//       <p className="text-sm font-semibold text-gray-800 text-center">
//         PKR {(item.price * item.quantity).toLocaleString()}
//       </p>

//       {/* Delete Button */}
//       <ImCross onClick={() => dispatch(deleteItem(item._id))} className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"/>
//     </div>
//   );
// };

// export default ItemCard;
