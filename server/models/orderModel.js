import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import './config.js';

const orderSchema = new Schema({
  user: { type: String, ref: 'User', required: true },
  userExists: { type: Boolean, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      // productId: { type: String },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      color: { type: String },
      size: { type: String },
      price: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },
  ],
  grandTotal: { type: Number, required: true },
  userInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    billingAddress: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String },
    additionalNotes: { type: String }
  },
  paymentInfo: {
    transactionId: { type: String, default: null },
    paymentMethod: { type: String, default: null }
  },
  orderDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
