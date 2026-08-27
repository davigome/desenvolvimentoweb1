create database escola;
use escola;

create table professores (
id  int auto_increment primary key,
nome varchar(100),
disciplina varchar(100)
);

select * from professores;
describe professores;