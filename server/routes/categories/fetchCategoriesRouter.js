import express from 'express';
import Category from '../../models/category.js';

const router = express.Router();

// Fetch Categories
router.get('/fetchCategories', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.log("Error fetching categories: ", error);
    }
})

export default router;
