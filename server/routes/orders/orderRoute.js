const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create new order
router.post('/create', async (req, res) => {
  try {
    const { user, products, shippingInfo, totalAmount } = req.body;

    const newOrder = new Order({
      user,
      products,
      shippingInfo,
      totalAmount,
      paymentStatus: 'Pending',
      status: 'Processing',
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', message: err.message });
  }
});

// Get order details
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('products.productId');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order details', message: err.message });
  }
});

module.exports = router;
