import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import api from '../services/api';

interface Client {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  ir: string;
}

const ListClients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('http://localhost:3001/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes', error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div>
      <Typography variant="h5" className="mb-4">Clientes</Typography>
      <List>
        {clients.map((client) => (
          <ListItem key={client.id}>
            <ListItemText primary={client.nome} secondary={client.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListClients;
