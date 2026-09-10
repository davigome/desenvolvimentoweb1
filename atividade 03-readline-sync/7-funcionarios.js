const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_funcionarios"
});

// Função para cadastrar 
function cadastrarFuncionario() {

    const nome = readline.question("Digite o nome do Funcionario: ");
    const cargo = readline.question("Digite o cargo do Funcionario: ");

    const insert = "INSERT INTO funcionarios (nome, cargo) VALUES (?, ?)";

    conexao.query(insert, [nome, cargo], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Funcionario cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para excluir 
function excluirFuncionario() {

    const id = readline.questionInt("Digite o ID do Funcionario: ");

    const confirmar = readline.question("Deseja realmente excluir este funcionário? (S/N): ")

    if (confirmar.toUpperCase() == "S") {

        const deletar = "DELETE FROM funcionarios WHERE id = ?";

        conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o Funcionario.");
                } else if (resultado.affectedRows === 0) {
                    console.log("Funcionario não encontrado.");
                } else {
                    console.log("Funcionario excluído com sucesso!");
                }

                menu();
        }) ;   
           
    } else {    
        console.log("Exclusão cancelada.")
        menu();
    }
}

// ID do aluno que será atualizado
function atualizarFuncionario() {
 
    const id = readline.questionInt("Digite o ID do funcionario: ");

    const nome = readline.question("Digite o novo nome do funcionario: ");
    const cargo = readline.question("Digite o novo cargo do funcionario: ");
 
    const update = `UPDATE funcionarios SET nome = ?, cargo = ? WHERE id = ?`;

    conexao.query(update, [nome, cargo, id], function (erro, resultado) {
 
        if (erro) {
        console.log("Erro ao atualizar o funcionario.");
        console.log(erro);
        } else if (resultado.affectedRows === 0) {
        console.log("Funcionario não encontrado.");
        } else {
        console.log("Funcionario atualizado com sucesso!");
        }
 
       menu();
    });

}

// Função para listar 
function listarFuncionario() {

    const sql = "SELECT * FROM funcionarios";

    conexao.query(sql, function (erro, funcionarios) {

        if (erro) {
            console.log("Erro ao buscar funcionario.");
            console.log(erro);
        } else {

            console.log("\n--- FUNCIONARIOS ---");

            funcionarios.forEach(function (funcionario) {

                console.log(
                    funcionario.id + " - " +
                    funcionario.nome + " - " +
                    funcionario.cargo
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar funcionario");
    console.log("2 - Excluir funcionario");
    console.log("3 - Atualizar funcionario");
    console.log("4 - Listar funcionario");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

if (opcao === 1) {

        cadastrarFuncionario();

    } else if (opcao === 2) {

        excluirFuncionario();

    } else if (opcao === 3) {

        atualizarFuncionario();

    } else if (opcao === 4) {

        listarFuncionario();

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