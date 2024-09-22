"use client"

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: "Low" | "High";
    email: string;
    duedate: Date;
}

interface ColumnProps {
    title: string;
    tasks: Task[];
    droppableId: string;
}

export const Column: React.FC<ColumnProps> = ({
    title,
    tasks,
    droppableId,
}) => {

    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [taskId, setTaskId] = useState<string | null>(null);


    return (
        <>
            <div className="flex-1">
                <div className="flex gap-1 dark:text-white justify-center">
                    <h2 className="text-xl font-semibold mb-4 uppercase">
                        {title}
                    </h2>
                </div>

                <Droppable droppableId={droppableId}>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="dark:bg-gray-800 bg-gray-200 rounded-lg p-4"
                        >
                            {tasks.map((task, index) => (
                                <Draggable
                                    key={task._id}
                                    draggableId={task._id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            className="bg-slate-700 rounded p-2 mb-2 text-white flex flex-col justify-between space-y-3"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onMouseEnter={() =>
                                                setHoverIndex(index)
                                            }
                                            onMouseLeave={() => setHoverIndex(null)}
                                        >
                                            <p>Title: {task.title}</p>
                                            <p>Priority: {task.priority}</p>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </div>
        </>
    )
}