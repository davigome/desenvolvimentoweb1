const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ecommerce"
});
 
// Dados que serão cadastrados
const nome = "Mouse";
const preco = '75.50';
 
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

   conexao.end();
});
 
 
// ID do produto que será excluido
/*
const id = 6;
 
const deletar = "DELETE FROM  alunos WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o aluno.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Aluno não encontrado.");
    } else {
        console.log("Aluno excluido com sucesso!");
    }
    conexao.end();
}); */