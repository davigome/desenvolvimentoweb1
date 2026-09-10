const mysql = require("mysql2");
 
// conexão com o mySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "materias"
});
 
// Dados que serão cadastrados
const nome = "Análise de dados";
const professor = "Maria";
const aulas_semanais = 5;
 
// Comando SQL
const insert = "INSERT INTO disciplinas (nome, professor, aulas_semanais) VALUES (?, ?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert, [nome, professor, aulas_semanais], function (erro) {
 
    if(erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Disciplina cadastradacls com sucesso!");
    }
   
});
 
 
// ID do produto que será excluido
const id = 1;
 
const deletar = "DELETE FROM  disciplinas WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado) {
 
    if (erro) {
        console.log("Erro ao excluir a disciplina.");
        console.log(erro);
    } else if (resultado.affecteRows === 0) {
        console.log("Disciplina não encontrada.");
    } else {
        console.log("Disciplina excluida com sucesso!");
    }
    conexao.end();
});