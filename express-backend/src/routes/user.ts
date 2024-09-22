import express, { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { z } from 'zod';
import { User } from "../database/db";
import bcrypt from "bcrypt";

dotenv.config();
export const userRouter = express.Router();
const secret = process.env.JWT_Sectret as string;

const SignupSchema = z.object({
    name: z.string().min(5, 'name must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
});

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { success } = SignupSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "signup input requirement does not match"
            })
        }
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ email });
        if (user?._id) {
            return res.status(400).json({
                "message": "user already exists"
            })
        }
        const dbUser = await User.create({ name, email, password: hashedPassword });
        if (dbUser) {
            const token = jwt.sign({
                userId: dbUser._id
            }, secret, { expiresIn: '1h' });
            return res.status(201).json({
                "message": "user created successfully",
                "token": "Bearer " + token,
            })
        } else {
            return res.status(400).json({
                "message": "error occurred while user creation",
            })
        }
    } catch (ex) {
        console.log("exception at signup route", ex);
    }
})

const SigninSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
});

userRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const { success } = SigninSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "signin input requirement does not match"
            })
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                "message": "user does not exist",
            })
        } else if(user) {
            if(await bcrypt.compare(password as string, user.password as string)) {
                const token = jwt.sign({
                    userId: user._id
                }, secret, { expiresIn: '1h' });
                if(token) {
                    return res.status(201).json({
                        "message": "signin successful",
                        "token": "Bearer " + token,
                    })
                } else {
                    return res.status(400).json({
                        "message": "error occurred while signin",
                    })
                }
            } else {
                return res.status(400).json({
                    "message": "password does not match",
                })
            }
        }
    } catch (ex) {
        console.log("exception at signup route", ex);
    }
})