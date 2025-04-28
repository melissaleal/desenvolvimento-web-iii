import { connectDatabase } from "./db/connection.js";
import { User } from "./assets/user.js";
import { Post } from "./assets/post.js";

async function test() {
    await connectDatabase();

    const newUser = new User({
        username: "meli",
        email: "meli@me.skz",
        password: "seungmo",
        name: "Melissa"
    })

    const user = await newUser.save();

    const newPost = new Post({
        title: "First post",
        content: "This is the first page's content.",
        author: user,
        tags: ["new", "post"]
    });

    const post = await newPost.save();
};

test();