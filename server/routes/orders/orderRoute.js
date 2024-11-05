// import express from 'express';
// import Order from '../../models/orderModel.js';
// import User from '../../models/userModel.js';
// import { body, validationResult } from 'express-validator';

// const router = express.Router();

// const validateOrderData = [
//     body('user').notEmpty().withMessage('User is required.'),
//     body('products').isArray().withMessage('Products must be an array.'),
//     body('shippingInfo').notEmpty().withMessage('Shipping info is required.'),
//     body('paymentMethod').notEmpty().withMessage('Payment method is required.'),
//     body('totalAmount').isNumeric().withMessage('Total amount must be a number.'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     },
// ];

// router.post('/orders', validateOrderData, async (req, res) => {
//     const { user, products, shippingInfo, totalAmount, paymentInfo, orderStatus, paymentStatus } = req.body;

//     try {
//         // Find the user by ID or email
//         let userId;
//         if (mongoose.Types.ObjectId.isValid(user)) {
//             userId = await User.findById(user);
//         } else {
//             userId = await User.findOne({ email: user });
//         }

//         if (!userId) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Create a new order
//         const newOrder = new Order({
//             user: userId._id, // Ensure you use the user's ID for the order
//             products,
//             shippingInfo,
//             paymentInfo: {
//                 paymentMethod,
//             },
//             totalAmount,
//         });

//         await newOrder.save();
//         res.status(201).json(newOrder);
//     } catch (error) {
//         console.error("Order creation error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// export default router;

import express from 'express';
import mongoose from 'mongoose';
import Order from '../../models/orderModel.js';
import User from '../../models/userModel.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const validateOrderData = [
  body('user').notEmpty().withMessage('User is required.'),
  body('products').isArray({ min: 1 }).withMessage('Products must contain at least one item.'),
  body('shippingInfo').notEmpty().withMessage('Shipping info is required.'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required.'),
  body('totalAmount').isNumeric().withMessage('Total amount must be a number.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.post('/api/orders/createOrder', validateOrderData, async (req, res) => {
  const { user, products, shippingInfo, paymentMethod, totalAmount, paymentInfo, orderStatus, paymentStatus } = req.body;

  try {
    // Check if user exists by ID or email
    let userId;
    if (mongoose.Types.ObjectId.isValid(user)) {
      userId = await User.findById(user);
    } else {
      userId = await User.findOne({ email: user });
    }

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare new order
    const newOrder = new Order({
      user: userId._id,
      products,
      shippingInfo,
      paymentInfo: {
        transactionId: paymentInfo?.transactionId || null,
        paymentMethod,
      },
      totalAmount,
      paymentStatus: paymentStatus || 'Pending',
      orderStatus: orderStatus || 'Processing',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
