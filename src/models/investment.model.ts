export interface Investment {
  id: number;
  tipo: string;
  valor: number;
  rentabilidade: number;
  data: string;
}

export interface InvestmentSimulation {
  valor: number;
  prazoMeses: number;
  tipo: string;
}

export interface InvestmentSimulationResult {
  valorFinal: number;
  rentabilidade: number;
  detalhes: string;
  retornoMensal?: MonthlyReturn[];
}

export interface MonthlyReturn {
  mes: number;
  valor: number;
  acumulado: number;
}

