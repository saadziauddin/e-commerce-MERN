// import express from 'express';
// import Category from '../../models/categoryModel.js';
// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// router.delete('/api/deleteCategory', async (req, res) => {
//     const { CategoryId } = req.query;
//     if (!CategoryId) {
//         return res.status(400).json({ message: "Category Id is required" });
//     }
//     try {
//         const category = await Category.findById(CategoryId);
//         if(!category){
//             return res.status(400).json({error: "Category not found!"});
//         }
//         const imageObj = category.image[0];

//         if(imageObj && imageObj.imagePath){
//             const fullImagePath = path.join(__dirname, '../../public', imageObj.imagePath);
//             fs.unlink(fullImagePath, (err) => {
//                 if (err) {
//                     console.error('Error deleting category image:', err);
//                     return res.status(500).json({ message: 'Failed to delete category image' });
//                 }
//             })
//         }

//         const deleteCategory = await Category.deleteOne({_id: CategoryId});
//         if (!deleteCategory) {
//             res.status(400).json({ error: "Category not deleted!" });
//         } else {
//             res.status(200).json({ message: "Category deleted successfully!" });
//         }
//     } catch (error) {
//         console.error("Error during deletion: ", error);
//         res.status(500).json({ message: "Internal server error: ", error });
//     }
// });

// export default router;
import express from 'express';
import Category from '../../models/categoryModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.delete('/api/deleteCategory', async (req, res) => {
    const { CategoryId } = req.query;
    if (!CategoryId) {
        return res.status(400).json({ message: "Category Id is required" });
    }
    
    try {
        const category = await Category.findById(CategoryId);
        if (!category) {
            return res.status(400).json({ error: "Category not found!" });
        }

        const imageObj = category.image[0]; // Check if there's an image
        if (imageObj && imageObj.imagePath) {
            const fullImagePath = path.join(__dirname, '../../public', imageObj.imagePath);
            fs.unlink(fullImagePath, (err) => {
                if (err) {
                    console.error('Error deleting category image:', err);
                    // You may choose to return an error response here if image deletion fails
                }
            });
        }

        const deleteCategory = await Category.deleteOne({ _id: CategoryId });
        if (deleteCategory.deletedCount === 0) {
            return res.status(400).json({ error: "Category not deleted!" });
        }

        return res.status(200).json({ message: "Category deleted successfully!" });
    } catch (error) {
        console.error("Error during deletion: ", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default router;
