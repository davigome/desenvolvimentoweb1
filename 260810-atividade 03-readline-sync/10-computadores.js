const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_computadores"
});

// Função para cadastrar 
function cadastrarComputador() {

    const patrimonio = readline.question("Digite o nome do patrimonio: ");
    const localizacao = readline.question("Digite a localizacao: ");

    const insert = "INSERT INTO computadores (patrimonio, localizacao) VALUES (?, ?)";

    conexao.query(insert, [patrimonio, localizacao], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Computador cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir 
function excluirComputador() {

    const id = readline.questionInt("Digite o ID do computador: ");

    const confirmar = readline.question("Deseja realmente excluir este computador? (S/N): ")

    if (confirmar.toUpperCase() == "S") {

        const deletar = "DELETE FROM computadores WHERE id = ?";

        conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o computador.");
                } else if (resultado.affectedRows === 0) {
                    console.log("Computador não encontrado.");
                } else {
                    console.log("Computador excluído com sucesso!");
                }

                menu();
        });   
           
    } else {    
        console.log("Exclusão cancelada.")
        menu();
    }
}

// ID do aluno que será atualizado
function atualizarComputador() {
 
    const id = readline.questionInt("Digite o ID do computador: ");

    const patrimonio = readline.question("Digite o novo patrimonio do computador: ");
    const localizacao = readline.question("Digite o novo localizacao do computador: ");
 
    const update = `UPDATE computadores SET patrimonio = ?, localizacao = ? WHERE id = ?`;

    conexao.query(update, [patrimonio, localizacao, id], function (erro, resultado) {
 
        if (erro) {
        console.log("Erro ao atualizar o computador.");
        console.log(erro);
        } else if (resultado.affectedRows === 0) {
        console.log("Computador não encontrado.");
        } else {
        console.log("Computador atualizado com sucesso!");
        }
 
       menu();
    });

}

// Função para listar 
function listarComputador() {

    const sql = "SELECT * FROM computadores";

    conexao.query(sql, function (erro, computadores) {

        if (erro) {
            console.log("Erro ao buscar computador.");
            console.log(erro);
        } else {

            console.log("\n--- COMPUTADORES ---");

            computadores.forEach(function (computador) {

                console.log(
                    computador.id + " - " +
                    computador.patrimonio + " - " +
                    computador.localizacao
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar computador");
    console.log("2 - Excluir computador");
    console.log("3 - Atualizar computador");
    console.log("4 - Listar computador");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrarComputador();

    } else if (opcao === 2) {

        excluirComputador();

    } else if (opcao === 3) {

        atualizarComputador();

    } else if (opcao === 4) {

        listarComputador();

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