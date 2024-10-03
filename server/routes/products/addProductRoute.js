import express from 'express';
import multer from 'multer';
import Product from '../../models/productModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/uploads/product_images/');
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
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  }
});

router.post('/api/products/addProduct', (req, res) => {
  upload.array('images', 5)(req, res, async (uploadError) => {
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

    const { name, color, size, tags, stock, category, discount, status, price1, price2, description } = req.body;
    try {
      const images = req.files.map(file => ({ imageName: file.originalname, imagePath: file.path }));

      const newProduct = new Product({
        name,
        color,
        size,
        tags,
        stock,
        category,
        discount,
        status,
        price1,
        price2,
        description,
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
