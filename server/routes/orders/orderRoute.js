// import express from 'express';
// import Order from '../../models/orderModel.js';
// import User from '../../models/userModel.js';

// const router = express.Router();

// router.post('/newOrder', async (req, res) => {
//   const { user, products, grandTotal, userInfo, paymentInfo, paymentStatus, orderStatus } = req.body;

//   try {
//     let existingUser = await User.findOne({ email: user });
//     const userExists = !!existingUser;

//     const newOrder = new Order({
//       user,
//       userExists,
//       products,
//       grandTotal,
//       userInfo,
//       paymentInfo,
//       paymentStatus,
//       orderStatus
//     });

//     await newOrder.save();
//     res.status(201).json({ message: 'Order Successful!' });
//   }
//   catch (error) {
//     console.error("Order creation error:", error);
//     res.status(500).json({ message: "Internal server error!" });
//   }
// });

// export default router;

import express from 'express';
import Order from '../../models/orderModel.js';
import User from '../../models/userModel.js';

const router = express.Router();

router.post('/newOrder', async (req, res) => {
  const { user, products, grandTotal, userInfo, paymentInfo, paymentStatus, orderStatus } = req.body;

  // Validate required fields according to the schema
  if (!user) return res.status(400).json({ message: "User email is required." });

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "At least one product is required." });
  } else {
    for (const product of products) {
      if (!product.productName) return res.status(400).json({ message: "Product name is required for each product." });
      if (product.quantity == null || product.quantity <= 0) return res.status(400).json({ message: "Valid quantity is required for each product." });
      if (product.price == null) return res.status(400).json({ message: "Product price is required for each product." });
      if (product.totalAmount == null) return res.status(400).json({ message: "Total amount is required for each product." });
    }
  }

  if (!grandTotal) return res.status(400).json({ message: "Grand total is required." });

  if (!userInfo || typeof userInfo !== 'object') {
    return res.status(400).json({ message: "User info is required and must be an object." });
  } else {
    const { name, email, phone, shippingAddress, billingAddress, city, country } = userInfo;
    if (!name) return res.status(400).json({ message: "User name is required." });
    if (!email) return res.status(400).json({ message: "User email is required." });
    if (!phone) return res.status(400).json({ message: "User phone number is required." });
    if (!shippingAddress) return res.status(400).json({ message: "Shipping address is required." });
    if (!billingAddress) return res.status(400).json({ message: "Billing address is required." });
    if (!city) return res.status(400).json({ message: "City is required." });
    if (!country) return res.status(400).json({ message: "Country is required." });
  }

  if (!paymentStatus || !['Pending', 'Paid', 'Failed'].includes(paymentStatus)) {
    return res.status(400).json({ message: "Valid payment status is required (Pending, Paid, or Failed)." });
  }

  if (!orderStatus || !['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(orderStatus)) {
    return res.status(400).json({ message: "Valid order status is required (Processing, Shipped, Delivered, or Cancelled)." });
  }

  try {
    let existingUser = await User.findOne({ email: user });
    const userExists = !!existingUser;

    const newOrder = new Order({
      user,
      userExists,
      products,
      grandTotal,
      userInfo,
      paymentInfo,
      paymentStatus,
      orderStatus
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order Successful!' });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

export default router;
