import express from 'express';
import Category from '../models/category.js';

const router = express.Router();

// router.post('/categories/addCategory', async (req, res) => {
//     const { name, description } = req.body;
//     const imageName = req.file ? req.file.filename : null;
//     const imagePath = req.file ? req.file.path : null;
//     try {
//         const newCategory = new Category({
//             // name: categoryData.name,
//             // image: [
//             //     categoryData.image
//             // ],
//             // description: categoryData.description,
//             name,
//             image: [
//                 { imageName, imagePath }
//             ],
//             description
//         })
        
//         await newCategory.save();
//         return res.status(200).json({message: "Category uploaded successfully!"});
//     } catch (error) {
//         console.log("Error during uploading category, ", error);
//         return res.status(400).json({error: "Error during uploading category!"})
//     }
// });

router.post('/addCategory', async (req, res) => {
    const categoryData = { ...req.body };
    const imageName = req.file ? req.file.filename : null;
    const imagePath = req.file ? req.file.path : null;
    try {
        const newCategory = new Category({
            name: categoryData.name,
            image: [
                { imageName, imagePath }
            ],
            description: categoryData.description
        });
        await newCategory.save();
        return res.status(200).json({ message: "Category uploaded successfully!" });
    } catch (error) {
        console.log("Error during uploading category:", error);
        return res.status(400).json({ error: "Error during uploading category!" });
    }
});

export default router;
