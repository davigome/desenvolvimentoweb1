const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});
 
// Dados que serão cadastrados
const nome = "Fernanda";
const disciplina = "Programação";
 
// Comando SQL
const insert = "INSERT INTO professores (nome, disciplina) VALUES (?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [nome, disciplina], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Professor cadastrado com sucesso!");
    }
   
});
 
 
// ID do professor que será excluido
const id = 6;
 
const deletar = "DELETE FROM  professores WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o professor.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Professor não encontrado.");
    } else {
        console.log("Professor excluido com sucesso!");
    }
    conexao.end();
});