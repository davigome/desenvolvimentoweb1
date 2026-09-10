create database instituicao;
use instituicao;

create table cursos (
id  int auto_increment primary key,
nome varchar(100),
carga_horaria int
);

select * from cursos;
describe cursos;