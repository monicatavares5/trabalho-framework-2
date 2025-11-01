import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "se é louco";

export const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(400).json({
            code: 400,
            message: "Token não informado"
        });
    }

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (e) {
        return res.status(401).json({
            code: 401,
            message: "Token inválido ou expirado",
            error: e
        });
    }
};
