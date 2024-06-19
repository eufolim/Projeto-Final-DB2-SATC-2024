require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Sistema de Gestão de Estacionamento');
});     
app.get('/', (req, res) => {
    res.send('Sistema de Gestão de Estacionamento');
});

// Rotas para Veículos
app.post('/vehicles', async (req, res) => {
    try {
        const id = await db.insertVehicle(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao inserir veículo' });
    }
});

app.get('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await db.selectVehicle(req.params.id);
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar veículo' });
    }
});

app.get('/vehicles/plate/:plate', async (req, res) => {
    try {
        const plate = req.params.plate;
        const vehicle = await db.selectVehicleByPlate(plate);
        if (vehicle) {
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ error: 'Veículo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar veículo' });
    }
});

app.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await db.selectVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
});
// Rotas para Vagas
app.post('/spots', async (req, res) => {
    try {
        const id = await db.insertSpot(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao inserir vaga' });
    }
});

app.get('/spots/:id', async (req, res) => {
    try {
        const spot = await db.selectSpot(req.params.id);
        res.status(200).json(spot);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar vaga' });
    }
});

app.get('/spots', async (req, res) => {
    try {
        const spots = await db.selectSpots();
        res.status(200).json(spots);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar vagas' });
    }
});

// Rotas para Estacionamentos
app.post('/parkings', async (req, res) => {
    try {
        const id = await db.insertParking(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao inserir estacionamento' });
    }
});

app.put('/parkings/:id', async (req, res) => {
    try {
        const updated = await db.updateParking(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Estacionamento atualizado com sucesso' });
        } else {
            res.status(404).json({ error: 'Estacionamento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar estacionamento' });
    }
});

app.delete('/parkings/:id', async (req, res) => {
    try {
        const deleted = await db.deleteParking(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Estacionamento deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Estacionamento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar estacionamento' });
    }
});

app.get('/parkings/:id', async (req, res) => {
    try {
        const parking = await db.selectParking(req.params.id);
        res.status(200).json(parking);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estacionamento' });
    }
});

app.get('/parkings', async (req, res) => {
    try {
        const parkings = await db.selectParkings();
        res.status(200).json(parkings);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estacionamentos' });
    }
});

app.put('/spots/:id/availability', async (req, res) => {
    try {
        const updated = await db.updateSpotAvailability(req.params.id, req.body.disponivel);
        if (updated) {
            res.status(200).json({ message: 'Disponibilidade da vaga atualizada com sucesso' });
        } else {
            res.status(404).json({ error: 'Vaga não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar disponibilidade da vaga' });
    }
});


app.listen(process.env.PORT, () => {
    console.log("Aplicação rodando");
});
