const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_clientes"
});

// Função para cadastrar Cliente
function cadastrarCliente() {

    const nome = readline.question("Digite o nome do cliente: ");
    const telefone = readline.question("Digite o telefone do cliente: ");

    const insert = "INSERT INTO clientes (nome, telefone) VALUES (?, ?)";

    conexao.query(insert, [nome, telefone], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Cliente cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir Cliente
function excluirCliente() {

    const id = readline.questionInt("Digite o ID do cliente: ");

    const deletar = "DELETE FROM clientes WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o Cliente.");
        } else if (resultado.affectedRows === 0) {
            console.log("Cliente não encontrado.");
        } else {
            console.log("Cliente excluído com sucesso!");
        }

        menu();
    });
}

// ID do aluno que será atualizado
function atualizarCliente() {
 
    const id = readline.questionInt("Digite o ID: ");

    const nome = readline.question("Digite o novo nome: ");
    const telefone = readline.question("Digite o novo telefone: ");
 
    const update = `UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?`;

    conexao.query(update, [nome, telefone, id], function (erro, resultado) {
 
        if (erro) {
        console.log("Erro ao atualizar.");
        console.log(erro);
        } else if (resultado.affectedRows === 0) {
        console.log("Não encontrado.");
        } else {
        console.log("Atualizado com sucesso!");
        }
 
       menu();
    });

}

// Função para listar Cliente
function listarCliente() {

    const sql = "SELECT * FROM clientes";

    conexao.query(sql, function (erro, clientes) {

        if (erro) {
            console.log("Erro ao buscar cliente.");
            console.log(erro);
        } else {

            console.log("\n--- CLIENTES ---");

            clientes.forEach(function (cliente) {

                console.log(
                    cliente.id + " - " +
                    cliente.nome + " - " +
                    cliente.telefone + " - " +
                    cliente.quantidade
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar");
    console.log("2 - Excluir");
    console.log("3 - Atualizar");
    console.log("4 - Listar");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

if (opcao === 1) {

        cadastrarCliente();

    } else if (opcao === 2) {

        excluirCliente();

    } else if (opcao === 3) {

        atualizarCliente();

    } else if (opcao === 4) {

        listarCliente();

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