import { TestBed } from '@angular/core/testing';
import { InvestmentService } from './investment.service';
import { Investment, InvestmentSimulation } from '../models/investment.model';
import { RiskProfile } from '../models/profile.model';

describe('InvestmentService', () => {
  let service: InvestmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return investments', (done) => {
    service.getInvestimentos(123).subscribe(investments => {
      expect(investments).toBeTruthy();
      expect(investments.length).toBeGreaterThan(0);
      expect(investments[0].id).toBeDefined();
      done();
    });
  });

  it('should return recommended products for Conservador', (done) => {
    service.getProdutosRecomendados('Conservador').subscribe(products => {
      expect(products).toBeTruthy();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].risco).toBe('Baixo');
      done();
    });
  });

  it('should return recommended products for Moderado', (done) => {
    service.getProdutosRecomendados('Moderado').subscribe(products => {
      expect(products).toBeTruthy();
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return recommended products for Agressivo', (done) => {
    service.getProdutosRecomendados('Agressivo').subscribe(products => {
      expect(products).toBeTruthy();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].risco).toBe('Alto');
      done();
    });
  });

  it('should simulate investment', (done) => {
    const simulation: InvestmentSimulation = {
      valor: 10000,
      prazoMeses: 12,
      tipo: 'CDB'
    };

    service.simularInvestimento(simulation).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.valorFinal).toBeGreaterThan(simulation.valor);
      expect(result.rentabilidade).toBeGreaterThan(0);
      expect(result.detalhes).toContain('CDB');
      expect(result.retornoMensal).toBeDefined();
      expect(result.retornoMensal?.length).toBe(12);
      done();
    });
  });

  it('should calculate investment distribution', () => {
    const investments: Investment[] = [
      { id: 1, tipo: 'CDB', valor: 5000, rentabilidade: 0.12, data: '2025-01-15' },
      { id: 2, tipo: 'CDB', valor: 3000, rentabilidade: 0.12, data: '2025-01-16' },
      { id: 3, tipo: 'Fundo', valor: 2000, rentabilidade: 0.08, data: '2025-01-17' }
    ];

    const distribution = service.getInvestmentDistribution(investments);
    expect(distribution.length).toBe(2);
    expect(distribution.find(d => d.name === 'CDB')?.value).toBe(8000);
    expect(distribution.find(d => d.name === 'Fundo')?.value).toBe(2000);
  });

  it('should calculate investment evolution', () => {
    const investments: Investment[] = [
      { id: 1, tipo: 'CDB', valor: 5000, rentabilidade: 0.12, data: '2025-01-15' },
      { id: 2, tipo: 'Fundo', valor: 3000, rentabilidade: 0.08, data: '2025-03-10' }
    ];

    const evolution = service.getInvestmentEvolution(investments);
    expect(evolution.length).toBe(1);
    expect(evolution[0].series.length).toBe(2);
    expect(evolution[0].series[0].value).toBe(5000);
    expect(evolution[0].series[1].value).toBe(8000);
  });
});

