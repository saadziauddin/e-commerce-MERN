import express from 'express';
import User from '../../models/user.js';

const router = express.Router();

router.delete('/Delete', async (req, res) => {
    const { UserId } = req.query;
    if (!UserId) {
        return res.status(400).json({ message: "UserId is required" });
    }
    try {
        const deleteUser = await User.deleteOne({_id: UserId});
        if (!deleteUser) {
            res.status(400).json({ error: "User not deleted!" });
        } else {
            res.status(200).json({ message: "User deleted successfully!" });
        }
    } catch (error) {
        console.error("Error during deletion: ", error);
        res.status(500).json({ message: "Internal server error: ", error });
    }
});

export default router;
