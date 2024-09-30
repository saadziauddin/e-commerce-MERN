import express from 'express';
import mongoose from 'mongoose';
import Category from '../../models/categoryModel.js';

const router = express.Router();

// Fetch Categories
router.get('/api/fetchCategories', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.log("Error fetching categories: ", error);
    }
});

// Fetch Category by Id
router.get('/api/fetchCategoryById/:categoryId', async (req, res) => {
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);
    try {
        const category = await Category.find({_id: categoryId});

        return res.status(200).json({category});
    } catch (error) {
        console.log("Error fetching category by Id: ", error);
    }
});

export default router;
