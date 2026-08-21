const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_loja"
});

// Função para cadastrar produto
function cadastrarProduto() {

    const nome = readline.question("Digite o nome do Produto: ");
    const preco = readline.question("Digite o preço do Produto: ");
    const quantidade = readline.question("Digite a quantidade do Produto: ");

    const insert = "INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)";

    conexao.query(insert, [nome, preco, quantidade], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Produto cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir Produto
function excluirProduto() {

    const id = readline.questionInt("Digite o ID do produto: ");

    const deletar = "DELETE FROM produtos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o produto.");
        } else if (resultado.affectedRows === 0) {
            console.log("Produto não encontrado.");
        } else {
            console.log("Produto excluído com sucesso!");
        }

        menu();
    });
}

// Função para listar Produtos
function listarProduto() {

    const sql = "SELECT * FROM produtos";

    conexao.query(sql, function (erro, produtos) {

        if (erro) {
            console.log("Erro ao buscar produtos.");
            console.log(erro);
        } else {

            console.log("\n--- PRODUTOS ---");

            produtos.forEach(function (produto) {

                console.log(
                    produto.id + " - " +
                    produto.nome + " - " +
                    produto.preco + " - " +
                    produto.quantidade
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar produto");
    console.log("2 - Excluir produto");
    console.log("3 - Listar produto");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrarProduto();

    } else if (opcao === 2) {

        excluirProduto();

    } else if (opcao === 3) {

        listarProduto();

    } else if (opcao === 0) {

        console.log("Programa encerrado.");
        conexao.end();

    } else {

        console.log("Opcao invalida.");
        menu();

    }
}

// Inicia o programa
menu();