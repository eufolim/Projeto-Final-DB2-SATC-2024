'use client'
import { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import api from '../services/api';

interface Spot {
  plate: string;
  ocupada: boolean;
  desc: string;
  tipo: string;
  valor_hora: number;
}

const SpotForm = () => {
  const [spot, setSpot] = useState<Spot>({
    plate: '',
    ocupada: false,
    desc: '',
    tipo: '',
    valor_hora: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpot((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSpot((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.post('/spots', spot);
      alert('Vaga cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar vaga', error);
    }
  };

  return (
    <div className="p-4">
      <TextField
        label="Placa Veículo"
        name="placa"
        value={spot.plate}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Descrição"
        name="desc"
        value={spot.desc}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Tipo"
        name="tipo"
        value={spot.tipo}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Valor por Hora"
        name="valor_hora"
        value={spot.valor_hora}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={spot.ocupada}
            onChange={handleCheckboxChange}
            name="ocupada"
          />
        }
        label="Ocupada"
      />
      <Button onClick={handleSubmit} variant="contained">
        Cadastrar Vaga
      </Button>
    </div>
  );
};

export default SpotForm;
