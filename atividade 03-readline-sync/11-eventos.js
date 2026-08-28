const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_eventos"
});

// Função para cadastrar 
function cadastrarEvento() {

    const nome = readline.question("Digite o nome do evento: ");
    const data_evento = readline.question("Digite a data do evento: ");

    const insert = "INSERT INTO eventos (nome, data_evento) VALUES (?, ?)";

    conexao.query(insert, [nome, data_evento], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Evento cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir 
function excluirEvento() {

    const id = readline.questionInt("Digite o ID do evento: ");

    const confirmar = readline.question("Deseja realmente excluir este evento? (S/N): ")

    if (confirmar.toUpperCase() == "S") {

        const deletar = "DELETE FROM eventos WHERE id = ?";

        conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o evento.");
                } else if (resultado.affectedRows === 0) {
                    console.log("Evento não encontrado.");
                } else {
                    console.log("Evento excluído com sucesso!");
                }

                menu();
        });   
           
    } else {    
        console.log("Exclusão cancelada.")
        menu();
    }
}

// ID do aluno que será atualizado
function atualizarEvento() {
 
    const id = readline.questionInt("Digite o ID do evento: ");

    const nome = readline.question("Digite o novo nome do evento: ");
    const data_evento = readline.question("Digite a nova data do evento: ");
 
    const update = `UPDATE eventos SET nome = ?, data_evento = ? WHERE id = ?`;

    conexao.query(update, [nome, data_evento, id], function (erro, resultado) {
 
        if (erro) {
        console.log("Erro ao atualizar o evento.");
        console.log(erro);
        } else if (resultado.affectedRows === 0) {
        console.log("Evento não encontrado.");
        } else {
        console.log("Evento atualizado com sucesso!");
        }
 
       menu();
    });

}

// Função para listar 
function listarEvento() {

    const sql = "SELECT * FROM eventos ORDER BY data_evento ASC;";

    conexao.query(sql, function (erro, eventos) {

        if (erro) {
            console.log("Erro ao buscar evento.");
            console.log(erro);
        } else {

            console.log("\n--- EVENTOS ---");

            eventos.forEach(function (evento) {

                console.log(
                    evento.id + " - " +
                    evento.nome + " - " +
                    evento.data_evento
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar evento");
    console.log("2 - Excluir evento");
    console.log("3 - Atualizar evento");
    console.log("4 - Listar evento");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrarEvento();

    } else if (opcao === 2) {

        excluirEvento();

    } else if (opcao === 3) {

        atualizarEvento ();

    } else if (opcao === 4) {

        listarEvento();

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