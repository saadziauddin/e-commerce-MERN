import express from 'express';
import multer from 'multer';
import Category from '../../models/categoryModel.js';
import fs from 'fs';

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

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
        }
    }
});

const deleteOldImage = (imagePath) => {
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error("Error deleting old image: ", err);
        } else {
            console.log("Old image deleted successfully.");
        }
    });
};

// Update category route
router.put('/api/updateCategory/:categoryId', (req, res) => {
    upload.single('image')(req, res, async (uploadError) => {
        if (uploadError) {
            if (uploadError instanceof multer.MulterError) {
                if (uploadError.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'File size limit exceeds 5MB!' });
                }
            } else if (uploadError.message) {
                return res.status(400).json({ error: uploadError.message });
            } else {
                return res.status(500).json({ error: 'An error occurred during file upload!' });
            }
        }

        const { categoryId } = req.params;
        const updatedData = { ...req.body };
        try {
            const existingCategory = await Category.findById(categoryId);
            if (!existingCategory) {
                return res.status(404).json({ error: "Category not found!" });
            }

            // If there's a new image uploaded, delete the old image
            if (req.file && existingCategory.image && existingCategory.image.length > 0) {
                const oldImagePath = existingCategory.image[0].imagePath;
                if (fs.existsSync(oldImagePath)) {
                    deleteOldImage(oldImagePath); // Delete the old image
                }
            }

            const categoryImage = req.file ? [{ imageName: req.file.filename, imagePath: req.file.path }] : existingCategory.image;

            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Category not found!" });
            }

            category.name = updatedData.name || category.name;
            category.description = updatedData.description || category.description;
            category.image = categoryImage;

            await category.save();
            return res.status(200).json({ message: "Category updated successfully!" });
        } catch (error) {
            console.log("Error during updating category:", error);
            return res.status(400).json({ error: "Error during updating category!" });
        }
    });

});

export default router;
