const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_jogos"
});

// Função para cadastrar 
function cadastrarJogo() {

    const nome = readline.question("Digite o nome do jogo: ");
    const genero = readline.question("Digite o genero do jogo: ");

    const insert = "INSERT INTO jogos (nome, genero) VALUES (?, ?)";

    conexao.query(insert, [nome, genero], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Jogo cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir 
function excluirJogo() {

    const id = readline.questionInt("Digite o ID do jogo: ");

    const deletar = "DELETE FROM jogos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o jogo.");
        } else if (resultado.affectedRows === 0) {
            console.log("Jogo não encontrado.");
        } else {
            console.log("Jogo excluído com sucesso!");
        }

        menu();
    });
}

// ID do que será atualizado
function atualizarJogo() {
 
    const id = readline.questionInt("Digite o ID: ");

    const nome = readline.question("Digite o novo nome: ");
    const genero = readline.question("Digite o novo genero: ");
 
    const update = `UPDATE jogos SET nome = ?, genero = ? WHERE id = ?`;

    conexao.query(update, [nome, genero, id], function (erro, resultado) {
 
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

// Função para listar Produtos
function listarJogo() {

    const sql = "SELECT * FROM jogos";

    conexao.query(sql, function (erro, jogos) {

        if (erro) {
            console.log("Erro ao buscar jogo.");
            console.log(erro);
        } else {

            console.log("\n--- Jogos ---");

            jogos.forEach(function (jogo) {

                console.log(
                    jogo.id + " - " +
                    jogo.nome + " - " +
                    jogo.genero
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar ");
    console.log("2 - Excluir ");
    console.log("3 - Atualizar ");
    console.log("4 - Listar ");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

if (opcao === 1) {

        cadastrarJogo();

    } else if (opcao === 2) {

        excluirJogo();

    } else if (opcao === 3) {

        atualizarJogo();

    } else if (opcao === 4) {

        listarJogo();

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