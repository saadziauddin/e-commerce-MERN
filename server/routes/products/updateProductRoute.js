// import express from 'express';
// import multer from 'multer';
// import Product from '../../models/productModel.js';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import moment from 'moment';

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../../../client/public/uploads/product_images/');
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     // Generate a readable timestamp: YYYY-MM-DD_HH-mm-ss
//     const timestamp = moment().format('DD-MM-YYYY');
//     const fileName = `${timestamp}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
//     }
//   },
// });

// // Function to delete old image from filesystem
// const deleteOldImage = (imagePath) => {
//   const absolutePath = path.join(__dirname, '../../../client/public', imagePath); // Corrected path
//   fs.unlink(absolutePath, (err) => {
//     if (err) {
//       console.error("Error deleting old image: ", err);
//     } else {
//       console.log("Old image deleted successfully.");
//     }
//   });
// };

// // Product update route
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
//     const { name, color, size, tags, stock, category, discount, status, price1, price2, description, imagesToRemove = [] } = req.body;

//     try {
//       // Fetch product by id
//       const existingProduct = await Product.findById(productId);
//       if (!existingProduct) {
//         return res.status(404).json({ error: "Product not found!" });
//       }

//       // Delete old images that the user wants to remove
//       imagesToRemove.forEach((imageId) => {
//         const imageToDelete = existingProduct.images.find(
//           (image) => image._id.toString() === imageId
//         );
//         if (imageToDelete) {
//           deleteOldImage(imageToDelete.imagePath);
//         }
//       });

//       // Filter out removed images from the database
//       const filteredImages = existingProduct.images.filter(
//         (image) => !imagesToRemove.includes(image._id.toString())
//       );

//       // Handle new image uploads
//       let updatedImages = [...filteredImages];
//       if (req.files && req.files.length > 0) {
//         const newImages = req.files.map((file) => ({
//           imageName: file.originalname,
//           imagePath: `/uploads/product_images/${file.filename}`,
//         }));
//         updatedImages = [...updatedImages, ...newImages];
//       }

//       // Update product data
//       const updatedProduct = await Product.findByIdAndUpdate(
//         productId,
//         {
//           ...(name && { name }),
//           ...(color && { color }),
//           ...(size && { size }),
//           ...(tags && { tags }),
//           ...(stock && { stock }),
//           ...(category && { category }),
//           ...(discount && { discount }),
//           ...(status && { status }),
//           ...(price1 && { price1 }),
//           ...(price2 && { price2 }),
//           ...(description && { description }),
//           images: updatedImages, // Update images array
//         },
//         { new: true }
//       );

//       if (!updatedProduct) {
//         return res.status(404).json({ message: 'Product not found' });
//       }

//       res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
//     } catch (error) {
//       console.error("Error updating product: ", error);
//       res.status(500).json({ message: 'Error updating product', error });
//     }
//   });
// });

// export default router;

// import express from 'express';
// import multer from 'multer';
// import Product from '../../models/productModel.js';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import moment from 'moment';

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../../../client/public/uploads/product_images/');
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const timestamp = moment().format('DD-MM-YYYY');
//     const fileName = `${timestamp}-${file.originalname}`;
//     cb(null, fileName);
//     // cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
//     }
//   },
// });

// // Function to delete old image from the filesystem
// const deleteOldImage = (imagePath) => {
//   return new Promise((resolve, reject) => {
//     const absolutePath = path.join(__dirname, '../../../client/public', imagePath);
//     fs.unlink(absolutePath, (err) => {
//       if (err) {
//         console.error("Error deleting old image: ", err);
//         reject(err);
//       } else {
//         console.log("Old image deleted successfully.");
//         resolve();
//       }
//     });
//   });
// };

// // Product update route
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
//     const {
//       name,
//       color,
//       size,
//       tags,
//       stock,
//       category,
//       discount,
//       status,
//       price1,
//       price2,
//       description,
//       imagesToRemove = [],
//     } = req.body;

//     try {
//       // Fetch product by id
//       const existingProduct = await Product.findById(productId);
//       if (!existingProduct) {
//         return res.status(404).json({ error: "Product not found!" });
//       }

//       // Delete old images that the user wants to remove (both from the database and the filesystem)
//       const deleteImagePromises = imagesToRemove.map(async (imageId) => {
//         const imageToDelete = existingProduct.images.find(
//           (image) => image._id.toString() === imageId
//         );
//         if (imageToDelete) {
//           // Delete image file from the filesystem
//           await deleteOldImage(imageToDelete.imagePath);
//         }
//         return imageId;
//       });

//       // Wait for all image deletions to complete
//       await Promise.all(deleteImagePromises);

//       // Filter out the removed images from the database
//       const filteredImages = existingProduct.images.filter(
//         (image) => !imagesToRemove.includes(image._id.toString())
//       );

//       // Handle new image uploads
//       let updatedImages = [...filteredImages];
//       if (req.files && req.files.length > 0) {
//         const newImages = req.files.map((file) => ({
//           imageName: file.originalname,
//           imagePath: `/uploads/product_images/${file.filename}`,
//         }));
//         updatedImages = [...updatedImages, ...newImages];
//       }

//       // Update product data
//       const updatedProduct = await Product.findByIdAndUpdate(
//         productId,
//         {
//           ...(name && { name }),
//           ...(color && { color }),
//           ...(size && { size }),
//           ...(tags && { tags }),
//           ...(stock && { stock }),
//           ...(category && { category }),
//           ...(discount && { discount }),
//           ...(status && { status }),
//           ...(price1 && { price1 }),
//           ...(price2 && { price2 }),
//           ...(description && { description }),
//           images: updatedImages, // Update images array
//         },
//         { new: true }
//       );

//       if (!updatedProduct) {
//         return res.status(404).json({ message: 'Product not found' });
//       }

//       res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
//     } catch (error) {
//       console.error("Error updating product: ", error);
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
import { fileURLToPath } from 'url';
import moment from 'moment';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../client/public/uploads/product_images/');
    cb(null, uploadPath);  // Ensure correct upload path
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
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  },
});

// Function to delete an old image from the filesystem
const deleteOldImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(__dirname, '../../../client/public', imagePath);
    console.log(absolutePath);
    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error("Error deleting old image: ", err);
        reject(err);
      } else {
        console.log("Old image deleted successfully.");
        resolve();
      }
    });
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
      description,
      imagesToRemove = [],
    } = req.body;

    try {
      // Fetch product by id
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found!" });
      }

      // Delete old images that the user wants to remove (both from the database and the filesystem)
      const deleteImagePromises = imagesToRemove.map(async (imageId) => {
        const imageToDelete = existingProduct.images.find(
          (image) => image._id.toString() === imageId
        );
        if (imageToDelete) {
          // Delete image file from the filesystem
          try {
            await deleteOldImage(imageToDelete.imagePath);
          } catch (err) {
            console.error(`Failed to delete image: ${imageToDelete.imagePath}`, err);
          }
        }
        return imageId;
      });

      // Wait for all image deletions to complete
      await Promise.all(deleteImagePromises);

      // Filter out the removed images from the database
      const filteredImages = existingProduct.images.filter(
        (image) => !imagesToRemove.includes(image._id.toString())
      );

      // Handle new image uploads
      let updatedImages = [...filteredImages];
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => ({
          imageName: file.originalname,
          imagePath: path.join('/uploads/product_images/', file.filename),
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


