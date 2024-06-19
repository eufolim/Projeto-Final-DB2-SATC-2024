-- Trigger para calcular total de horas
DELIMITER //
CREATE TRIGGER calcula_total_horas
BEFORE INSERT ON Pagamentos
FOR EACH ROW
BEGIN
  DECLARE horas INT;
  
  SET horas = TIMESTAMPDIFF(HOUR, NEW.entrada, NEW.saida);
  SET NEW.total_horas = horas;
END;
//
DELIMITER ;

-- Trigger para atualizar pontos de fidelidade ao adicionar um pagamento
DELIMITER //
CREATE TRIGGER atualiza_pontos_pagamento
AFTER INSERT ON Pagamentos
FOR EACH ROW
BEGIN
  DECLARE pontos_atual INT;
  SET pontos_atual = NEW.total_horas; -- Cada hora equivale a 1 ponto
  
  IF EXISTS (SELECT * FROM Fidelidade WHERE id_cli = NEW.id_cli) THEN
    UPDATE Fidelidade
    SET pontos = pontos + pontos_atual
    WHERE id_cli = NEW.id_cli;
  ELSE
    INSERT INTO Fidelidade (id_cli, pontos)
    VALUES (NEW.id_cli, pontos_atual);
  END IF;
END;
//
DELIMITER ;

