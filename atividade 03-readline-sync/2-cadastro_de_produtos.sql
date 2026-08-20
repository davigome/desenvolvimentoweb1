CREATE DATABASE sistema_loja;
USE sistema_loja;

CREATE TABLE produtos (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
preco DECIMAL(10,2),
quantidade INT);

SELECT * FROM produtos;
SHOW TABLES;
DESCRIBE produtos;