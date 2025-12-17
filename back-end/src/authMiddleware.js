import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ errCode: 1, errMessage: "No token provided" });

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ errCode: 1, errMessage: "Token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // id user sẽ có ở đây
        next();
    } catch (err) {
        return res.status(401).json({ errCode: 1, errMessage: "Invalid token" });
    }
};
