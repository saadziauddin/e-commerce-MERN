import mongoose from "mongoose";
import './config.js';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    status: { type: String, required: true, enum: ['Available', 'Out of Stock'] },
    shortDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, required: true, trim: true },
    newPrice: { type: Number, required: true, trim: true },
    youtubeVideoLink: { type: String },
    
    tags: { type: String, trim: true },
    stock: { type: Number },
    discount: { type: Number },
    oldPrice: { type: Number },

    color: [{ type: String, trim: true }],
    size: [{ type: String, trim: true }],
    images: [{ imageName: String, imagePath: String}],
    dateAdded: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
