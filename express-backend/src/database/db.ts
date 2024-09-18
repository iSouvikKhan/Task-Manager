import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.ConnectionString as string)

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
    },
    password: {
        require: true,
        type: String,
        minLength: 6,
        maxLength: 20,
    }
});

export const User = mongoose.model("User", UserSchema);