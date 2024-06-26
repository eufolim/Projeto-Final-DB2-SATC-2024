import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import api from '../services/api';

interface Vehicle {
  placa: string;
  id_cli: number;
  cor: string;
  modelo: string;
  marca: string;
}

const ListVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get('/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Erro ao buscar veículos', error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div>
      <Typography variant="h5" className="mb-4">Veículos</Typography>
      <List>
        {vehicles.map((vehicle) => (
          <ListItem key={vehicle.placa}>
            <ListItemText primary={`${vehicle.modelo} - ${vehicle.placa}`} secondary={`${vehicle.marca} - ${vehicle.cor}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListVehicles;
