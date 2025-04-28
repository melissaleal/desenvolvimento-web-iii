/* arquivo modelo para postagem */

import mongoose, { Schema } from "mongoose";
import { userSchema } from "./user.js";

const postSchema = new Schema ({
    title: String,
    content: String,
    author: userSchema,
    likes: {
        type: Number,
        default: 0
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    }
});

export const Post = mongoose.model("Post", postSchema, "posts");