/*
Autora ----------- Melissa Leal (https://github.com/melissaleal)
Instituicao ------ FATEC Marilia
Curso ------------ Desenvolvimento de Software Multiplataforma 
Materia ---------- Desenvolvimento Web III
Conteudo --------- Extraindo dados da API Fake Store
Atividade -------- Exercicio de aula
Data de criacao -- 19/02/2024
*/

const api = "https://fakestoreapi.com/products";

const div = document.getElementById("produtos");

fetch(api).then((resposta) => resposta.json()).then((produtos) => {
    return produtos.map((produto) => {
        const card = document.createElement("div");
        card.classList.add("cardProduto");
        div.appendChild(card);
        const divimg = document.createElement("div");
        divimg.classList.add("divimg");
        divimg.innerHTML = `<img src='${produto.image}' class="produtoimg" width="100%">`;
        card.appendChild(divimg);
        const divtxt = document.createElement("div");
        divtxt.classList.add("divtxt");
        divtxt.innerHTML = 
            `<h2>${produto.title}</h2>
            <h3>Preco: R$ ${produto.price}</h3>
            <p>${produto.description}</p>
            <p>${produto.category}</p>
            <p>Nota: ${produto.rating.rate}</p>
            <p>Avaliações: ${produto.rating.count}
            `;
        card.appendChild(divtxt);
    });
})