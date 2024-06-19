-- Procedure para resgatar pontos de fidelidade
DELIMITER //
CREATE PROCEDURE resgatar_pontos(IN p_id_cli INT, IN p_pontos INT)
BEGIN
  DECLARE pontos_atual INT;
  
  SELECT pontos INTO pontos_atual
  FROM Fidelidade
  WHERE id_cli = p_id_cli;
  
  IF pontos_atual >= p_pontos THEN
    UPDATE Fidelidade
    SET pontos = pontos - p_pontos
    WHERE id_cli = p_id_cli;
    SELECT 'Pontos resgatados com sucesso!' AS resultado;
  ELSE
    SELECT 'Pontos insuficientes para resgate.' AS resultado;
  END IF;
END;
//
DELIMITER ;
