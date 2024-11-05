import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import './config.js';

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },  // Reference to the Product model
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingInfo: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentInfo: {
    transactionId: { type: String },
    paymentMethod: { type: String },
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing',
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
