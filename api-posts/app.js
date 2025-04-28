import express from "express";
import { connectDatabase } from "./db/connection.js";
import { routesUsers } from "./routes/users.js";
import { routesPosts } from "./routes/posts.js";

const app = express();
app.use(express.json());
// exportando objeto app para criar rotas em outros arquivos
export {app};

app.get("/", (request, response) => {
    response.send("Access API through /api/assetName")
});

routesUsers(app);
routesPosts(app);

try{
    await connectDatabase();
    const port = 3000;
    app.listen(port);
    console.log(`Aguardando conexão na porta ${port}`);
} catch(error){
    console.log(`Error: ${error}`);
}