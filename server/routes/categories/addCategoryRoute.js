import express from 'express';
import multer from 'multer';
import Category from '../../models/categoryModel.js';

const router = express.Router();

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

router.post('/api/categories/addCategory', (req, res) => {
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

        const categoryData = { ...req.body };
        const imageName = req.file ? req.file.filename : null;
        const imagePath = req.file ? req.file.path : null;
        try {
            const newCategory = new Category({
                name: categoryData.name,
                image: [
                    { imageName, imagePath }
                ],
                description: categoryData.description
            });
            await newCategory.save();
            return res.status(200).json({ message: "Category uploaded successfully!" });
        } catch (error) {
            console.log("Error during uploading category:", error);
            return res.status(400).json({ error: "Error during uploading category!" });
        }
    });
});

export default router;
