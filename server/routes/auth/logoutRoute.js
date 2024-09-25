import express from 'express';

const router = express.Router();

router.get('/api/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

export default router;