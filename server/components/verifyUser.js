import jwt from 'jsonwebtoken'; 

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("Token in verifyUser.js in back-end: ", token);
    if (!token) {
        return res.status(401).json({ error: "You are not authenticated." });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Token is not correct!" });
            } else {
                req.name = decoded.name;
                req.role = decoded.role;
                next();
            }
        });
    }
};

export default verifyUser;
