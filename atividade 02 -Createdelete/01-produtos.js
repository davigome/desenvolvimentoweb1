const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ecommerce"
});
 
// Dados que serão cadastrados
const nome = "Teclado Gamer";
const preco = 180.00;
 
// Comando SQL
const insert = "INSERT INTO produtos (nome, preco) VALUES (?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [nome, preco], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Produto cadastrado com sucesso!");
    }
   
});
 
 
// ID do produto que será excluido
const id = 6;
 
const deletar = "DELETE FROM  produtos WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o produto.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Produto não encontrado.");
    } else {
        console.log("Produto excluido com sucesso!");
    }
    conexao.end();
});