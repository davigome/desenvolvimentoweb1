const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_livros"
});

// Função para cadastrar livro
function cadastrarLivro() {
    const nome = readline.question("Digite o nome do seu livro: ");
    const autor = readline.question("Digite o nome do autor: ");

    const insert = "INSERT INTO livros (nome, autor) VALUES (?, ?)";

    conexao.query(insert, [nome, autor], function(erro) {
        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro)
        } else {
            console.log("Aluno cadastrado com sucesso!")
        }
    })
}

// Função para excluir aluno
function excluirLivro() {
    const id = readline.questionInt("Digite o ID do Livro: ")
    const deletar = "DELETE FROM livros WHARE od = ?";

    conexao.query(deletar, [id], function (erro, resultado) {
        if (erro) {
            console.log("Erro ao excluir.");
        } else if (resultado.affectedRows == 0) {
            console.log("Aluno não encontrado.");
        } else {
            console.log("Aluno excluído com sucesso!");
        }

        //menu();
    });
}

// Função para listar alunos
function listarLivro() {
    const sql = "SELECT * FROM livros";

    conexao.query(sql, function (erro, livros) {
        if (erro) {
            console.log("Erro ao buscar livro.");
        } else {
            console.log("\n--- LIVROS ---");

            livro.forEach(function (livro) {
                console.log(
                    livro.id + "-" +
                    livro.nome + "-" +
                    livro.autor 
                );
            });
        }

        //menu();
    });
}