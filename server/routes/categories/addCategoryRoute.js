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

router.post('/api/categories/addCategory', (req, res) => {
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

        const { name, description } = req.body;
        
        const errors = validateCategoryFields(req.body);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const image = req.file ? {
                imageName: req.file.filename,
                imagePath: `/uploads/category_images/${req.file.filename}`
            } : null;

            const sanitizedCategory = {
                name: sanitizeField(name),
                description: sanitizeField(description),
                image: image
            };

            const newCategory = new Category(sanitizedCategory);
            await newCategory.save();

            return res.status(200).json({ message: "Category uploaded successfully!" });
        } catch (error) {
            console.log("Error during adding category:", error);
            return res.status(500).json({ error: "Error during adding category!" });
        }
    });
});

export default router;
