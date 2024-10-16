import jwt from 'jsonwebtoken'; 

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "You are not authenticated." });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Token is not correct!" });
            } else {
                req.id = decoded.id;
                req.name = decoded.name;
                req.role = decoded.role;
                next();
            }
        });
    }
};

export default verifyToken;
