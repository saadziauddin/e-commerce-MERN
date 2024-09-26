// import express from 'express';
// import multer from 'multer';
// import Product from '../../models/productModel.js';
// import fs from 'fs';

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../client/public/uploads/product_images/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 5 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
//     }
//   }
// });

// const deleteOldImage = (imagePath) => {
//   fs.unlink(imagePath, (err) => {
//     if (err) {
//       console.error("Error deleting old image: ", err);
//     } else {
//       console.log("Old image deleted successfully.");
//     }
//   });
// };

// router.put('/api/updateProduct/:productId', (req, res) => {
//   upload.array('images', 5)(req, res, async (uploadError) => {
//     if (uploadError) {
//       if (uploadError instanceof multer.MulterError) {
//         if (uploadError.code === 'LIMIT_FILE_SIZE') {
//           return res.status(400).json({ error: 'File size limit exceeds 5MB!' });
//         }
//       } else if (uploadError.message) {
//         return res.status(400).json({ error: uploadError.message });
//       } else {
//         return res.status(500).json({ error: 'An error occurred during file upload!' });
//       }
//     }

//     const { productId } = req.params;
//     const updatedData = { ...req.body };

//     try {
//       const existingProduct = await Product.findById(productId);
//       if (!existingProduct) {
//         return res.status(404).json({ error: "Product not found!" });
//       }

//       // If new images are uploaded, handle them
//       let updatedImages = [];
//       if (req.files.length > 0) {
//         updatedImages = req.files.map(file => ({ imageName: file.originalname, imagePath: file.path }));
//       }

//       // Update the product
//       const updatedProduct = await Product.findByIdAndUpdate(
//         id,
//         {
//           name,
//           description,
//           price1,
//           price2,
//           color,
//           size,
//           tags,
//           category,
//           stock,
//           // Update images only if new images are provided
//           ...(updatedImages.length && { images: updatedImages })
//         },
//         { new: true } // Return the updated product
//       );

//       if (!updatedProduct) {
//         return res.status(404).json({ message: 'Product not found' });
//       }

//       res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating product', error });
//     }
//   });
// });

// export default router;

import express from 'express';
import multer from 'multer';
import Product from '../../models/productModel.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Set up Multer storage configuration
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
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  }
});

// Utility function to delete an image from the file system
const deleteOldImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting old image: ", err);
    } else {
      console.log("Old image deleted successfully.");
    }
  });
};

// Product update route
router.put('/api/updateProduct/:productId', (req, res) => {
  upload.array('images', 5)(req, res, async (uploadError) => {
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

    const { productId } = req.params;
    const { name, description, price1, price2, color, size, tags, category, stock, imagesToRemove = [] } = req.body;
    
    try {
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found!" });
      }

      // Delete old images that the user wants to remove
      imagesToRemove.forEach(imageId => {
        const imageToDelete = existingProduct.images.find(image => image._id.toString() === imageId);
        if (imageToDelete) {
          deleteOldImage(path.join(__dirname, '../../', imageToDelete.imagePath)); // Ensure correct path
        }
      });

      // Remove the images from the product data
      const filteredImages = existingProduct.images.filter(image => !imagesToRemove.includes(image._id.toString()));

      // If new images are uploaded, add them to the filtered images list
      let updatedImages = [...filteredImages];
      if (req.files.length > 0) {
        const newImages = req.files.map(file => ({ imageName: file.originalname, imagePath: file.path }));
        updatedImages = [...updatedImages, ...newImages];
      }

      // Update the product with new data
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
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
          images: updatedImages // Update with new/filtered images
        },
        { new: true } // Return the updated product
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
    } catch (error) {
      console.error("Error updating product: ", error);
      res.status(500).json({ message: 'Error updating product', error });
    }
  });
});

export default router;

