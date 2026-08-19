const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca"
});
 
// Dados que serão cadastrados
const titulo = "Dom Casmurro";
const autor = "Machado de Assis";
 
// Comando SQL
const insert = "INSERT INTO livros (titulo, autor) VALUES (?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [titulo, autor], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("cadastrado com sucesso!");
    }
   
});
 
 
// ID do aluno que será excluido
const id = 6;
 
const deletar = "DELETE FROM  livros WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o livro.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Não encontrado.");
    } else {
        console.log("Excluido com sucesso!");
    }
    conexao.end();
});