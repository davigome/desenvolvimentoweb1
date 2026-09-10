create database sistema_filmes;
use sistema_filmes;

CREATE TABLE filmes ( 
id INT AUTO_INCREMENT PRIMARY KEY, 
titulo VARCHAR(100), 
ano INT );

select * from filmes;

-- Deixa a lista por orden alfabetica
SELECT * FROM filmes ORDER BY titulo ASC;