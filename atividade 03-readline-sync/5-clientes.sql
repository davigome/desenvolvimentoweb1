create database sistema_clientes;
use sistema_clientes;

CREATE TABLE clientes ( 
id INT AUTO_INCREMENT PRIMARY KEY, 
nome VARCHAR(100), 
telefone VARCHAR(20) 
);

select * from clientes;