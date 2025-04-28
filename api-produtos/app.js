const express = require("express");
const mongoose = require("mongoose");

const Product = require("./Product");

const app = express();
const port = 3000;

// possibilita o rebecimento de dados em json por meio de apis 
app.use(express.json());

// conexão com mongo: endereço do servidor + nome do banco (api)
// caso o banco não exista, será criado na primeira conexão
const URL_MONGODB = "mongodb://localhost:27017/bancoapi";

// iniciando procedimento de conexão ao MongoDB
mongoose.connect(URL_MONGODB);

//obtendo o objeto de acesso ao banco 
const database = mongoose.connection;

// verificando se houve erro na conexão
database.on("error", console.error.bind(console, "Falha na conexão"));

// caso a conexão seja bem sucedida
database.on("open", () => {
    console.log("Succesfully connected to MongoDB");
});

// obtendo todos os produtos
app.get("/api/products", async (request, response) => {
    try{
        const products = await Product.find();
        response.json(products);
    } catch (error){
        response.status[500].json({"erro": error})
    }
});

// obtendo produto por id
app.get("/api/products/:id", async (request, response) => {
    try{
        const product = await Product.findById(request.params.id);
        response.json(product);
    }
    catch (error){
        response.status[404].json({"resultado": "product not found"});
    }
});

// criando novo objeto produto de acordo com dados enviados no corpo da requisição
app.post("/api/products", async (request, response) => {
    const newProduct = new Product(request.body);
    //tentando salvar o produto no mongo
    try{ // aguardando a inclusão do produto e retornando uma mensagem com o corpo do objeto
        const productIncluded = await newProduct.save();
        response.json(productIncluded);
    } catch (error) { // no caso de erro, enviando a mensagem de retorno
        response.status[500].json({"Erro": error});
    }
});

// deletando produto
app.delete("/api/products/:id", async (request, response) => {
    try{
        const product = await Product.findById(request.params.id);
        if(product){
            response.json({"mensagem": "the product has been deleted"});
        }else{
            response.status[404].json({"mensagem": "product not found"});
        }
    }catch (error){
        response.status[500].json({"erro": error});
    }
});

// alterando um produto
app.put("/api/products/:id", async (request, response) => {
    let product = await Product.findById(request.params.id);
    if(!product){
        return response.status(404).json({"erro": "product not found"});
    }
    product = await Product.findByIdAndUpdate(request.params.id, request.body);
    response.json(produto);
});

app.listen(port, () => {
    console.log(`Aguardando por conexões na porta ${port}...`);
});