create database sistema_eventos;
use sistema_eventos;

CREATE TABLE eventos (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
data_evento DATE );

select * from eventos;
describe eventos;