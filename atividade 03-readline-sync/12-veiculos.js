const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_veiculos"
});

// Função para cadastrar 
function cadastrarVeiculo() {

    const modelo = readline.question("Digite o nome do modelo: ");
    const placa = readline.question("Digite a placa: ");

    const insert = "INSERT INTO veiculos (modelo, placa) VALUES (?, ?)";

    conexao.query(insert, [modelo, placa], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Veiculo cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir 
function excluirVeiculo() {

    const id = readline.questionInt("Digite o ID do veiculo: ");

    const confirmar = readline.question("Deseja realmente excluir este veiculo? (S/N): ")

    if (confirmar.toUpperCase() == "S") {

        const deletar = "DELETE FROM veiculos WHERE id = ?";

        conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o veiculo.");
                } else if (resultado.affectedRows === 0) {
                    console.log("Veiculo não encontrado.");
                } else {
                    console.log("Veiculo excluído com sucesso!");
                }

                menu();
        });   
           
    } else {    
        console.log("Exclusão cancelada.")
        menu();
    }
}

// ID do aluno que será atualizado
function atualizarVeiculo() {
 
    const id = readline.questionInt("Digite o ID do veiculo: ");

    const modelo = readline.question("Digite o novo mdoelo do veiculo: ");
    const placa = readline.question("Digite a nova placa do veiculo: ");
 
    const update = `UPDATE veiculos SET modelo = ?, placa = ? WHERE id = ?`;

    conexao.query(update, [modelo, placa, id], function (erro, resultado) {
 
        if (erro) {
        console.log("Erro ao atualizar o veiculo.");
        console.log(erro);
        } else if (resultado.affectedRows === 0) {
        console.log("Veiculo não encontrado.");
        } else {
        console.log("Veiculo atualizado com sucesso!");
        }
 
       menu();
    });

}

// Função para listar 
function listarVeiculo() {

    const sql = "SELECT * FROM veiculos";

    conexao.query(sql, function (erro, veiculos) {

        if (erro) {
            console.log("Erro ao buscar veiculo.");
            console.log(erro);

        } else if (veiculos.length  === 0){
            console.log("Não existe veiculos.")
        } else {

            console.log("\n--- VEICULOS ---");

            veiculos.forEach(function (veiculo) {

                console.log(
                    veiculo.id + " - " +
                    veiculo.modelo + " - " +
                    veiculo.placa
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar veiculo");
    console.log("2 - Excluir veiculo");
    console.log("3 - Atualizar veiculo");
    console.log("4 - Listar veiculo");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrarVeiculo();

    } else if (opcao === 2) {

        excluirVeiculo();

    } else if (opcao === 3) {

        atualizarVeiculo ();

    } else if (opcao === 4) {

        listarVeiculo();

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