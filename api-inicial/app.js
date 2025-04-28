const express = require("express");
const app = express();
const porta = 3000;

// habilitando o recebimento de dados em JSON para a API
app.use(express.json());

app.get("/", (requisicao, resposta) => {
    resposta.end("Acesse os recursos da API em /api/alunos");
});

/*
let aluno = {"ra", 123456789, "nome", "Melissa"};
let alunoString = {"ra": 123456789, "nome": "Melissa"};
let alunoObjeto = JSON.parse(alunoString);
console.log(alunoObjeto.nome);
console.log(JSON.stringify(alunoObjeto));


app.get("/api/alunos", (requisicao, resposta) => {
    // resposta.end("Voce fez um GET nos recursos de alunos");
    resposta.json(
        {
            "RA": 123456789,
            "Nome": "Melissa",
            "Curso": "Desenvolvimento de Software Multiplataforma"
        }
    )
});

app.post("/api/alunos", (requisicao, resposta) =>{
    resposta.end("Você fez um POST em /api/alunos");
});


app.listen(porta, () =>{
    console.log(`Aguardando conexões na porta ${porta}`);
});

*/

let produtos = []; // inicializando uma lista/vetor vazia
let produto1 = {}; // inicializando um objeto vazio
produto1.id = 1;
produto1.nome = "Apple AirPods";
produto1.preco = 1945.3;
produto1.imagem = "airpods.jpg";

// adicionando o primeiro produto à lista
produtos.push(produto1);

// criando outro produto
let produto2 = {
    "id": 2, 
    "nome": "Violão", 
    "preco": 399.50, 
    "imagem": "violao.jpg"
};

// adicionando o segundo produto à lista
produtos.push(produto2);

// adicionando um terceiro produto à lista
produtos.push({
    "id": 3,
    "nome": "Suco de laranja",
    "preco": 19.99,
    "imagem": "suco.jpg"
})

app.get("/", (requisicao, resposta) => {
    resposta.end("Acesse os recursos da API em /api/produtos");
});

// GET na rota /api/produtos retorna todos os dados cadastrados
app.get("/api/produtos", (requisicao, resposta) => {
    resposta.json(produtos);
});

// GET na rota /api/produtos retorna um produto específico, utilizando como parâmetro o id
app.get("/api/produtos/:id", (requisicao, resposta) => {
    /* 
    buscando, dentro da lista produtos, um elemento cujo id seja igual ao id passado como parâmetro na requisição GET.
    caso seja encontrado, será copiado para a constante "produtoBuscado"
    */
    const produtoBuscado = produtos.find((elemento) => elemento.id == requisicao.params.id);
    if (produtoBuscado) {
        // se o id for encontrado, o retorno é o código 200 (OK)
        resposta.status(200).json(produtoBuscado);
    } else{
        // se não, o retorno é o código 404 (Not Found) junto a um json com mensagem de erro
        resposta.status(404).json({"erro": "id não encontrado"});
    }
});

// POST na rota /api/produtos inclui um produto no "banco de dados"
app.post("/api/produtos", (requisicao, resposta) => {
    // criando novo objeto produto contendo os dados passados pelo POST
    let novoProduto = {
        "id": requisicao.body.id,
        "nome": requisicao.body.nome,
        "preco": requisicao.body.preco,
        "imagem": requisicao.body.imagem
    };
    produtos.push(novoProduto);
    // retornando o código de status HTTP 201 (CREATED) junto aos dados do produto
    resposta.status(201).json(novoProduto);
});

app.delete("/api/produtos/:id", (requisicao, resposta) => {
    // procurando o produto a ser deletado da lista
    const indice = produtos.findIndex((elemento) => elemento.id == requisicao.params.id);

    // se o índice for negativo, a função findIndex() não encontrou o elemento
    if (indice < 0){
        resposta.status(404).json({"erro": "id não encontrado"});
    } else {
        // removendo apenas um elemento, segundo parâmetro com valor 1, a partir do índice passado no primeiro parâmetro
        produtos.splice(indice, 1);
        resposta.status()
    }
});

// PUT altera os dados do produto que possui o "id" passado como parâmetro
app.put("/api/produtos/:id", (requisicao, resposta) => {
    // procurando o produto a ser alterado
    const indice = produtos.findIndex((elemento) => elemento.id == requisicao.params.id);

    // se o índice for negativo, a função findIndex() não encontrou o elemento
    if (indice < 0){
        resposta.status(404).json({"erro": "id não encontrado"});
    } else {
        // produto encontrado
        // obtendo os dadps do produto a partir do corpo da requisição
        let produtoAlterado = {
            "id": requisicao.body.id,
            "nome": requisicao.body.nome,
            "preco": requisicao.body.preco,
            "imagem": requisicao.body.imagem
        }
        produtos[indice] = produtoAlterado;
        resposta.status(200).json({"mensagem": "produto alterado"});
    }
})

app.listen(porta, () => {
    console.log(`Aguardando conexões na porta ${porta}`);
});