/*
Autora ----------- Melissa Leal (https://github.com/melissaleal)
Instituicao ------ FATEC Marilia
Curso ------------ Desenvolvimento de Software Multiplataforma 
Materia ---------- Desenvolvimento Web III
Conteudo --------- Extraindo dados de API
Atividade -------- Exercicio de aula
Data de criacao -- 19/02/2024
*/

const api = "https://randomuser.me/api/";
    const table = document.querySelector("table");

    fetch(api).then((resposta) => resposta.json()).then((dados) => { //conecta no endereço, pega os dados e interpreta a resposta em formato json (dados)
        const pessoas = dados.results;
        return pessoas.map((pessoa) => {
            const linha = document.createElement("tr");
            table.appendChild(linha);
            const celulafoto = document.createElement("td");
            celulafoto.innerHTML = `<img src='${pessoa.picture.medium}'>`;
            linha.appendChild(celulafoto);
            const celulanome = document.createElement("td");
            celulanome.innerHTML = pessoa.name.first + " " + pessoa.name.last;
            linha.appendChild(celulanome);
            const celulacidade = document.createElement("td");
            celulacidade.innerHTML = pessoa.location.city;
            linha.appendChild(celulacidade);
            const celulapais = document.createElement("td");
            celulapais.innerHTML = pessoa.location.country;
            linha.appendChild(celulapais);
        });
    }).catch((erro) => {
        console.log(`Erro: ${erro.message}`);
    })