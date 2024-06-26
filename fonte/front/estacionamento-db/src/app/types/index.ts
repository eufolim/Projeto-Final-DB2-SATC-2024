export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  ir: string;
}

export interface Veiculo {
  id: number;
  placa: string;
  cor: string;
  modelo: string;
  marca: string;
}

export interface VehicleFormData {
  placa: string;
  cor: string;
  modelo: string;
  marca: string;
}

export interface Vaga {
  cliente_ir: number;
  cliente_nome: string ;
  id: number;
  id_veiculo: string;
  ocupada: boolean;
  desc: string;
  tipo: string;
  valor_hora: number;
}

export interface Pagamento {
  id: number;
  id_cli: number;
  id_vaga: number;
  placa: string;
  entrada: string;
  saida: string;
  saldo: number;
  total_horas: number;
}
