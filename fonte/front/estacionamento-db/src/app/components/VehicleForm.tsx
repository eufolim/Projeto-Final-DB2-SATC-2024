import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import api from '../services/api';

interface Vehicle {
  placa: string;
  id_cli: number;
  cor: string;
  modelo: string;
  marca: string;
}

const VehicleForm = () => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    placa: '',
    id_cli: 0,
    cor: '',
    modelo: '',
    marca: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/vehicles', vehicle);
      alert('Veículo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar veículo', error);
    }
  };

  return (
    <div className="p-4">
      <TextField
        label="Placa"
        name="placa"
        value={vehicle.placa}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="ID Cliente"
        name="id_cli"
        value={vehicle.id_cli}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Cor"
        name="cor"
        value={vehicle.cor}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Modelo"
        name="modelo"
        value={vehicle.modelo}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Marca"
        name="marca"
        value={vehicle.marca}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <Button onClick={handleSubmit} variant="contained">
        Cadastrar Veículo
      </Button>
    </div>
  );
};

export default VehicleForm;
