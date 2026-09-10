const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loja"
});
 
// Dados que serão cadastrados
const produto = "Nootebook Gamer";
const quantidade = 10;
const valor = 50.00;
 
// Comando SQL
const insert = "INSERT INTO vendas (produto, quantidade, valor) VALUES (?, ?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [produto, quantidade, valor], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Venda cadastrada com sucesso!");
    }
   
});
 
 
// ID do produto que será excluido
const id = 6;
 
const deletar = "DELETE FROM  vendas WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir a venda.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Venda não encontrada.");
    } else {
        console.log("Venda excluida com sucesso!");
    }
    conexao.end();
});