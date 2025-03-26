CREATE DATABASE api_produtos;
USE api_produtos;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    fornecedor VARCHAR(255) NOT NULL,
    endereco_fornecedor VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    preco_unitario FLOAT NOT NULL
);

INSERT INTO produtos (nome, fornecedor, endereco_fornecedor, quantidade, endereco, preco_unitario) VALUES
('Produto A', 'Fornecedor X', 'Endereço X', 10, 'Local X', 15.50),
('Produto B', 'Fornecedor Y', 'Endereço Y', 20, 'Local Y', 25.75),
('Produto C', 'Fornecedor Z', 'Endereço Z', 30, 'Local Z', 35.00),
('Produto D', 'Fornecedor W', 'Endereço W', 40, 'Local W', 45.25);

