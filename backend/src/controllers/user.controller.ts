import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET!;


export async function registerUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    

    if (!username || !email || !password) {
      return res.status(400).json({success:false, message: "All fields are required" });
    }

    const alreadyExists = await User.findOne({ email});

    if (alreadyExists) {
      return res.status(409).json({success:false, message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error: any) {
    console.error("Register error:", error.message);
    return res.status(500).json({success:false, message: "Internal server error" });
  }
}


export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({success:false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success:false,message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id.toString(),email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    ) ;

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      },
      success:true
    });

  } catch (error: any) {
    console.error("Login error:", error.message);
    return res.status(500).json({success:false, message: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response) {
  return res.status(200).json({
    message: "Logout successful",
    success:true
  });
}