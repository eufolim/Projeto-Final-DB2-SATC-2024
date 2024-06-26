const mysql = require("mysql2/promise");
require('dotenv').config();

const parking = mysql.createPool(process.env.CONNECTION_STRING);

async function insertVehicle(vehicle) {
    const { placa, id_cli, cor, modelo, marca } = vehicle;
    try {
        const [result] = await parking.execute(
            'INSERT INTO Veiculo (placa, id_cli, cor, modelo, marca) VALUES (?, ?, ?, ?, ?)',
            [placa, id_cli, cor, modelo, marca]
        );
        return result.insertId;
    } catch (error) {
        console.error('Erro ao inserir veículo:', error);
        throw error;
    }
}

async function selectVehicle(placa) {
    try {
        const [rows] = await parking.execute(
            'SELECT * FROM Veiculo WHERE placa = ?',
            [placa]
        );
        return rows[0];
    } catch (error) {
        console.error('Erro ao buscar veículo:', error);
        throw error;
    }
}

async function selectVehicles() {
    try {
        const [rows] = await parking.execute(
            'SELECT * FROM Veiculo'
        );
        return rows;
    } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        throw error;
    }
}

async function insertSpot(spot) {
    const { id_veiculo, ocupada, desc, tipo, valor_hora } = spot;
    try {
        const [result] = await parking.execute(
            'INSERT INTO Vaga (id_veiculo, ocupada, `desc`, tipo, valor_hora) VALUES (?, ?, ?, ?, ?)',
            [id_veiculo, ocupada, desc, tipo, valor_hora]
        );
        return result.insertId;
    } catch (error) {
        console.error('Erro ao inserir vaga:', error);
        throw error;
    }
}

async function selectSpots() {
    try {
        const [rows] = await parking.execute('SELECT * FROM Vaga');
        return rows;
    } catch (error) {
        console.error('Erro ao buscar vagas:', error);
        throw error;
    }
}

async function insertParking(parkingData) {
    const { id_cli, id_vaga, placa, entrada, saida, saldo, total_horas } = parkingData;
    try {
        const [result] = await parking.execute( 
            'INSERT INTO Pagamentos (id_cli, id_vaga, placa, entrada, saida, saldo, total_horas) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_cli, id_vaga, placa, entrada, saida, saldo, total_horas]
        );
        return result.insertId;
    } catch (error) {
        console.error('Erro ao inserir pagamento:', error);
        throw error;
    }
}

async function updateParking(id, parkingData) {
    const { id_cli, id_vaga, placa, entrada, saida, saldo, total_horas } = parkingData;
    try {
        const [result] = await parking.execute(
            'UPDATE Pagamentos SET id_cli = ?, id_vaga = ?, placa = ?, entrada = ?, saida = ?, saldo = ?, total_horas = ? WHERE id = ?',
            [id_cli, id_vaga, placa, entrada, saida, saldo, total_horas, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar pagamento:', error);
        throw error;
    }
}

async function deleteParking(id) {
    try {
        const [result] = await parking.execute(
            'DELETE FROM Pagamentos WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error);
        throw error;
    }
}

async function selectParking(id) {
    try {
        const [rows] = await parking.execute(
            'SELECT * FROM Pagamentos WHERE id = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Erro ao buscar pagamento:', error);
        throw error;
    }
}

async function selectParkings() {
    try {
        const [rows] = await parking.execute(
            'SELECT * FROM Pagamentos'
        );
        return rows;
    } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
        throw error;
    }
}

async function updateSpotAvailability(id, ocupada) {
    try {
        const [result] = await parking.execute(
            'UPDATE Vaga SET ocupada = ? WHERE id = ?',
            [ocupada, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar disponibilidade da vaga:', error);
        throw error;
    }
}

async function selectClientByCPFOrName(query) {
    try {
        const [rows] = await parking.execute(
            'SELECT * FROM Cliente WHERE ir = ? OR nome = ?',
            [query, query]
        );
        return rows;
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        throw error;
    }
}

async function selectSpotsWithClients() {
    try {
        const [rows] = await parking.execute(`
            SELECT Vaga.*, Cliente.nome AS cliente_nome, Cliente.ir AS cliente_ir 
            FROM Vaga
            LEFT JOIN Veiculo ON Vaga.id_veiculo = Veiculo.placa
            LEFT JOIN Cliente ON Veiculo.id_cli = Cliente.id
        `);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar vagas com clientes:', error);
        throw error;
    }
}

module.exports = {
    insertVehicle,
    selectVehicle,
    selectVehicles,
    insertSpot,
    selectSpots,
    insertParking,
    updateParking,
    deleteParking,
    selectParking,
    selectParkings,
    updateSpotAvailability,
    selectClientByCPFOrName,
    selectSpotsWithClients,
};
