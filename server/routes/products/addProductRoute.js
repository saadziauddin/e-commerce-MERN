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
  limits: { fileSize: 1024 * 1024 * 10 },
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

const validateProductFields = (body) => {
  const errors = {};

  if (!body.name || body.name.trim() === '') {
    errors.name = 'Product name is required.';
  }
  if (!body.newPrice || isNaN(body.newPrice)) {
    errors.newPrice = 'Valid price is required.';
  }
  if (!body.category || body.category.trim() === '') {
    errors.category = 'Product category is required.';
  }
  if (!body.stock || isNaN(body.stock)) {
    errors.stock = 'Valid stock quantity is required.';
  }

  return errors;
};

router.post('/api/products/addProduct', (req, res) => {
  upload.array('images', 10)(req, res, async (uploadError) => {
    if (uploadError) {
      if (uploadError instanceof multer.MulterError) {
        if (uploadError.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size limit exceeds 5MB!' });
        }
        if (uploadError.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({ error: 'You can only upload up to 10 images at a time!' });
        }
      } else if (uploadError.message) {
        return res.status(400).json({ error: uploadError.message });
      } else {
        return res.status(500).json({ error: 'An error occurred during file upload!' });
      }
    }

    const {
      name,
      color,
      size,
      tags,
      stock,
      category,
      discount,
      status,
      newPrice,
      oldPrice,
      shortDescription,
      longDescription,
    } = req.body;

    const errors = validateProductFields(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    if(!name || !category || !status || !newPrice ||!shortDescription || !longDescription){
      return res.status(400).json({error: "Missing required fields e.g. Product Name, Category, Status, New Price, Short and Long Description."})
    }

    try {
      const images = req.files && req.files.length > 0
        ? req.files.map(file => ({
          imageName: file.filename, imagePath: file.filename ? `/uploads/product_images/${file.filename}` 
        : null
        }))
        : null;

      const sanitizedProduct = {
        name: sanitizeField(name),
        color: sanitizeField(color),
        size: sanitizeField(size),
        tags: sanitizeField(tags),
        stock: sanitizeField(stock),
        category: sanitizeField(category),
        discount: sanitizeField(discount),
        status: sanitizeField(status),
        newPrice: sanitizeField(newPrice),
        oldPrice: sanitizeField(oldPrice),
        shortDescription: sanitizeField(shortDescription),
        longDescription: sanitizeField(longDescription),
        images,
      };

      const newProduct = new Product(sanitizedProduct);
      await newProduct.save();

      res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Error adding product', error: error.message });
    }
  });
});

export default router;
