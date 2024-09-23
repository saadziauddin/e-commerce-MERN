import express from 'express';
import multer from 'multer';
import Category from '../../models/category.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads/category_images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.post('/addCategory', upload.single('image'), async (req, res) => {
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

export default router;
