import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    created: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model("User", userSchema, "users");