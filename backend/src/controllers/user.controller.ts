import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET!;


async function registerUser(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;

        if ([username, email, password].some((field => field?.toLowerCase().trim() === ""))) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashed
        })

        if (!user) {
            return res.status(500).json({ message: "Failed to create user" });
        }

        return res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
        console.error("Error in registerUser:", error?.message);
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if ([email, password].some((field => field?.toLowerCase().trim() === ""))) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existedUser = await User.findOne({ email });
        if (!existedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existedUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id:existedUser._id.toString(), email: existedUser.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({ message: "Login successful", user: existedUser, token });
    } catch (error: any) {
        console.error("Error in loginUser:", error?.message);
    }
}