import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Task } from "../database/db";
import { auth } from "../middlewares/auth";
import { CustomRequest } from "../interface/CustomRequest";

dotenv.config();
export const taskRouter = express.Router();
const secret = process.env.JWT_Sectret as string;

taskRouter.post("/add", auth, async (req: CustomRequest, res: Response) => {
    try {
        const { title, description, status, priority, duedate } = req.body;
        const userId = req.userId;
        const task = await Task.create({ title, description, status, priority, duedate, userId });
        if (task) {
            return res.status(201).json({
                "message": "task added successfully",
            })
        } else {
            return res.status(400).json({
                "message": "error occurred while adding task",
            })
        }
    } catch (ex) {
        console.log("exception at add route", ex);
    }
})