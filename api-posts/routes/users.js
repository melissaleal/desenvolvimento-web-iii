import { createUser, listUsers, editUser, deleteUser } from "../services/users.js";

export function routesUsers(app){
    // GET - rota para obter todos os usuários
    app.get("/api/users", async (request, response) => {
        return response.json(await listUsers());
    });

    // GET - rota para obter um usuário por id
    app.get("/api/users/:id", async (request, response) => {
        return response.json(await listUsers({_id: request.params.id }));
    });

    // POST - rota para incluir usuários
    app.post("/api/users", async (request, response) => {
        try{
            const users = await listUsers({"username": request.body.username});
            if(users.length > 0){
                return response.status(403).json({"error": "username already exists"});
            }
            const userIncluded = await createUser(request.body);
            return response.status(201).json(userIncluded);
        }catch(error){
            return response.status(500).json({"error": error});
        }
    });

    // PATCH - rota para alterar dados de um usuário
    app.patch("/api/users/:id", async (request, response) => {
        try{
            const userEdited = await editUser(request.params.id, request.body);
            return response.json(userEdited);
        }catch(error){
            return response.status(500).json({"error": error});
        }
    });

    // DELETE - rota para deletar um usuário
    app.delete("/api/users/:id", async (request, response) => {
        try{
            const { deletedCount } = await deleteUser(request.params.id);
            if (deletedCount > 0){
                return response.json({"deleted": true});
            }
            return response.json({"deleted": false});
        }catch(error){
            return response.status(500).json({"error": error});
        }
    });
}