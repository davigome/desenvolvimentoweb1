const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_livro"
});

// Função para cadastrar livro
function cadastrarLivro() {
    const titulo = readline.question("Digite o nome do seu livro: ");
    const autor = readline.question("Digite o nome do autor: ");

    const insert = "INSERT INTO livros (titulo, autor) VALUES (?, ?)";

    conexao.query(insert, [titulo, autor], function(erro) {
        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro)
        } else {
            console.log("Livro cadastrado com sucesso!")
        }

        menu();
    })
}

// Função para excluir aluno
function excluirLivro() {
    const id = readline.questionInt("Digite o ID do Livro: ")
    const deletar = "DELETE FROM livros WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado) {
        if (erro) {
            console.log("Erro ao excluir.");
        } else if (resultado.affectedRows == 0) {
            console.log("Aluno não encontrado.");
        } else {
            console.log("Livro excluído com sucesso!");
        }

        menu();
    });
}

// ID que será atualizado
function atualizarLivro() {
 
    const id = readline.questionInt("Digite o ID do livro: ");

    const titulo = readline.question("Digite o novo titulo do livro: ");
    const autor = readline.question("Digite o novo autor do livro: ");
 
    const update = `UPDATE livros SET titulo = ?, autor = ? WHERE id = ?`;

    conexao.query(update, [titulo, autor, id], function (erro, resultado) {
 
        if (erro) {
        console.log("Erro ao atualizar o livro.");
        console.log(erro);
        } else if (resultado.affectedRows === 0) {
        console.log("Livro não encontrado.");
        } else {
        console.log("Livro atualizado com sucesso!");
        }
 
       menu();
    });

}

// Função para listar alunos
function listarLivro() {
    const sql = "SELECT * FROM livros";

    conexao.query(sql, function (erro, livro) {
        if (erro) {
            console.log("Erro ao buscar livro.");
        } else {
            console.log("\n--- LIVROS ---");

            livro.forEach(function (livro) {
                console.log(
                    livro.id + "-" +
                    livro.titulo + "-" +
                    livro.autor 
                );
            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar livro");
    console.log("2 - Excluir livro");
    console.log("3 - Atualizar livro");
    console.log("4 - Listar livro");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

if (opcao === 1) {

        cadastrarLivro();

    } else if (opcao === 2) {

        excluirLivro();

    } else if (opcao === 3) {

        atualizarLivro();

    } else if (opcao === 4) {

        listarLivro();

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