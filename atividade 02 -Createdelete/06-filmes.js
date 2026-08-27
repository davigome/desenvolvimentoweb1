const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "locadora"
});
 
// Dados que serão cadastrados
const titulo = "Toy Story";
const ano = 1995;
 
// Comando SQL
const insert = "INSERT INTO filmes (titulo, ano) VALUES (?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [titulo, ano], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Filme cadastrado com sucesso!");
    }
   
});
 
 
// ID do filme que será excluido
const id = 6;
 
const deletar = "DELETE FROM  filmes WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o filme.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Filme não encontrado.");
    } else {
        console.log("Filme excluido com sucesso!");
    }
    conexao.end();
});