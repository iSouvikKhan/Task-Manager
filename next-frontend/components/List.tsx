"use client"

import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState, 
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AddEditTask } from "./AddEditTask"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios"
import { backendUrl } from "@/config/ApiConfig"

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Completed";
    priority: "Low" | "High";
    email: string;
    duedate: Date;
}


export const createColumns = (handleTaskAdded: () => void): ColumnDef<Task>[] => [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="normal-case">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="normal-case">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "priority",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Priority
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="normal-case">{row.getValue("priority")}</div>
        ),
    },
    {
        accessorKey: "duedate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Due Date
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        // cell: ({ row }) => {
        //     const date: Date = row.getValue("duedate");
        //     const formattedDate = new Intl.DateTimeFormat("en-US", {
        //         year: "numeric",
        //         month: "long",
        //         day: "numeric",
        //     }).format(date);

        //     return <div className="normal-case">{formattedDate}</div>;
        // },

        cell: ({ row }) => {
            const dateValue: Date = row.getValue("duedate");
            const date = new Date(dateValue);

            if (isNaN(date.getTime())) {
                return <div className="normal-case">Invalid date</div>;
            }

            // Format the valid date
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(date);

            return <div className="normal-case">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "action",
        header: () => <div className="text-left ml-5">Actions</div>,
        cell: ({ row }) => {
            const task = row.original;

            const handleDeleteTask = async (task: Task) => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.delete(`${backendUrl}/api/v1/task/delete/${task._id}`,
                        {
                            headers: { authorization: token },
                        });

                    if (response.status === 200) {
                        console.log("Task deleted successfully");
                        handleTaskAdded();
                    }
                } catch (error) {
                    console.error("Error deleting task:", error);
                }
            };

            return (
                <div className="flex gap-2">
                    <AddEditTask
                        task={task}
                        onTaskAdded={handleTaskAdded}
                    />

                    <Button variant="outline" size="sm" onClick={() => handleDeleteTask(task)}>
                        Delete
                    </Button>
                </div>
            );
        },
    }
]

export const List = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("");
    const [data, setData] = useState<Task[]>([]);
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
                setData(response.data.tasks);
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

    const handleTaskAdded = () => {
        getAllTasks();
    };

    const columns = createColumns(handleTaskAdded);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    })

    return (
        <div>
            <div className="flex justify-center pt-5">
                <div className="w-4/5">
                    <div className="flex justify-end">
                        <AddEditTask onTaskAdded={handleTaskAdded} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-4/5">
                    <div className="flex items-center py-4">
                        <Input
                            placeholder="Filter tasks..."
                            value={(table.getState().globalFilter as string) ?? ""}
                            onChange={(event) =>
                                table.setGlobalFilter(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
