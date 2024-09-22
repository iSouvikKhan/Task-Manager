import express from "express";
import { userRouter } from "./user";
import { taskRouter } from "./task";

export const router = express.Router();

router.use("/user", userRouter);
router.use("/task", taskRouter);