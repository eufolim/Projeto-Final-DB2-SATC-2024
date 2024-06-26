import random
import mysql.connector
from faker import Faker

# Configuração da conexão com o banco de dados
config = {
    'user': 'root',
    'password': 'admin',
    'host': 'localhost',
    'database': 'estacionamentdb'
}

# Caminho base onde serão salvos os comandos SQL
base_sql_path = r'D:\User\Alex\Desenvolvimento\Projetos\SATC\Projeto-Final-DB2-SATC-2024\scripts_sql'

# Criando a conexão
conn = mysql.connector.connect(**config)
cursor = conn.cursor()

# Inicializando o Faker
fake = Faker()

# Função para escrever o comando INSERT em um arquivo SQL
def write_insert_to_sql_file(table_name, sql):
    sql_file_path = f'{base_sql_path}\\{table_name.lower()}_inserts.sql'
    with open(sql_file_path, 'a') as sql_file:
        sql_file.write(sql + ';\n')

# Função para inserir dados na tabela Cliente
def insert_clients(cursor, num_records):
    for _ in range(num_records):
        nome = fake.name()
        telefone = fake.phone_number()[:20]
        email = fake.email()
        ir = fake.ssn()
        cursor.execute("""
            INSERT INTO Cliente (nome, telefone, email, ir)
            VALUES (%s, %s, %s, %s)
        """, (nome, telefone, email, ir))
        write_insert_to_sql_file('Cliente', cursor.statement)
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
        write_insert_to_sql_file('Veiculo', cursor.statement)
    conn.commit()

# Função para inserir dados na tabela Vaga
def insert_vagas(cursor, num_records):
    for _ in range(num_records):
        id_veiculo = None
        ocupada = fake.boolean()
        descricao = fake.text(max_nb_chars=50)  # Renomeei a variável para 'descricao'
        tipo = random.choice(['Coberta', 'Descoberta'])
        valor_hora = random.randint(5, 20)
        cursor.execute("""
            INSERT INTO Vaga (id_veiculo, ocupada, `desc`, tipo, valor_hora)
            VALUES (%s, %s, %s, %s, %s)
        """, (id_veiculo, ocupada, descricao, tipo, valor_hora))
    conn.commit()


# Função para inserir dados na tabela Promocoes
def insert_promocoes(cursor, num_records):
    for _ in range(num_records):
        dia = fake.date_time_this_year()
        desconto = random.randint(10, 50)
        descricao = fake.text(max_nb_chars=50)  # Renomeei a variável para 'descricao'
        cursor.execute("""
            INSERT INTO Promocoes (dia, desconto, descricao)
            VALUES (%s, %s, %s)
        """, (dia, desconto, descricao))
    conn.commit()



# Função para inserir dados na tabela Reserva
def insert_reservas(cursor, num_records):
    cursor.execute("SELECT id FROM Cliente")
    client_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT id FROM Vaga")
    vaga_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT placa FROM Veiculo")  # Selecionar placas válidas
    placas_validas = [row[0] for row in cursor.fetchall()]

    for _ in range(num_records):
        id_cli = random.choice(client_ids)
        id_vaga = random.choice(vaga_ids)
        placa = random.choice(placas_validas)  # Selecionar placa válida existente
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
        descricao = fake.text(max_nb_chars=50)
        id_cli = random.choice(client_ids)
        cursor.execute("""
            INSERT INTO Assinatura (`plano`, `valor`, `desc`, `id_cli`)
            VALUES (%s, %s, %s, %s)
        """, (plano, valor, descricao, id_cli))
    conn.commit()


# Função para inserir dados na tabela Fidelidade
def insert_fidelidades(cursor, num_records):
    cursor.execute("SELECT id FROM Cliente")
    client_ids = [row[0] for row in cursor.fetchall()]
    for _ in range(num_records):
        id_cli = random.choice(client_ids)
        pontos = random.randint(0, 500)
        desconto = fake.boolean()
        cursor.execute("""
            INSERT INTO Fidelidade (id_cli, pontos, desconto)
            VALUES (%s, %s, %s)
        """, (id_cli, pontos, desconto))
    conn.commit()

# Função para inserir dados na tabela Funcionario
def insert_funcionarios(cursor, num_records):
    for _ in range(num_records):
        nome = fake.name()
        telefone = fake.phone_number()[:20]
        email = fake.email()
        ir = fake.ssn()
        salario = random.randint(2000, 5000)
        cursor.execute("""
            INSERT INTO Funcionario (nome, telefone, email, ir, salario)
            VALUES (%s, %s, %s, %s, %s)
        """, (nome, telefone, email, ir, salario))
        write_insert_to_sql_file('Funcionario', cursor.statement)
    conn.commit()

# Função para inserir dados na tabela Pagamentos
def insert_pagamentos(cursor, num_records):
    cursor.execute("SELECT id FROM Cliente")
    client_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT placa FROM Veiculo")
    placas = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT id FROM Vaga")
    vaga_ids = [row[0] for row in cursor.fetchall()]
    for _ in range(num_records):
        id_cli = random.choice(client_ids)
        placa = random.choice(placas)
        id_vaga = random.choice(vaga_ids)
        entrada = fake.date_time_this_year()
        saida = fake.date_time_this_year()
        saldo = random.randint(50, 500)
        cursor.execute("""
            INSERT INTO Pagamentos (id_cli, placa, id_vaga, entrada, saida, saldo)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (id_cli, placa, id_vaga, entrada, saida, saldo))
    conn.commit()






# Inserindo 10.000 registros em cada tabela
num_records = 10000

#print("Inserting data into Cliente...")
#insert_clients(cursor, num_records)

#print("Inserting data into Veiculo...")
#insert_vehicles(cursor, num_records)

#print("Inserting data into Vaga...")
#insert_vagas(cursor, num_records)

#print("Inserting data into Promocoes...")
#insert_promocoes(cursor, num_records)

#print("Inserting data into Reserva...")
#nsert_reservas(cursor, num_records)

#print("Inserting data into Assinatura...")
#insert_assinaturas(cursor, num_records)

#print("Inserting data into Fidelidade...")
#insert_fidelidades(cursor, num_records)

#print("Inserting data into Funcionario...")
#insert_funcionarios(cursor, num_records)

#print("Inserting data into Pagamentos...")
#insert_pagamentos(cursor, num_records)

# Fechando a conexão
cursor.close()
conn.close()

print("Data insertion completed.")
