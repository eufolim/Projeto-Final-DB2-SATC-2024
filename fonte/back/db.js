const mysql = require("mysql2/promise");
require('dotenv').config();

const parking = mysql.createPool(process.env.CONNECTION_STRING);

async function insertVehicle(vehicle) {
    const { placa, modelo, cor } = vehicle;
    const [result] = await parking.execute(
        'INSERT INTO veiculo (placa, modelo, cor) VALUES (?, ?, ?)',
        [placa, modelo, cor]
    );
    return result.insertId;
}

async function selectVehicle(id) {
    const [rows] = await parking.execute(
        'SELECT * FROM veiculo WHERE id = ?',
        [id]
    );
    return rows[0];
}

async function selectVehicleByPlate(plate) {
    const [rows] = await parking.execute(
        'SELECT * FROM veiculo WHERE placa = ?',
        [plate]
    );
    return rows[0];
}

async function selectVehicles() {
    const [rows] = await parking.execute(
        'SELECT * FROM veiculo'
    );
    return rows;
}

async function insertSpot(spot) {
    const { numero, disponivel } = spot;
    const [result] = await parking.execute(
        'INSERT INTO vagas (numero, disponivel) VALUES (?, ?)',
        [numero, disponivel]
    );
    return result.insertId;
}

async function selectSpot(id) {
    const [rows] = await parking.execute(
        'SELECT * FROM vagas WHERE id = ?',
        [id]
    );
    return rows[0];
}

async function selectSpots() {
    const [rows] = await parking.execute(
        'SELECT * FROM vagas'
    );
    return rows;
}

async function insertParking(parking) {
    const { veiculo_id, vaga_id, entrada, saida } = parking;
    const [result] = await parking.execute( 
        'INSERT INTO estacionamentos (veiculo_id, vaga_id, entrada, saida) VALUES (?, ?, ?, ?)',
        [veiculo_id, vaga_id, entrada, saida]
    );
    return result.insertId;
}

async function updateParking(id, parking) {
    const { veiculo_id, vaga_id, entrada, saida } = parking;
    const [result] = await parking.execute(
        'UPDATE estacionamentos SET veiculo_id = ?, vaga_id = ?, entrada = ?, saida = ? WHERE id = ?',
        [veiculo_id, vaga_id, entrada, saida, id]
    );
    return result.affectedRows > 0;
}

async function deleteParking(id) {
    const [result] = await parking.execute(
        'DELETE FROM estacionamentos WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}

async function selectParking(id) {
    const [rows] = await parking.execute(
        'SELECT * FROM estacionamentos WHERE id = ?',
        [id]
    );
    return rows[0];
}

async function selectParkings() {
    const [rows] = await parking.execute(
        'SELECT * FROM estacionamentos'
    );
    return rows;
}

async function updateSpotAvailability(id, disponivel) {
    const [result] = await parking.execute(
        'UPDATE vagas SET disponivel = ? WHERE id = ?',
        [disponivel, id]
    );
    return result.affectedRows > 0;
}

module.exports = {
    insertVehicle,
    selectVehicle,
    selectVehicleByPlate,
    selectVehicles,
    insertSpot,
    selectSpot,
    selectSpots,
    insertParking,
    updateParking,
    deleteParking,
    selectParking,
    selectParkings,
    updateSpotAvailability
};
