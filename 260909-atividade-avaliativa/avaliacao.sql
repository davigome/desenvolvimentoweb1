create database laboratorio_informatica;
use laboratorio_informatica;

create table computador (
id int primary key auto_increment,
patrimonio varchar(30) not null,
localizacao varchar(100) not null,
responsavel varchar(100),
statos varchar(30));

describe computador;
select * from computador;

alter table computador
modify responsavel varchar(30) not null;
