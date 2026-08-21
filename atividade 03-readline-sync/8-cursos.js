const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_cursos"
});

// Função para cadastrar produto
function cadastrarCurso() {

    const nome = readline.question("Digite o nome do curso: ");
    const carga_horaria = readline.question("Digite carga horaria do curso: ");

    const insert = "INSERT INTO produtos (nome, carga_horaria) VALUES (?, ?)";

    conexao.query(insert, [nome, carga_horaria], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Curso cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir 
function excluirCurso() {

    const id = readline.questionInt("Digite o ID do curso: ");

    const deletar = "DELETE FROM cursos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o curso.");
        } else if (resultado.affectedRows === 0) {
            console.log("Curso não encontrado.");
        } else {
            console.log("Curso excluído com sucesso!");
        }

        menu();
    });
}

// Função para listar 
function listarCurso() {

    const sql = "SELECT * FROM cursos";

    conexao.query(sql, function (erro, cursos) {

        if (erro) {
            console.log("Erro ao buscar curso.");
            console.log(erro);
        } else {

            console.log("\n--- CURSOS ---");

            cursos.forEach(function (curso) {

                console.log(
                    curso.id + " - " +
                    curso.nome + " - " +
                    curso.carga_horaria 
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar curso");
    console.log("2 - Excluir curso");
    console.log("3 - Listar curso");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrarCurso();

    } else if (opcao === 2) {

        excluirCurso();

    } else if (opcao === 3) {

        listarCurso();

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