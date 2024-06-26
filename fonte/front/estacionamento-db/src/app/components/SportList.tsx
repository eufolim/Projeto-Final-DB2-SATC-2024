'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface Spot {
  id: number;
  id_veiculo: string;
  ocupada: boolean;
  desc: string;
  tipo: string;
  valor_hora: number;
}

const ListSpots = () => {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get('http://localhost:3001/spots');
        setSpots(response.data);
      } catch (error) {
        console.error('Erro ao buscar vagas', error);
      }
    };
    fetchSpots();
  }, []);

  return (
    <div>
      <Typography variant="h5" className="mb-4">Vagas</Typography>
      <List>
        {spots.map((spot) => (
          <ListItem key={spot.id}>
            <ListItemText primary={`Vaga ${spot.id} - ${spot.tipo}`} secondary={`${spot.desc} - ${spot.valor_hora} BRL/hora`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListSpots;
