create database biblioteca;
use biblioteca;

create table livros(
id  int auto_increment primary key,
titulo varchar(100),
autor varchar(100)
);

select * from livros;
describe livros;