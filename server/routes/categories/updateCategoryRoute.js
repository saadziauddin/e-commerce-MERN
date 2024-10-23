import express from 'express';
import multer from 'multer';
import Category from '../../models/categoryModel.js';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/uploads/category_images/');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const timestamp = moment().format('DD-MM-YYYY');
        const fileName = `${timestamp}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false);
        }
    }
});

const sanitizeField = (field) => {
    if (Array.isArray(field)) {
        return field.length > 0 ? field.map(f => f.trim()).filter(f => f !== '') : null;
    }
    return typeof field === 'string' && field.trim() !== '' ? field.trim() : null;
};

const validateCategoryFields = (body) => {
    const errors = {};
    if (!body.name || body.name.trim() === '') {
        errors.name = 'Category name is required.';
    }
    return errors;
};

// Update category route
router.put('/api/updateCategory/:categoryId', (req, res) => {
    upload.single('image')(req, res, async (uploadError) => {
        if (uploadError) {
            if (uploadError instanceof multer.MulterError && uploadError.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size exceeds 5MB!' });
            } else if (uploadError.message) {
                return res.status(400).json({ error: uploadError.message });
            } else {
                return res.status(500).json({ error: 'An error occurred during file upload!' });
            }
        }

        const { categoryId } = req.params;
        const { name, description } = { ...req.body };

        const errors = validateCategoryFields(req.body);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const fetchedCategory = await Category.findById(categoryId);
            if (!fetchedCategory) {
                return res.status(404).json({ error: "Category not found!" });
            }

            // If there's a new image uploaded, delete the old image
            if (req.file) {
                if (fetchedCategory.image && fetchedCategory.image[0]?.imageName && fetchedCategory.image[0]?.imagePath) {
                    const oldImagePath = path.join(__dirname, '../../public/uploads/category_images/', fetchedCategory.image[0].imageName);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlink(oldImagePath, (err) => {
                            if (err) {
                                console.error(`Error deleting image from system:`, err);
                            } else {
                                console.log(`Image deleted: ${oldImagePath}`);
                            }
                        });
                    } else {
                        console.log(`Image file not found at path: ${oldImagePath}`);
                    }
                }
                fetchedCategory.image = [{ imageName: req.file.filename }];
            }

            const categoryImage = req.file
                ? [{ imageName: req.file.filename, imagePath: `/uploads/category_images/${req.file.filename}` }]
                : fetchedCategory.image;

            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: "Category not found!" });
            }

            const sanitizedCategory = {
                ...(category.name && {
                    name: sanitizeField(name)
                }),
                ...(category.description && {
                    description: sanitizeField(description)
                }),
                ...(category.image && {
                    image: categoryImage
                })
            };

            const updatedCategory = await Category.findByIdAndUpdate(
                categoryId,
                sanitizedCategory,
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category not found!' });
            }

            return res.status(200).json({ message: "Category updated successfully!" });

        } catch (error) {
            console.log("Error during updating category:", error);
            return res.status(400).json({ error: "Error during updating category!" });
        }
    });
});

export default router;
