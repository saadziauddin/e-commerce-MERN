import express from 'express';
import multer from 'multer';
import Product from '../../models/productModel.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/uploads/product_images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
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

router.post('/api/products/addProduct', (req, res) => {
  upload.array('images', 12)(req, res, async (uploadError) => {
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

    const { name, description, price1, price2, color, size, tags, category, stock } = req.body;
    console.log('Received request to add product');
    console.log('Request Body:', req.body);
    console.log('Uploaded Files:', req.files);
    try {
      const images = req.files.map(file => ({ imageName: file.originalname, imagePath: file.path }));

      const newProduct = new Product({
        name,
        description,
        price1,
        price2,
        color,
        size,
        tags,
        category,
        stock,
        images
      });
      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  });
});

export default router;