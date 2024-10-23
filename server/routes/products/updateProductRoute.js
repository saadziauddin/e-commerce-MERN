import express from 'express';
import multer from 'multer';
import Product from '../../models/productModel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import moment from 'moment';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration
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
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false);
    }
  },
});

const sanitizeField = (field) => {
  if (Array.isArray(field)) {
    // Handle arrays (return as a comma-separated string or as an array directly)
    return field.length > 0 ? field.map(f => f.trim()).filter(f => f !== '') : null;
  }
  return typeof field === 'string' && field.trim() !== '' ? field.trim() : null;
};

// Validation function for required fields
const validateProductFields = (body) => {
  const errors = {};
  
  if (!body.name || body.name.trim() === '') {
    errors.name = 'Product name is required.';
  }
  if (!body.price1 || isNaN(body.price1)) {
    errors.price1 = 'Price 1 is the main Price, it is required.';
  }
  if (!body.category || body.category.trim() === '') {
    errors.category = 'Product category is required.';
  }
  if (!body.stock || isNaN(body.stock)) {
    errors.stock = 'Stock quantity is required.';
  }

  return errors;
};

// Update product route
router.put('/api/updateProduct/:productId', (req, res) => {
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

    const { productId } = req.params;
    const {
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
      shortDescription,
      longDescription,
    } = req.body;

    // Validate fields
    const errors = validateProductFields(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      // Fetch existing product
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found!' });
      }

      // If new images are uploaded, delete old ones and update the images
      let updatedImages = existingProduct.images;
      if (req.files && req.files.length > 0) {
        // // Delete existing images from the folder
        // existingProduct.images.forEach((image) => {
        //   const imagePath = path.join(__dirname, '../client/public', image.imagePath);
        //   if (fs.existsSync(imagePath)) {
        //     fs.unlinkSync(imagePath);
        //   }
        // });

        // // Save new images
        // updatedImages = req.files.map((file) => ({
        //   imageName: file.originalname,
        //   imagePath: `/uploads/product_images/${file.filename}`, // Publicly accessible path
        // }));
        const newImages = req.files.map((file) => ({
          imageName: file.filename,
          // imagePath: path.join('public/uploads/product_images/', file.filename),
          imagePath: `/uploads/product_images/${file.filename}`
        }));
        updatedImages = [...updatedImages, ...newImages];
      }

      // Prepare updated product data
      const sanitizedProduct = {
        ...(name && { name: sanitizeField(name) }),
        ...(color && { color: sanitizeField(color) }),
        ...(size && { size: sanitizeField(size) }),
        ...(tags && { tags: sanitizeField(tags) }),
        ...(stock && { stock: sanitizeField(stock) }),
        ...(category && { category: sanitizeField(category) }),
        ...(discount && { discount: sanitizeField(discount) }),
        ...(status && { status: sanitizeField(status) }),
        ...(price1 && { price1: sanitizeField(price1) }),
        ...(price2 && { price2: sanitizeField(price2) }),
        ...(shortDescription && { shortDescription: sanitizeField(shortDescription) }),
        ...(longDescription && { longDescription: sanitizeField(longDescription) }),
        images: updatedImages,
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        sanitizedProduct,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found!' });
      }

      res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
      
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'An error occurred while updating the product' });
    }
  });
});

export default router;
