// importar biblioteca
const mysql = require("mysql2");
const readline = require("readline-sync");

// Conexão com o banco de dados MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "laboratorio_informatica"
});

// Função para Cadastrar
function cadastrar() {
    const patrimonio = readline.question("Escreva o patrimonio do computador: ");
    const localizacao = readline.question("Escreva a localizacao : ");
    const responsavel = readline.question("Responsavel do computador: ");
    const statos = readline.question("Status do computador: ");


    const insert = "INSERT INTO computador (patrimonio, localizacao, responsavel, statos) VALUES (?, ?, ?, ?)";

    conexao.query(insert, [patrimonio, localizacao, responsavel, statos], function (erro) {
        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Comutador cadastrado com sucesso!");
        }

        menu();
    });
}

// Função para Listar
function listar() {
    const sql = "SELECT * FROM computador";

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
                    computador.localizacao + " - " +
                    computador.responsavel + " - " +
                    computador.statos
                );

            });
        }

        menu();
    });
}

// Função para Atualizar
function atualizar() {
    const id = readline.questionInt("Digite o ID do computador: ");
    
    const patrimonio = readline.question("Escreva o novo patrimonio do computador: ");
    const localizacao = readline.question("Escreva a nova localizacao : ");
    const responsavel = readline.question("Novo responsavel do computador: ");
    const statos = readline.question("Status novo do computador: ");
     
    const update = `UPDATE computador SET patrimonio = ?, localizacao = ?,  responsavel = ?, statos = ? WHERE id = ?`;
    
        conexao.query(update, [patrimonio, localizacao, responsavel, statos, id], function (erro, resultado) {
     
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

// Função para Excluit
function excluir() {
    const id = readline.questionInt("Digite o ID do computador: ");
    
        const confirmar = readline.question("Deseja realmente excluir este computador? (S/N): ")
    
        if (confirmar.toUpperCase() == "S") {
    
            const deletar = "DELETE FROM computador WHERE id = ?";
    
            conexao.query(deletar, [id], function (erro, resultado) {
    
            if (erro) {
                console.log("Erro ao excluir o computador.");
                    } else if (resultado.affectedRows === 0) {
                        console.log("Computador não encontrado.");
                    } else {
                        console.log("Computador excluído com sucesso!");
                    }
    
                    menu();
            }) ;   
               
        } else {    
            console.log("Exclusão cancelada.")
            menu();
        }
}

// Função para exibir o menu de opções
function menu() {

    console.log("\n===== CONTROLE LABORÁTORIO =====");
    console.log("1 - Cadastrar Computador");
    console.log("2 - Excluir Computador");
    console.log("3 - Atualizar Computador");
    console.log("4 - Listar Computador");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrar();

    } else if (opcao === 2) {

        excluir();

    } else if (opcao === 3) {

        atualizar();

    } else if (opcao === 4) {

        listar();

    } else if (opcao === 0) {

        console.log("Programa encerrado.");
        conexao.end();

    } else {

        console.log("Opcao invalida.");
        menu();

    }
}

menu();