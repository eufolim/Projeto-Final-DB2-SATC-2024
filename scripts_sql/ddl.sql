Create DATABASE estacionamentdb;

CREATE TABLE Cliente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  telefone VARCHAR(20),
  email VARCHAR(255),
  ir VARCHAR(20)
);

CREATE TABLE Veiculo (
  placa VARCHAR(20) PRIMARY KEY,
  id_cli INT,
  cor VARCHAR(50),
  modelo VARCHAR(50),
  marca VARCHAR(50),
  FOREIGN KEY (id_cli) REFERENCES Cliente(id)
);

CREATE TABLE Vaga (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_veiculo VARCHAR(20),
  ocupada BOOL,
  `desc` VARCHAR(255),
  tipo VARCHAR(50),
  valor_hora INT,
  FOREIGN KEY (id_veiculo) REFERENCES Veiculo(placa)
);

CREATE TABLE Funcionario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  telefone VARCHAR(20),
  email VARCHAR(255),
  ir VARCHAR(20),
  salario INT
);

CREATE TABLE Assinatura (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plano VARCHAR(50),
  valor INT,
  `desc` VARCHAR(255),
  id_cli INT,
  FOREIGN KEY (id_cli) REFERENCES Cliente(id)
);

CREATE TABLE Pagamentos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_cli INT,
  id_vaga INT,
  placa VARCHAR(20),
  entrada DATETIME,
  saida DATETIME,
  saldo INT,
  total_horas INT,
  FOREIGN KEY (id_cli) REFERENCES Cliente(id),
  FOREIGN KEY (id_vaga) REFERENCES Vaga(id),
  FOREIGN KEY (placa) REFERENCES Veiculo(placa)
);

CREATE TABLE Promocoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dia DATE,
  desconto INT,
  `desc` VARCHAR(255)
);

CREATE TABLE Reserva (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_cli INT,
  id_vaga INT,
  placa VARCHAR(20),
  entrada DATETIME,
  saida DATETIME,
  tarifa INT,
  promocao INT,
  FOREIGN KEY (id_cli) REFERENCES Cliente(id),
  FOREIGN KEY (id_vaga) REFERENCES Vaga(id),
  FOREIGN KEY (placa) REFERENCES Veiculo(placa),
  FOREIGN KEY (promocao) REFERENCES Promocoes(id)
);

-- Tabela de fidelidade e recompensas
CREATE TABLE Fidelidade (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_cli INT,
  pontos INT,
  FOREIGN KEY (id_cli) REFERENCES Cliente(id)
);
