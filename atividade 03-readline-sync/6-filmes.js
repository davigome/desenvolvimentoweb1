const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_filmes"
});

// Função para cadastrar produto
function cadastrarFilme() {

    const titulo = readline.question("Digite o titulo do Filme: ");
    const ano = readline.question("Digite o ano do Filme: ");

    const insert = "INSERT INTO filmes (titulo, ano) VALUES (?, ?)";

    conexao.query(insert, [titulo, ano], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Filme cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir Filme
function excluirFilme() {

    const id = readline.questionInt("Digite o ID do Filme: ");

    const deletar = "DELETE FROM filmes WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o Filme.");
        } else if (resultado.affectedRows === 0) {
            console.log("Filme não encontrado.");
        } else {
            console.log("Filme excluído com sucesso!");
        }

        menu();
    });
}

// ID do aluno que será atualizado
function atualizarFilme() {
 
    const id = readline.questionInt("Digite o ID do filme: ");

    const titulo = readline.question("Digite o novo titulo do filme: ");
    const ano = readline.question("Digite o novo ano do filme: ");
 
    const update = `UPDATE filmes SET titulo = ?, ano = ? WHERE id = ?`;

    conexao.query(update, [titulo, ano, id], function (erro, resultado) {
 
        if (erro) {
        console.log("Erro ao atualizar o filme.");
        console.log(erro);
        } else if (resultado.affectedRows === 0) {
        console.log("Filme não encontrado.");
        } else {
        console.log("Filme atualizado com sucesso!");
        }
 
       menu();
    });

}

// Função para listar 
function listarFilme() {

    const sql = "SELECT * FROM filmes ORDER BY titulo ASC";

    conexao.query(sql, function (erro, filmes) {

        if (erro) {
            console.log("Erro ao buscar filmes.");
            console.log(erro);
        } else {

            console.log("\n--- FILMES ---");

            filmes.forEach(function (filme) {

                console.log(
                    filme.id + " - " +
                    filme.titulo + " - " +
                    filme.ano 
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar Filme");
    console.log("2 - Excluir Filme");
    console.log("3 - Atualizar Filme");
    console.log("4 - Listar Filme");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

if (opcao === 1) {

        cadastrarFilme();

    } else if (opcao === 2) {

        excluirFilme();

    } else if (opcao === 3) {

        atualizarFilme();

    } else if (opcao === 4) {

        listarFilme();

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