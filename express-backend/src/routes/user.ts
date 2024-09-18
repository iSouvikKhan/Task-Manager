import express, { Request, Response } from "express";
import { auth } from "../middlewares/auth";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { z } from 'zod';
import { User } from "../database/db";

dotenv.config();
export const userRouter = express.Router();
const secret = process.env.JWT_Sectret as string;

const UserSchema = z.object({
    name: z.string().min(5, 'name must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
});

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { success } = UserSchema.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "input requirement doesn't match"
            })
        }
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user?._id) {
            res.status(411).json({
                "message": "email already exists"
            })
        }
        const dbUser = await User.create({ name, email, password });
        if (dbUser) {
            const token = jwt.sign({
                userId: dbUser._id
            }, secret, { expiresIn: '1h' });
            return res.status(201).json({
                "message": "user created successfully",
                "token": "Bearer " + token,
            })
        } else {
            return res.status(411).json({
                "message": "error occurrec while user creation",
            })
        }
    } catch (ex) {
        console.log("exception at signup route", ex);
    }
})