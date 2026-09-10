
const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "instituicao"
});
 
// Dados que serão cadastrados
const nome = "Administração";
const carga_horaria = 800;
 
// Comando SQL
const insert = "INSERT INTO cursos (nome, carga_horaria) VALUES (?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [nome, carga_horaria], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Curso cadastrado com sucesso!");
    }
   
});
 
 
// ID do curso que será excluido
const id = 6;
 
const deletar = "DELETE FROM  cursos WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir o curso.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Curso não encontrado.");
    } else {
        console.log("Curso excluido com sucesso!");
    }
    conexao.end();
});