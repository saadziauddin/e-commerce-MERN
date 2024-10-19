import express from 'express';
import multer from 'multer';
import Category from '../../models/categoryModel.js';
import moment from 'moment';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/uploads/product_images/');
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
        // Handle arrays (return as a comma-separated string or as an array directly)
        return field.length > 0 ? field.map(f => f.trim()).filter(f => f !== '') : null;
    }
    return typeof field === 'string' && field.trim() !== '' ? field.trim() : null;
};

const validateCategoryFields = (body) => {
    const errors = {};

    if (!body.name || body.name.trim() === '') {
        errors.name = 'Product name is required.';
    }
    if (!body.price1 || isNaN(body.price1)) {
        errors.price1 = 'Valid price is required.';
    }
    if (!body.category || body.category.trim() === '') {
        errors.category = 'Product category is required.';
    }
    if (!body.stock || isNaN(body.stock)) {
        errors.stock = 'Valid stock quantity is required.';
    }

    return errors;
};

router.post('/api/categories/addCategory', (req, res) => {
    upload.single('image')(req, res, async (uploadError) => {
        if (uploadError) {
            if (uploadError instanceof multer.MulterError) {
                if (uploadError.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'File size limit exceeds 5MB!' });
                }
                if (uploadError.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(400).json({ error: 'You can only upload up to 5 images at a time!' });
                }
            } else if (uploadError.message) {
                return res.status(400).json({ error: uploadError.message });
            } else {
                return res.status(500).json({ error: 'An error occurred during file upload!' });
            }
        }

        const categoryData = { ...req.body };
        // const imageName = req.file ? req.file.filename : null;
        // const imagePath = req.file ? req.file.path : null;

        // Validate fields
        const errors = validateCategoryFields(req.body);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const images = req.files && req.files.length > 0
                ? req.files.map(file => ({
                    imageName: file.filename,
                    imagePath: file.filename ? `/uploads/product_images/${file.filename}` : null
                }))
                : null;

            const sanitizedCategory = {
                name: sanitizeField(categoryData.name),
                description: sanitizeField(categoryData.description),
                images
                // image: [ { imageName, imagePath } ],
            };

            const newCategory = new Product(sanitizedCategory);
            await newCategory.save();

            return res.status(200).json({ message: "Category uploaded successfully!" });
        } catch (error) {
            console.log("Error during uploading category:", error);
            return res.status(400).json({ error: "Error during uploading category!" });
        }
    });
});

export default router;
