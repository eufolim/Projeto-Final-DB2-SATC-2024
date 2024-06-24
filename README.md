## Projeto Gestão de Estacionamento - GRUPO E

### Integrantes
Alex Farias De Abreu Nabo - @Alex-Farias<br>
Icaro De Oliveira - @ynd-icaro<br>
Jean Lucas Preis - @JeanPrei<br>
Luiz Antônio Frey Cristiano - @eufolim<br>
Matheus Araildi - @Araldi42<br>

### Modelo Físico
 Utilizamos a ferramenta de modelagem de dados [dbdiagram.io](https://dbdiagram.io/) para criação do modelo físico do banco de dados, para posterior exportação dos scripts DDL das tabelas e relacionamentos.<br>
Arquivo fonte: [Modelo Fisico](https://dbdiagram.io/d/6561325e3be1495787b1c71a).<br>

![image](https://github.com/eufolim/Projeto-Final-DB2-SATC-2024/blob/main/Modelo_Fisico/Modelo.png)
  
### Dicionário de Dados
As informações sobre as tabelas e índices foram documentados na planilha [Dicionário.xlsx](dicionario_dados/Dicionário.xlsx).

### Scripts SQL
Para este projeto foi utilizado o banco de dados [MySQL Database](https://www.mysql.com/downloads/) <br>
Este é o procedimento para criação do banco de dados Azure SQL [Criando SQL Azure serverless no Azure gratuito - Sem cartão de crédito].

Abaixo, segue os scripts SQL separados por tipo:
+ DDL [ddl.sql](scripts_sql/ddl.sql)
+ Índices [indices.sql](scripts_sql/indices.sql)
+ DML [dml.sql](scripts_sql/dml.sql)
+ Triggers [triggers.sql](scripts_sql/triggers.sql)
+ Stored Procedures [stored_procedures.sql](scripts_sql/procedures.sql)
+ Functions [functions.sql](scripts_sql/functions.sql)

### Código Fonte do CRUD
- Linguagem Backend: Node.js<br>
  - libs:
    axios;
    vite.
    
- Linguagem Frontend: React.js<br>
  - libs:
    cors;
    express.

[Codigo Fonte](fonte/)

### Relatório Final
O relatório final está disponível no arquivo [Relatório.docx](relatorio/Relatório.docx).
