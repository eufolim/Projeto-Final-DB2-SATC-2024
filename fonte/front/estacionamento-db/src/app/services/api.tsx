import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/', 
  timeout: 10000, // Tempo limite para a solicitação
});


export default api;
