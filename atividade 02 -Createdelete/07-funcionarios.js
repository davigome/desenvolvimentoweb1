const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "empresa"
});
 
// Dados que serão cadastrados
const nome = "João";
const cargo = "Vendedor";
const salario = 2500.00;
 
// Comando SQL
const insert = "INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [nome, cargo, salario], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Funcionário cadastrado com sucesso!");
    }
   
});
 
 
// ID do funcionário que será excluido
const id = 6;
 
const deletar = "DELETE FROM  funcionarios WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o funcionário.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Funcionário não encontrado.");
    } else {
        console.log("Funcionário excluido com sucesso!");
    }
    conexao.end();
});