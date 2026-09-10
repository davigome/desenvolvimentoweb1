create database sistema_veiculos;
use sistema_veiculos;

CREATE TABLE veiculos (
id INT AUTO_INCREMENT PRIMARY KEY,
modelo VARCHAR(100),
placa VARCHAR(20) 
);

select * from veiculos;
describe eventos;

SELECT * FROM eventos ORDER BY data_evento ASC;