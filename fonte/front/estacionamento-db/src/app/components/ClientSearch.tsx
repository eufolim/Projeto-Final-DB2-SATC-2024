import { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import api from '../services/api';

interface Client {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  ir: string;
}

const ClientSearch = () => {
  const [query, setQuery] = useState('');
  const [clients, setClients] = useState<Client[]>([]);

  const handleSearch = async () => {
    try {
      const response = await api.get('/clients/search', { params: { query } });
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  return (
    <div className="p-4">
      <TextField
        label="Pesquisar Cliente"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        className="mb-4"
      />
      <Button onClick={handleSearch} variant="contained" className="ml-4 mb-4">
        Buscar
      </Button>
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

export default ClientSearch;
