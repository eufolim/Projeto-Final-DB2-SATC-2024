INSERT INTO Cliente (nome, telefone, email, ir) VALUES ('João Silva', '99999-9999', 'joao@example.com', '123456789');

-- Inserir um veículo
INSERT INTO Veiculo (placa, id_cli, cor, modelo, marca) VALUES ('ABC1234', 1, 'Azul', 'Civic', 'Honda');

-- Inserir um pagamento com entrada e saída
INSERT INTO Pagamentos (id_cli, id_vaga, placa, entrada, saida, saldo) VALUES (1, 1, 'ABC1234', '2024-06-14 08:00:00', '2024-06-14 10:00:00', 200);
