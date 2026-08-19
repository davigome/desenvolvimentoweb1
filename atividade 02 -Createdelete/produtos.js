const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});
 
// Dados que serão cadastrados
const nome = "Karen";
const email = "KarenAndressa@email.com";
 
// Comando SQL
const insert = "INSERT INTO alunos (nome, email) VALUES (?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [nome, email], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Aluno cadastrado com sucesso!");
    }
   
});
 
 
// ID do aluno que será excluido
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
});