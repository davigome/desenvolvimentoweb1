create database sistema_computadores;
use sistema_computadores;

CREATE TABLE computadores (
id INT AUTO_INCREMENT PRIMARY KEY,
patrimonio VARCHAR(200) not null,
localizacao VARCHAR(100) );

select * from computadores;
describe computadores;