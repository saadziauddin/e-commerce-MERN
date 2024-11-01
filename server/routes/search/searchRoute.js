import express from 'express';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';

const router = express.Router();

// Search everything in Product and Category models
router.get('/api/search', async (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm || searchTerm.trim() === '') {
        return res.status(400).json({ error: 'Search term is required.' });
    }

    try {
        // Use regex for partial matching, ignoring case
        const searchRegex = new RegExp(searchTerm, 'i');

        // Concurrently search both collections
        const [products, categories] = await Promise.all([
            Product.find({
                $or: [
                    { name: searchRegex },
                    { description: searchRegex },
                    { category: searchRegex },
                    { otherField: searchRegex } // Add fields as needed
                ]
            }).lean(),  // `.lean()` makes query faster for read-only data

            Category.find({
                $or: [
                    { name: searchRegex },
                    { description: searchRegex },
                    { otherField: searchRegex } // Add fields as needed
                ]
            }).lean()
        ]);

        // Send combined results
        return res.status(200).json({ products, categories });
    } catch (error) {
        console.log("Error during search:", error);
        return res.status(500).json({ error: "An error occurred during search." });
    }
});

export default router;
