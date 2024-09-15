import express from 'express';

const router = express.Router();

router.get('/Logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

export default router;