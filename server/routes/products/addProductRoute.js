import express from 'express';
import multer from 'multer';
import Product from '../../models/productModel.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/uploads/category_images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/api/products/addProduct', upload.array('images', 5), async (req, res) => {
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

export default router;
