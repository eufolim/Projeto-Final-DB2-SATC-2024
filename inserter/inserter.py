import random
import mysql.connector
from faker import Faker

# Configuração da conexão com o banco de dados
config = {
    'user': 'seu_usuario',
    'password': 'sua_senha',
    'host': 'localhost',
    'database': 'estacionamento'
}

# Criando a conexão
conn = mysql.connector.connect(**config)
cursor = conn.cursor()

# Inicializando o Faker
fake = Faker()

# Função para inserir dados na tabela Cliente
def insert_clients(cursor, num_records):
    for _ in range(num_records):
        nome = fake.name()
        telefone = fake.phone_number()
        email = fake.email()
        ir = fake.ssn()
        cursor.execute("""
            INSERT INTO Cliente (nome, telefone, email, ir)
            VALUES (%s, %s, %s, %s)
        """, (nome, telefone, email, ir))
    conn.commit()

# Função para inserir dados na tabela Veiculo
def insert_vehicles(cursor, num_records):
    cursor.execute("SELECT id FROM Cliente")
    client_ids = [row[0] for row in cursor.fetchall()]
    for _ in range(num_records):
        placa = fake.license_plate()
        id_cli = random.choice(client_ids)
        cor = fake.color_name()
        modelo = fake.word()
        marca = fake.company()
        cursor.execute("""
            INSERT INTO Veiculo (placa, id_cli, cor, modelo, marca)
            VALUES (%s, %s, %s, %s, %s)
        """, (placa, id_cli, cor, modelo, marca))
    conn.commit()

# Função para inserir dados na tabela Vaga
def insert_vagas(cursor, num_records):
    for _ in range(num_records):
        id_veiculo = None
        ocupada = fake.boolean()
        desc = fake.text(max_nb_chars=50)
        tipo = random.choice(['Coberta', 'Descoberta'])
        valor_hora = random.randint(5, 20)
        cursor.execute("""
            INSERT INTO Vaga (id_veiculo, ocupada, desc, tipo, valor_hora)
            VALUES (%s, %s, %s, %s, %s)
        """, (id_veiculo, ocupada, desc, tipo, valor_hora))
    conn.commit()

# Função para inserir dados na tabela Promocoes
def insert_promocoes(cursor, num_records):
    for _ in range(num_records):
        dia = fake.date_time_this_year()
        desconto = random.randint(10, 50)
        desc = fake.text(max_nb_chars=50)
        cursor.execute("""
            INSERT INTO Promocoes (dia, desconto, desc)
            VALUES (%s, %s, %s)
        """, (dia, desconto, desc))
    conn.commit()

# Função para inserir dados na tabela Reserva
def insert_reservas(cursor, num_records):
    cursor.execute("SELECT id FROM Cliente")
    client_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT id FROM Vaga")
    vaga_ids = [row[0] for row in cursor.fetchall()]
    for _ in range(num_records):
        id_cli = random.choice(client_ids)
        id_vaga = random.choice(vaga_ids)
        placa = fake.license_plate()
        entrada = fake.date_time_this_year()
        saida = fake.date_time_this_year()
        tarifa = random.randint(50, 200)
        promocao = None
        cursor.execute("""
            INSERT INTO Reserva (id_cli, id_vaga, placa, entrada, saida, tarifa, promocao)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (id_cli, id_vaga, placa, entrada, saida, tarifa, promocao))
    conn.commit()

# Função para inserir dados na tabela Assinatura
def insert_assinaturas(cursor, num_records):
    cursor.execute("SELECT id FROM Cliente")
    client_ids = [row[0] for row in cursor.fetchall()]
    for _ in range(num_records):
        plano = random.choice(['Mensal', 'Anual'])
        valor = random.randint(100, 1000)
        desc = fake.text(max_nb_chars=50)
        id_cli = random.choice(client_ids)
        cursor.execute("""
            INSERT INTO Assinatura (plano, valor, desc, id_cli)
            VALUES (%s, %s, %s, %s)
        """, (plano, valor, desc, id_cli))
    conn.commit()

# Função para inserir dados na tabela Fidelidade
def insert_fidelidades(cursor, num_records):
    cursor.execute("SELECT id FROM Cliente")
    client_ids = [row[0] for row in cursor.fetchall()]
    for _ in range(num_records):
        id_cli = random.choice(client_ids)
        cota_minima = random.randint(50, 150)
        pontos = random.randint(0, 500)
        desconto = fake.boolean()
        cursor.execute("""
            INSERT INTO Fidelidade (id_cli, cota_minima, pontos, desconto)
            VALUES (%s, %s, %s, %s)
        """, (id_cli, cota_minima, pontos, desconto))
    conn.commit()

# Função para inserir dados na tabela Funcionario
def insert_funcionarios(cursor, num_records):
    for _ in range(num_records):
        nome = fake.name()
        telefone = fake.phone_number()
        email = fake.email()
        ir = fake.ssn()
        salario = random.randint(2000, 5000)
        cursor.execute("""
            INSERT INTO Funcionario (nome, telefone, email, ir, salario)
            VALUES (%s, %s, %s, %s, %s)
        """, (nome, telefone, email, ir, salario))
    conn.commit()

# Função para inserir dados na tabela Pagamentos
def insert_pagamentos(cursor, num_records):
    cursor.execute("SELECT id FROM Cliente")
    client_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT id FROM Funcionario")
    funcionario_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT id FROM Vaga")
    vaga_ids = [row[0] for row in cursor.fetchall()]
    for _ in range(num_records):
        id_cli = random.choice(client_ids)
        id_fun = random.choice(funcionario_ids)
        placa = fake.license_plate()
        id_vaga = random.choice(vaga_ids)
        entrada = fake.date_time_this_year()
        saida = fake.date_time_this_year()
        saldo = random.randint(50, 500)
        cursor.execute("""
            INSERT INTO Pagamentos (id_cli, id_fun, placa, id_vaga, entrada, saida, saldo)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (id_cli, id_fun, placa, id_vaga, entrada, saida, saldo))
    conn.commit()

# Inserindo 10.000 registros em cada tabela
num_records = 10000

print("Inserting data into Cliente...")
insert_clients(cursor, num_records)

print("Inserting data into Veiculo...")
insert_vehicles(cursor, num_records)

print("Inserting data into Vaga...")
insert_vagas(cursor, num_records)

print("Inserting data into Promocoes...")
insert_promocoes(cursor, num_records)

print("Inserting data into Reserva...")
insert_reservas(cursor, num_records)

print("Inserting data into Assinatura...")
insert_assinaturas(cursor, num_records)

print("Inserting data into Fidelidade...")
insert_fidelidades(cursor, num_records)

print("Inserting data into Funcionario...")
insert_funcionarios(cursor, num_records)

print("Inserting data into Pagamentos...")
insert_pagamentos(cursor, num_records)

# Fechando a conexão
cursor.close()
conn.close()

print("Data insertion completed.")
