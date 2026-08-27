create database sistema_tarefa;
use sistema_tarefa;

CREATE TABLE tarefas (
id INT AUTO_INCREMENT PRIMARY KEY,
descricao VARCHAR(200) not null,
responsavel VARCHAR(100) );

select * from tarefas;
describe tarefas;
