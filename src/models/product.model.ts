export interface Product {
  id: number;
  nome: string;
  tipo: string;
  rentabilidade: number;
  risco: 'Baixo' | 'Médio' | 'Alto';
  descricao?: string;
  prazoMinimo?: number;
  valorMinimo?: number;
}

