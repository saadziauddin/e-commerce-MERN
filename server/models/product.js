import mongoose from "mongoose";
import './config.js';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price1: { type: Number, required: true },
    price2: { type: Number, required: true },
    sku: { type: String, unique: true, trim: true },
    discount: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    color: [
        { type: String, required: true }
    ],
    size: [
        { type: String, required: true }
    ],
    tags: [
        { type: String, trim: true }
    ],
    category: { type: String, trim: true },
    stock: { type: Number, default: 0 },
    images: [
        { imageName: String, imagePath: String }
    ],
    dateAdded: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
