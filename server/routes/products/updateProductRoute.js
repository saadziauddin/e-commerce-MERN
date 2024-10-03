import express from 'express';
import multer from 'multer';
import Product from '../../models/productModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/uploads/product_images/');
  },
  filename: (req, file, cb) => {
    const timestamp = moment().format('DD-MM-YYYY'); // Human-readable format
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg formats allowed!'), false);
    }
  },
});

// Product update route
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
    const { name, color, size, tags, stock, category, discount, status, price1, price2, description } = req.body;

    try {
      // Fetch the existing product by its ID
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found!' });
      }

      // Handle new image uploads
      let updatedImages = existingProduct.images;
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => ({
          imageName: file.originalname,
          imagePath: path.join('../client/public/uploads/product_images/', file.filename),
        }));
        updatedImages = [...updatedImages, ...newImages];
      }

      // Update product data
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          ...(name && { name }),
          ...(color && { color }),
          ...(size && { size }),
          ...(tags && { tags }),
          ...(stock && { stock }),
          ...(category && { category }),
          ...(discount && { discount }),
          ...(status && { status }),
          ...(price1 && { price1 }),
          ...(price2 && { price2 }),
          ...(description && { description }),
          images: updatedImages, // Update images array
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found!' });
      }

      res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
    } catch (error) {
      console.error(`Error updating product: ${error.message}`);
      res.status(500).json({ error: 'Error updating product' });
    }
  });
});

export default router;
