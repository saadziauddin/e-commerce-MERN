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

router.put('/api/updateProduct/:productId', upload.array('images', 5), async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price1, price2, color, size, tags, category, stock } = req.body;
  
      // If new images are uploaded, handle them
      let updatedImages = [];
      if (req.files.length > 0) {
        updatedImages = req.files.map(file => ({ imageName: file.originalname, imagePath: file.path }));
      }
  
      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price1,
          price2,
          color,
          size,
          tags,
          category,
          stock,
          // Update images only if new images are provided
          ...(updatedImages.length && { images: updatedImages })
        },
        { new: true } // Return the updated product
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  });

export default router;
