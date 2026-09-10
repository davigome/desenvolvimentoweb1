create database ecommerce;
use ecommerce;

create table produtos (
id int auto_increment primary key,
nome varchar(100),
preco decimal(6,2)
);

select * from produtos;
describe produtos;