--1 - Como obter a lista de vagas de estacionamento que não foram ocupadas nos últimos 30 dias?
SELECT v.id, v.`desc`
  FROM Vaga v LEFT JOIN Pagamentos p 
                     ON v.id = p.id_vaga AND p.entrada >= DATE_SUB(NOW(), INTERVAL 30 DAY)
 WHERE p.id IS NULL;

--2 - Qual a taxa de ocupação média de cada vaga de estacionamento por hora nos últimos 7 dias?
  SELECT v.`desc` AS descricao,
         COALESCE(SUM(TIMESTAMPDIFF(HOUR, p.entrada, p.saida)), 0) / 168 AS taxa_ocupacao_media
    FROM Vaga v LEFT JOIN Pagamentos p 
                       ON v.id = p.id_vaga AND p.entrada >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY v.id, v.`desc`;

--3 - Quais as vagas de estacionamento que nunca ficaram disponíveis por mais de 4 horas consecutivas nos últimos 30 dias?
SELECT v.id AS vaga_id, v.`desc` AS descricao
  FROM Vaga v
 WHERE tempo_disponibilidade(v.id) = TRUE;

--4 - Quais os horários de pico de ocupação de vagas de estacionamento nos últimos 30 dias, considerando intervalos de 1 hora?
  SELECT DATE_FORMAT(p.entrada, '%Y-%m-%d %H:00:00') AS hora,
         COUNT(*) AS total_ocupacoes
    FROM Pagamentos p
   WHERE p.entrada >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE_FORMAT(p.entrada, '%Y-%m-%d %H:00:00')
ORDER BY total_ocupacoes DESC
LIMIT 3;
