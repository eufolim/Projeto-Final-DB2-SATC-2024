require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/clients/search', async (req, res) => {
    try {
        const { query } = req.query;
        const clients = await db.selectClientByCPFOrName(query);
        res.status(200).json(clients);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

app.get('/vehicles/search/:plate', async (req, res) => {
    try {
        const { plate } = req.params;
        const vehicle = await db.selectVehicle(plate);
        if (vehicle) {
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ error: 'Veículo não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar veículo por placa:', error);
        res.status(500).json({ error: 'Erro ao buscar veículo' });
    }
});

app.get('/spots/with-clients', async (req, res) => {
    try {
        const spots = await db.selectSpotsWithClients();
        res.status(200).json(spots);
    } catch (error) {
        console.error('Erro ao buscar vagas com clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar vagas com clientes' });
    }
});

app.post('/vehicles', async (req, res) => {
    try {
        const id = await db.insertVehicle(req.body);
        res.status(201).json({ id });
    } catch (error) {
        console.error('Erro ao inserir veículo:', error);
        res.status(500).json({ error: 'Erro ao inserir veículo' });
    }
});

app.get('/vehicles/:plate', async (req, res) => {
    try {
        const vehicle = await db.selectVehicle(req.params.plate);
        res.status(200).json(vehicle);
    } catch (error) {
        console.error('Erro ao buscar veículo:', error);
        res.status(500).json({ error: 'Erro ao buscar veículo' });
    }
});

app.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await db.selectVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
});

app.post('/spots', async (req, res) => {
    try {
        const id = await db.insertSpot(req.body);
        res.status(201).json({ id });
    } catch (error) {
        console.error('Erro ao inserir vaga:', error);
        res.status(500).json({ error: 'Erro ao inserir vaga' });
    }
});

app.get('/spots', async (req, res) => {
    try {
        const spots = await db.selectSpots();
        res.status(200).json(spots);
    } catch (error) {
        console.error('Erro ao buscar vagas:', error);
        res.status(500).json({ error: 'Erro ao buscar vagas' });
    }
});

app.post('/parkings', async (req, res) => {
    try {
        const id = await db.insertParking(req.body);
        res.status(201).json({ id });
    } catch (error) {
        console.error('Erro ao inserir pagamento:', error);
        res.status(500).json({ error: 'Erro ao inserir pagamento' });
    }
});

app.put('/parkings/:id', async (req, res) => {
    try {
        const updated = await db.updateParking(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Pagamento atualizado com sucesso' });
        } else {
            res.status(404).json({ error: 'Pagamento não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar pagamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar pagamento' });
    }
});

app.delete('/parkings/:id', async (req, res) => {
    try {
        const deleted = await db.deleteParking(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Pagamento deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Pagamento não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error);
        res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
});

app.get('/parkings/:id', async (req, res) => {
    try {
        const parking = await db.selectParking(req.params.id);
        res.status(200).json(parking);
    } catch (error) {
        console.error('Erro ao buscar pagamento:', error);
        res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
});

app.get('/parkings', async (req, res) => {
    try {
        const parkings = await db.selectParkings();
        res.status(200).json(parkings);
    } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar pagamentos' });
    }
});

app.put('/spots/:id/availability', async (req, res) => {
    try {
        const updated = await db.updateSpotAvailability(req.params.id, req.body.ocupada);
        if (updated) {
            res.status(200).json({ message: 'Disponibilidade da vaga atualizada com sucesso' });
        } else {
            res.status(404).json({ error: 'Vaga não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar disponibilidade da vaga:', error);
        res.status(500).json({ error: 'Erro ao atualizar disponibilidade da vaga' });
    }
});

app.get('/', (req, res) => {
    res.send('Sistema de Gestão de Estacionamento');
});

app.listen(process.env.PORT, () => {
    console.log("Aplicação rodando");
});
