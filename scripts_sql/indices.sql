-- Índices para a tabela Pagamentos
CREATE INDEX idx_id_cli ON Pagamentos (id_cli);
CREATE INDEX idx_placa ON Pagamentos (placa);
CREATE INDEX idx_id_vaga ON Pagamentos (id_vaga);
CREATE INDEX idx_entrada ON Pagamentos (entrada);
