import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Investment, InvestmentSimulation, InvestmentSimulationResult, MonthlyReturn } from '../models/investment.model';
import { Product } from '../models/product.model';
import { RiskProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private readonly MOCK_INVESTMENTS: Investment[] = [
    {
      id: 1,
      tipo: 'CDB',
      valor: 5000,
      rentabilidade: 0.12,
      data: '2025-01-15'
    },
    {
      id: 2,
      tipo: 'Fundo Multimercado',
      valor: 3000,
      rentabilidade: 0.08,
      data: '2025-03-10'
    },
    {
      id: 3,
      tipo: 'Tesouro Direto',
      valor: 10000,
      rentabilidade: 0.10,
      data: '2024-11-20'
    },
    {
      id: 4,
      tipo: 'LCI',
      valor: 8000,
      rentabilidade: 0.11,
      data: '2024-09-05'
    }
  ];

  private readonly MOCK_PRODUCTS: Record<RiskProfile, Product[]> = {
    'Conservador': [
      {
        id: 101,
        nome: 'CDB Caixa 2026',
        tipo: 'CDB',
        rentabilidade: 0.11,
        risco: 'Baixo',
        descricao: 'CDB com rentabilidade garantida e liquidez diária',
        prazoMinimo: 90,
        valorMinimo: 1000
      },
      {
        id: 102,
        nome: 'LCI Caixa Imobiliário',
        tipo: 'LCI',
        rentabilidade: 0.10,
        risco: 'Baixo',
        descricao: 'Letra de Crédito Imobiliário isenta de IR',
        prazoMinimo: 180,
        valorMinimo: 1000
      },
      {
        id: 103,
        nome: 'Tesouro Selic',
        tipo: 'Tesouro Direto',
        rentabilidade: 0.095,
        risco: 'Baixo',
        descricao: 'Título público com liquidez diária',
        prazoMinimo: 0,
        valorMinimo: 30
      }
    ],
    'Moderado': [
      {
        id: 201,
        nome: 'CDB Caixa 2026',
        tipo: 'CDB',
        rentabilidade: 0.13,
        risco: 'Médio',
        descricao: 'CDB com rentabilidade atrativa e prazo médio',
        prazoMinimo: 180,
        valorMinimo: 1000
      },
      {
        id: 202,
        nome: 'Fundo Multimercado Caixa',
        tipo: 'Fundo',
        rentabilidade: 0.15,
        risco: 'Médio',
        descricao: 'Fundo diversificado com estratégia moderada',
        prazoMinimo: 30,
        valorMinimo: 500
      },
      {
        id: 203,
        nome: 'LCA Caixa Agro',
        tipo: 'LCA',
        rentabilidade: 0.12,
        risco: 'Médio',
        descricao: 'Letra de Crédito do Agronegócio isenta de IR',
        prazoMinimo: 180,
        valorMinimo: 1000
      },
      {
        id: 204,
        nome: 'Tesouro IPCA+',
        tipo: 'Tesouro Direto',
        rentabilidade: 0.11,
        risco: 'Médio',
        descricao: 'Proteção contra inflação com rentabilidade real',
        prazoMinimo: 0,
        valorMinimo: 30
      }
    ],
    'Agressivo': [
      {
        id: 301,
        nome: 'Fundo Agressivo XPTO',
        tipo: 'Fundo',
        rentabilidade: 0.18,
        risco: 'Alto',
        descricao: 'Fundo de ações com potencial de alto retorno',
        prazoMinimo: 90,
        valorMinimo: 1000
      },
      {
        id: 302,
        nome: 'Fundo Multimercado Alavancado',
        tipo: 'Fundo',
        rentabilidade: 0.20,
        risco: 'Alto',
        descricao: 'Fundo com estratégia agressiva e alavancagem',
        prazoMinimo: 180,
        valorMinimo: 5000
      },
      {
        id: 303,
        nome: 'Ações Caixa',
        tipo: 'Ações',
        rentabilidade: 0.22,
        risco: 'Alto',
        descricao: 'Carteira de ações diversificada',
        prazoMinimo: 365,
        valorMinimo: 1000
      }
    ]
  };

  getInvestimentos(clienteId: number): Observable<Investment[]> {
    return of(this.MOCK_INVESTMENTS).pipe(delay(300));
  }

  getProdutosRecomendados(perfil: RiskProfile): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS[perfil] || []).pipe(delay(300));
  }

  simularInvestimento(simulation: InvestmentSimulation): Observable<InvestmentSimulationResult> {
    const taxas: Record<string, number> = {
      'CDB': 0.12,
      'LCI': 0.11,
      'LCA': 0.12,
      'Tesouro Direto': 0.10,
      'Fundo': 0.15,
      'Ações': 0.20
    };

    const taxaAnual = taxas[simulation.tipo] || 0.12;
    const taxaMensal = Math.pow(1 + taxaAnual, 1/12) - 1;
    const valorFinal = simulation.valor * Math.pow(1 + taxaMensal, simulation.prazoMeses);
    const rentabilidade = (valorFinal - simulation.valor) / simulation.valor;

    const retornoMensal: MonthlyReturn[] = [];
    let acumulado = simulation.valor;

    for (let mes = 1; mes <= simulation.prazoMeses; mes++) {
      acumulado = acumulado * (1 + taxaMensal);
      retornoMensal.push({
        mes,
        valor: acumulado - simulation.valor,
        acumulado
      });
    }

    const result: InvestmentSimulationResult = {
      valorFinal: Math.round(valorFinal * 100) / 100,
      rentabilidade: Math.round(rentabilidade * 10000) / 10000,
      detalhes: `Simulação baseada em ${simulation.tipo} com taxa de ${(taxaAnual * 100).toFixed(2)}% ao ano.`,
      retornoMensal
    };

    return of(result).pipe(delay(500));
  }

  getInvestmentDistribution(investments: Investment[]): { name: string; value: number }[] {
    const distribution: Record<string, number> = {};

    investments.forEach(inv => {
      distribution[inv.tipo] = (distribution[inv.tipo] || 0) + inv.valor;
    });

    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  }

  getInvestmentEvolution(investments: Investment[]): { name: string; series: { name: string; value: number }[] }[] {
    const sorted = [...investments].sort((a, b) =>
      new Date(a.data).getTime() - new Date(b.data).getTime()
    );

    let acumulado = 0;
    const series = sorted.map(inv => {
      acumulado += inv.valor;
      return {
        name: new Date(inv.data).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
        value: acumulado
      };
    });

    return [{
      name: 'Evolução do Patrimônio',
      series
    }];
  }
}

