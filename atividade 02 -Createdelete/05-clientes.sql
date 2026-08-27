create database base_clientes;
use base_clientes;

create table clientes (
id int auto_increment primary key,
nome varchar(100),
telefone varchar(15)
);

select * from clientes;
describe clientes;