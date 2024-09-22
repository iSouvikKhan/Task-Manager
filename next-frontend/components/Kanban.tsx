"use client"

import axios from "axios";
import {
    DropResult,
    DragDropContext,
} from "@hello-pangea/dnd";
import { Column } from "./Column";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { backendUrl } from "@/config/ApiConfig";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: "Low" | "High";
    email: string;
    duedate: Date;
}

export const Kanban = () => {

    const [tasks, setTask] = useState<Task[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/");
            return;
        }
        getAllTasks();
    }, [])

    const getAllTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${backendUrl}/api/v1/task/getall`,
                {
                    headers: {
                        'authorization': token,
                    },
                }
            )
            if (response.status === 200) {
                setTask(response.data.tasks);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    localStorage.removeItem("token");
                    router.push("/");
                } else if (error.request) {
                    localStorage.removeItem("token");
                    router.push("/");
                }
            } else {
                localStorage.removeItem("token");
                router.push("/");
            }
        }
    }

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const draggedTask = tasks!.find(
            (task) => task._id === draggableId
        );

        let status: string;

        switch (destination.droppableId) {
            case "todo":
                status = "To Do";
                break;
            case "inProgress":
                status = "In Progress";
                break;
            case "completed":
                status = "Completed";
                break;
            default:
                status = draggedTask!.status;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(`${backendUrl}/api/v1/task/status/${draggableId}`, { status },
                {
                    headers: {
                        'authorization': token,
                    },
                }
            )
        } catch (error) {
            localStorage.removeItem("token");
            router.push("/");
        }

        const updatedTask = tasks!.map((task) => {
            if (task._id === draggableId) {
                return {
                    ...task,
                    status,
                };
            }
            return task;
        });

        setTask(updatedTask);
    };

    return (
        <>
            <div className="dark:bg-gray-900 py-10 relative h-screen">
                <h1 className="font-bold text-center mb-10 text-3xl underline underline-offset-4">
                    Kanban Board
                </h1>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap-10">
                        <Column
                            title="To do"
                            tasks={tasks!.filter(
                                (task) => task.status === "To Do"
                            )}
                            droppableId="todo"
                        />
                        <Column
                            title="In Progress"
                            tasks={tasks!.filter(
                                (task) => task.status === "In Progress"
                            )}
                            droppableId="inProgress"
                        />
                        <Column
                            title="Completed"
                            tasks={tasks!.filter(
                                (task) => task.status === "Completed"
                            )}
                            droppableId="completed"
                        />
                    </div>
                </DragDropContext>
            </div>
        </>
    )
}