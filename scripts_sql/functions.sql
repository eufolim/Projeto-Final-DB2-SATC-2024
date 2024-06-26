DELIMITER //

CREATE FUNCTION tempo_disponibilidade(id_vaga INT) 
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE periodo INT;
    
    SELECT COALESCE(MAX(TIMESTAMPDIFF(HOUR, p1.saida, p2.entrada)), 0)
      INTO periodo
      FROM Pagamentos p1 LEFT JOIN Pagamentos p2
                                ON p1.id_vaga = p2.id_vaga AND p2.entrada > p1.saida
     WHERE p1.id_vaga = id_vaga
       AND p1.saida IS NOT NULL
       AND p1.saida >= DATE_SUB(NOW(), INTERVAL 30 DAY);

    RETURN periodo <= 4;
END //

DELIMITER ;
