import mongoose from "mongoose";
import './config.js';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: [
        { imageName: { type: String }, imagePath: { type: String } }
    ],
    description: { type:String },
    dateAdded: { type: Date, default: Date.now }
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
