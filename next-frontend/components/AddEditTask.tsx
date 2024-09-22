import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export const AddEditTask = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [duedate, setDuedate] = useState<Date>();
    const [errors, setErrors] = useState({ title: "", description: "", status: "", priority: "", duedate: "" });

    const validateForm = () => {
        let valid = true;
        const newErrors = { title: "", description: "", status: "", priority: "", duedate: "" };

        if (!title) {
            newErrors.title = "Title is required.";
            valid = false;
        }

        if (!description) {
            newErrors.description = "Description is required.";
            valid = false;
        }

        if (!status) {
            newErrors.status = "Status is required.";
            valid = false;
        }

        if (!priority) {
            newErrors.priority = "Priority is required.";
            valid = false;
        }

        if (!duedate) {
            newErrors.duedate = "Due Date is required.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ title: "", description: "", status: "", priority: "", duedate: "" });
        if (!validateForm()) {
            return;
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={toggleModal}>
            <DialogTrigger asChild>
                <Button onClick={toggleModal} variant="outline">Add Task</Button>
            </DialogTrigger>
            <form onSubmit={handleSubmit}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Task</DialogTitle>
                        <DialogDescription>
                            Add task to your list here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Title
                            </Label>
                            <Input
                                id="title"
                                className="col-span-3"
                                type="text"
                                placeholder="enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">
                                Description
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                type="text"
                                placeholder="enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">
                                Status
                            </Label>
                            <div id="title" className="col-span-3">
                                <Select value={status} onValueChange={(value) => setStatus(value)}>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="To Do">To Do</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-red-600 text-sm">{errors.status}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">
                                Priority
                            </Label>
                            <div id="description" className="col-span-3">
                                <Select value={priority} onValueChange={(value) => setPriority(value)}>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.priority && <p className="text-red-600 text-sm">{errors.priority}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="duedate">
                                Due Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !duedate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {duedate ? format(duedate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={duedate}
                                        onSelect={setDuedate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.duedate && <p className="text-red-600 text-sm">{errors.duedate}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>Save task</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
