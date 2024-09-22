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
        return res.status(400).json({
            "message": "exception at add route",
        })
    }
})

taskRouter.get("/getall", auth, async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const tasks = await Task.find({ userId });
        if (tasks) {
            return res.status(200).json({
                "message": "tasks retrieved successfully",
                tasks
            })
        } else {
            return res.status(400).json({
                "message": "error occurred while getting task",
            })
        }
    } catch (ex) {
        return res.status(400).json({
            "message": "exception at getall route",
        })
    }
})