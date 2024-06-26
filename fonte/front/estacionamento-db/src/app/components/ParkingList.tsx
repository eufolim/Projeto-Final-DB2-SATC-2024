import React, { useEffect, useState } from 'react';
import api from '../services/api';
    interface parking{
    id_cli: '',
    id_vaga: '',
    placa: '',
    entrada: '',
    saida: '',
    saldo: '',
    total_horas: ''
   }

function ListParkings() {
  const [parkings, setParkings] = useState([]);
   
  
  useEffect(() => {
      const fetchParkings = async () => {
          try {
              const response = await api.get('/parkings');
              setParkings(response.data);
            } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
    }
    };
    fetchParkings();
}, []);


return (
    <div className="my-4">
      <h2>Lista de Pagamentos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Cliente</th>
            <th>ID Vaga</th>
            <th>Placa</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Saldo</th>
            <th>Total de Horas</th>
          </tr>
        </thead>
        <tbody>
          {parkings.map(parking => (
            <tr key={parking.id}>
              <td>{parking.id}</td>
              <td>{parking.id_cli}</td>
              <td>{parking.id_vaga}</td>
              <td>{parking.placa}</td>
              <td>{new Date(parking.entrada).toLocaleString()}</td>
              <td>{parking.saida ? new Date(parking.saida).toLocaleString() : 'Ainda no estacionamento'}</td>
              <td>{parking.saldo}</td>
              <td>{parking.total_horas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListParkings;
