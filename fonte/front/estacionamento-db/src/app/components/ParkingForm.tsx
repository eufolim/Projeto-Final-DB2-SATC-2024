import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import api from '../services/api';

interface Parking {
  id_cli: number;
  id_vaga: number;
  placa: string;
  entrada: string;
  saida: string;
  saldo: number;
  total_horas: number;
}

const ParkingForm = () => {
  const [parking, setParking] = useState<Parking>({
    id_cli: 0,
    id_vaga: 0,
    placa: '',
    entrada: '',
    saida: '',
    saldo: 0,
    total_horas: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.post('http://localhost:3001/parkings', parking);
      alert('Pagamento registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar pagamento', error);
    }
  };

  return (
    <div className="p-4">
      <TextField
        label="ID Cliente"
        name="id_cli"
        value={parking.id_cli}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="ID Vaga"
        name="id_vaga"
        value={parking.id_vaga}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Placa"
        name="placa"
        value={parking.placa}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Entrada"
        name="entrada"
        type="datetime-local"
        value={parking.entrada}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Saída"
        name="saida"
        type="datetime-local"
        value={parking.saida}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Saldo"
        name="saldo"
        value={parking.saldo}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        label="Total de Horas"
        name="total_horas"
        value={parking.total_horas}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
      />
      <Button onClick={handleSubmit} variant="contained">
        Registrar Pagamento
      </Button>
    </div>
  );
};

export default ParkingForm;
