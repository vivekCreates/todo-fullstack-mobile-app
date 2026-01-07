import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/user.controller";
import { User } from "../models/user.model";

export interface JWTPayload{
    userId?:string;
    iat:number;
    exp:number;
    id:string;
    email:string;
}


export const authMiddleware = async(req:Request, res:Response, next:NextFunction) => {
    try {
      const token = req.headers.authorization;

if (!token) {
  return res.status(401).json({ message: "Unauthorized" });
}


console.log("token",token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decoded = jwt.verify(token,JWT_SECRET) as JWTPayload;
    console.log("decoded",decoded);
        const decodedUser = await User.findById(decoded.id || decoded?.userId).select("-password");

        if(!decodedUser){
            return res.status(401).json({ message: "Unauthorized: User not found" });    
        }
        req.user = {
            id: decodedUser._id.toString(),
            email: decodedUser.email,
        };

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });    
    }
    next();
}