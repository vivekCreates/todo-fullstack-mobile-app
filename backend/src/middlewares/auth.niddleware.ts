import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/user.controller";

interface JWTPayload{
    id:string;
    email:string;
}


export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.cookies?.token ||req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decoded = jwt.verify(token,JWT_SECRET) as JWTPayload
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });    
    }
    next();
}