import express from 'express';
import Category from '../../models/category.js';

const router = express.Router();

router.delete('/api/deleteCategory', async (req, res) => {
    const { CategoryId } = req.query;
    if (!CategoryId) {
        return res.status(400).json({ message: "Category Id is required" });
    }
    try {
        const deleteCategory = await Category.deleteOne({_id: CategoryId});
        if (!deleteCategory) {
            res.status(400).json({ error: "Category not deleted!" });
        } else {
            res.status(200).json({ message: "Category deleted successfully!" });
        }
    } catch (error) {
        console.error("Error during deletion: ", error);
        res.status(500).json({ message: "Internal server error: ", error });
    }
});

export default router;
