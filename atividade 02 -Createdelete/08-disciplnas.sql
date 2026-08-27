create database materias;
use materias;

create table disciplinas (
id int primary key auto_increment,
nome varchar(100),
professor varchar(100),
aulas_semanais varchar(100)
);

select * from disciplinas;
describe disciplinas;

DELETE FROM  disciplinas WHERE id = 2;