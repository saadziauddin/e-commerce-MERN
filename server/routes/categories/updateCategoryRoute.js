import express from 'express';
import multer from 'multer';
import Category from '../../models/category.js';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads/category_images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Update category route
router.put('/api/updateCategory/:categoryId', upload.single('image'), async (req, res) => {
    const { categoryId } = req.params;
    const updatedData = { ...req.body };
    const imageName = req.file ? req.file.filename : null;
    const imagePath = req.file ? req.file.path : null;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found!" });
        }

        category.name = updatedData.name || category.name;
        category.description = updatedData.description || category.description;

        if (req.file) {
            category.image = [{ imageName, imagePath }];
        }
        await category.save();
        return res.status(200).json({ message: "Category updated successfully!" });
    } catch (error) {
        console.log("Error during updating category:", error);
        return res.status(400).json({ error: "Error during updating category!" });
    }
});

export default router;
