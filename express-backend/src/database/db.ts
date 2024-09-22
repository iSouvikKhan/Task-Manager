import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
        trim: true,
        minLength: 3,
        maxLenght: 20,
    },
    email: {
        require: true,
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        require: true,
        type: String,
        minLength: 6,
    }
}, { timestamps: true });

const TaskSchema = new mongoose.Schema({
    title: {
        require: true,
        type: String,
        trim: true,
    },
    description: {
        require: true,
        type: String,
        trim: true,
    },
    status: {
        require: true,
        type: String,
    },
    priority: {
        require: true,
        type: String,
    },
    duedate: {
        require: true,
        type: Date,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
export const Task = mongoose.model("Task", TaskSchema);