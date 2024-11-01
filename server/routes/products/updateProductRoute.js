// import express from 'express';
// import multer from 'multer';
// import Product from '../../models/productModel.js';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import moment from 'moment';

// const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../../public/uploads/product_images/');
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const timestamp = moment().format('DD-MM-YYYY');
//     const fileName = `${timestamp}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false);
//     }
//   },
// });

// const sanitizeFormData = (data) => {
//   for (let key in data) {
//     if (data[key] === '') {
//       data[key] = null;
//     }
//   }
//   return data;
// };

// const sanitizeField = (field) => {
//   if (Array.isArray(field)) {
//     // Handle arrays (return as a comma-separated string or as an array directly)
//     return field.length > 0 ? field.map(f => f.trim()).filter(f => f !== '') : null;
//   }
//   return typeof field === 'string' && field.trim() !== '' ? field.trim() : null;
// };

// // Validation function for required fields
// const validateProductFields = (body) => {
//   const errors = {};
  
//   if (!body.name || body.name.trim() === '') {
//     errors.name = 'Product name is required.';
//   }
//   if (!body.newPrice || isNaN(body.newPrice)) {
//     errors.newPrice = 'Price 1 is the main Price, it is required.';
//   }
//   if (!body.category || body.category.trim() === '') {
//     errors.category = 'Product category is required.';
//   }
//   if (!body.stock || isNaN(body.stock)) {
//     errors.stock = 'Stock quantity is required.';
//   }

//   return errors;
// };

// // Update product route
// router.put('/api/updateProduct/:productId', (req, res) => {
//   upload.array('images', 5)(req, res, async (uploadError) => {
//     if (uploadError) {
//       if (uploadError instanceof multer.MulterError) {
//         if (uploadError.code === 'LIMIT_FILE_SIZE') {
//           return res.status(400).json({ error: 'File size limit exceeds 5MB!' });
//         }
//         if (uploadError.code === 'LIMIT_UNEXPECTED_FILE') {
//           return res.status(400).json({ error: 'You can only upload up to 5 images at a time!' });
//         }
//       } else if (uploadError.message) {
//         return res.status(400).json({ error: uploadError.message });
//       } else {
//         return res.status(500).json({ error: 'An error occurred during file upload!' });
//       }
//     };

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
//       newPrice,
//       oldPrice,
//       shortDescription,
//       longDescription,
//     } = sanitizeFormData(req.body);

//     const errors = validateProductFields(req.body);
//     if (Object.keys(errors).length > 0) {
//       return res.status(400).json({ errors });
//     }

//     try {
//       // Fetch existing product
//       const existingProduct = await Product.findById(productId);
//       if (!existingProduct) {
//         return res.status(404).json({ error: 'Product not found!' });
//       }

//       // If new images are uploaded, delete old ones and update the images
//       let updatedImages = existingProduct.images;
//       if (req.files && req.files.length > 0) {
//         const newImages = req.files.map((file) => ({
//           imageName: file.filename, imagePath: file.filename 
//           ? `/uploads/product_images/${file.filename}` 
//           : null
//         }));
//         updatedImages = [...updatedImages, ...newImages];
//       }

//       // Prepare updated product data
//       const sanitizedProduct = {
//         ...(name && { name: sanitizeField(name) }),
//         ...(color && { color: sanitizeField(color) }),
//         ...(size && { size: sanitizeField(size) }),
//         ...(tags && { tags: sanitizeField(tags) }),
//         ...(stock && { stock: sanitizeField(stock) }),
//         ...(category && { category: sanitizeField(category) }),
//         ...(discount && { discount: sanitizeField(discount) }),
//         ...(status && { status: sanitizeField(status) }),
//         ...(newPrice && { newPrice: sanitizeField(newPrice) }),
//         ...(oldPrice && { oldPrice: sanitizeField(oldPrice) }),
//         ...(shortDescription && { shortDescription: sanitizeField(shortDescription) }),
//         ...(longDescription && { longDescription: sanitizeField(longDescription) }),
//         images: updatedImages,
//       };

//       const updatedProduct = await Product.findByIdAndUpdate(
//         productId,
//         sanitizedProduct,
//         { new: true }
//       );

//       if (!updatedProduct) {
//         return res.status(404).json({ error: 'Product not found!' });
//       }

//       res.status(200).json({ message: 'Product updated successfully!', updatedProduct });
      
//     } catch (error) {
//       console.error('Error updating product:', error.message, error.stack);
//       res.status(500).json({ error: `An error occurred: ${error.message}` });
//     }
//   });
// });

// export default router;

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

const sanitizeAndConvert = (data) => {
  const sanitizedData = {};
  for (let key in data) {
    if (data[key] === '') {
      sanitizedData[key] = null;
    } else if (['oldPrice', 'stock', 'discount'].includes(key)) {
      sanitizedData[key] = isNaN(data[key]) ? null : parseFloat(data[key]);
    } else if (key === 'tags') {
      sanitizedData[key] = data[key] ? data[key].trim() : null;
    } else if (key === 'color' || key === 'size') {
      sanitizedData[key] = data[key] && data[key].length > 0 ? data[key] : null;
    } else {
      sanitizedData[key] = data[key];
    }
  }
  return sanitizedData;
};

// const sanitizeAndConvert = (data) => {
//   const sanitizedData = {};
//   for (let key in data) {
//     if (data[key] === '') {
//       sanitizedData[key] = null; // Set to null if the field is an empty string
//     } else if (['oldPrice', 'stock', 'discount'].includes(key)) {
//       sanitizedData[key] = isNaN(data[key]) ? null : parseFloat(data[key]); // Convert to number or set to null
//     } else if (key === 'tags') {
//       sanitizedData[key] = data[key] ? data[key].trim() : null; // Set tags to null if empty
//     } else if (key === 'color' || key === 'size') {
//       sanitizedData[key] = data[key] && data[key].length > 0 ? data[key] : null; // Set color and size to null if empty
//     } else {
//       sanitizedData[key] = data[key]; // Copy other fields directly
//     }
//   }
//   return sanitizedData;
// };

const validateProductFields = (body) => {
  const errors = {};
  
  // if (!body.name || body.name.trim() === '') {
  if (!body.name) {
    errors.name = 'Product name is required.';
  }
  // if (!body.newPrice || isNaN(body.newPrice)) {
  if (!body.newPrice) {
    errors.newPrice = 'Price 1 is the main price and is required.';
  }
  // if (!body.category || body.category.trim() === '') {
  if (!body.category) {
    errors.category = 'Product category is required.';
  }
  // if (!body.stock || isNaN(body.stock)) {
  if (!body.stock) {
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

      // Sanitize and convert form data
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
      } = sanitizeAndConvert(req.body);

      // If new images are uploaded, update the images
      let updatedImages = existingProduct.images;
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => ({
          imageName: file.filename,
          imagePath: `/uploads/product_images/${file.filename}`
        }));
        updatedImages = [...updatedImages, ...newImages];
      }

      // Prepare updated product data
      const sanitizedProduct = {
        ...(name && { name }),
        ...(color && { color: Array.isArray(color) ? color : [color] }),
        ...(size && { size: Array.isArray(size) ? size : [size] }),
        ...(tags && { tags }),
        stock,
        category,
        discount,
        status,
        newPrice,
        oldPrice,
        ...(shortDescription && { shortDescription }),
        ...(longDescription && { longDescription }),
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
      console.error('Error updating product:', error.message);
      res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
  });
});

export default router;
