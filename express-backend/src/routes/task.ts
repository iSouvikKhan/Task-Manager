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

taskRouter.put("/edit/:id", auth, async (req: CustomRequest, res: Response) => {
    try {
        const { title, description, status, priority, duedate } = req.body;
        const userId = req.userId;
        const _id = req.params.id;

        const updatedTask = await Task.findOneAndUpdate(
            { _id, userId },
            { title, description, status, priority, duedate },
            { new: true }
        );

        if (updatedTask) {
            return res.status(200).json({
                message: "Task updated successfully",
            });
        } else {
            return res.status(400).json({
                message: "Task not found or you do not have permission to edit it",
            });
        }
    } catch (ex) {
        return res.status(500).json({
            message: "An error occurred while updating the task",
        });
    }
});

taskRouter.delete("/delete/:id", auth, async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const _id = req.params.id;

        const deletedTask = await Task.findOneAndDelete({ _id, userId });

        if (deletedTask) {
            return res.status(200).json({
                message: "Task deleted successfully",
            });
        } else {
            return res.status(400).json({
                message: "Task not found or you do not have permission to delete it",
            });
        }
    } catch (ex) {
        return res.status(500).json({
            message: "An error occurred while deleting the task",
        });
    }
});

taskRouter.patch("/status/:id", auth, async (req: CustomRequest, res: Response) => {
    try {
        const { status } = req.body;
        const userId = req.userId;
        const _id = req.params.id;

        const updatedTask = await Task.findOneAndUpdate(
            { _id, userId },
            { status },
            { new: true }
        );

        if (updatedTask) {
            return res.status(200).json({
                message: "Task status updated successfully",
            });
        } else {
            return res.status(400).json({
                message: "Task not found or you do not have permission to edit it",
            });
        }
    } catch (ex) {
        return res.status(500).json({
            message: "An error occurred while updating the task",
        });
    }
});