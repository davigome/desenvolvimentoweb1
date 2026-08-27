const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "base_clientes"
});
 
// Dados que serão cadastrados
const nome = "Juliana Costa";
const telefone = "(11) 98787-7878"; 
 
// Comando SQL
const insert = "INSERT INTO clientes (nome, telefone) VALUES (?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [nome, telefone], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Cliente cadastrado com sucesso!");
    }
   
});
 
 
// ID do cliente que será excluido
const id = 6;
 
const deletar = "DELETE FROM  clientes WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o cliente.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Cliente não encontrado.");
    } else {
        console.log("Cliente excluido com sucesso!");
    }
    conexao.end();
});