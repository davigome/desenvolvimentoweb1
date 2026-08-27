const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_tarefa"
});

// Função para cadastrar 
function cadastrarTarefa() {

    const descricao = readline.question("Digite sua descrição: ");
    const responsavel = readline.question("Digite seu nome: ");

    const insert = "INSERT INTO tarefas (descricao, responsavel) VALUES (?, ?)";

    conexao.query(insert, [descricao, responsavel], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Tarefa cadastrada com sucesso!");
        }

        menu();
    });
}

// Função para excluir 
function excluirTarefa() {

    const id = readline.questionInt("Digite o ID da tarefa: ");

    const deletar = "DELETE FROM produtos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir tarefa.");
        } else if (resultado.affectedRows === 0) {
            console.log("Tarefa não encontrada.");
        } else {
            console.log("Tarefa excluída com sucesso!");
        }

        menu();
    });
}

// Função para listar 
function listarTarefa() {

    const sql = "SELECT * FROM tarefas";

    conexao.query(sql, function (erro, tarefas) {

        if (erro) {
            console.log("Erro ao buscar tarefa.");
            console.log(erro);
        } else {

            console.log("\n--- TAREFAS ---");

            tarefas.forEach(function (tarefa) {

                console.log(
                    tarefa.id + " - " +
                    tarefa.resonsavel + " - " +
                    tarefa.descricao
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar tarefa");
    console.log("2 - Excluir tarefa");
    console.log("3 - Listar tarefa");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrarTarefa();

    } else if (opcao === 2) {

        excluirTarefa();

    } else if (opcao === 3) {

        listarTarefa();

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