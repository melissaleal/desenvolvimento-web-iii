import { Post } from "../assets/post.js";

export async function createPost({title, content, author, tags}) {
    const post = new Post({title, content, author, tags});
    return await post.save();
}

export async function listPosts(query = {}, {sortBy = 'created', sortOrder = 'desc'} = {}) {
    return await Post.find(query).sort({[sortBy]: sortOrder});
}

export async function editPost(postId, {title, content, author, tags}) {
    return await Post.findOneAndUpdate(
        {_id: postId},
        { $set: {title, content, author, tags}},
        {new: true}
    );
}

export async function deletePost(postId){
    return await Post.findByIdAndDelete({_id: postId});
}