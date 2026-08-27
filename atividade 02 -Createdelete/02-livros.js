const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca"
});
 
// Dados que serão cadastrados
const titulo = "Logica de Programação";
const autor = "Roberto Carlos";
 
// Comando SQL
const insert = "INSERT INTO livros (titulo, autor) VALUES (?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [titulo, autor], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Livro cadastrado com sucesso!");
    }
   
});
 
 
// ID do livro que será excluido
const id = 6;
 
const deletar = "DELETE FROM  livros WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o livro.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Livro não encontrado.");
    } else {
        console.log("Livro excluido com sucesso!");
    }
    conexao.end();
});