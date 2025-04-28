import { createPost, listPosts, editPost, deletePost } from "../services/posts.js";

export function routesPosts(app){
    app.get("/api/posts", async (request, response) =>{
        if(request.body.username){
            return response.json(await listPosts({"author.username": request.query.username}));
        } else if (request.body.title){
            return response.json(await listPosts({"title": request.query.title}));
        } else if (request.body.order){
            return response.json(await listPosts({}, {"sortBy": request.body.order}));
        }
        return response.json(await listPosts());
    });

    app.get("/api/posts/:id", async (request, response) => {
        return response.json(await listPosts({ _id: request.params.id }));
    });

    app.post("/api/posts", async (request, response) => {
        try{
            const postIncluded = await createPost(request.body);
            return response.status(201).json(postIncluded);
        } catch(error){
            return response.status(500).json({"error": error});
        }
    });

    app.patch("/api/posts/:id", async (request, response) => {
        try{
            const postEdited = await editPost(request.params.id, request.body);
            return response.json(postEdited);
        } catch(error){
            return response.status(500).json({"error": error});
        }
    });

    app.delete("/api/posts/:id", async(request, response) => {
        try{
            const { deletedCount } = await deletePost(request.params.id);
            if (deletedCount > 0){
                return response.json({"deleted": true});
            }
            return response.json({"deleted": false});
        } catch (error){
            return response.status(500).json({"error": error});
        }
    });
}