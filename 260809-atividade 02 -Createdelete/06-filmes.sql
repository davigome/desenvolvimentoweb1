create database locadora;
use locadora;

create table filmes (
id int auto_increment primary key,
titulo varchar(100),
ano int 
);

select * from filmes;
describe filmes;