create database loja;
use loja;

create table vendas (
id int primary key auto_increment,
produto varchar(100),
quantidade int,
valor decimal(6,2)
);

select * from vendas;
describe vendas;

