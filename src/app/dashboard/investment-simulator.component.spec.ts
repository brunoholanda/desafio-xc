import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentSimulatorComponent } from './investment-simulator.component';
import { InvestmentService } from '../../services/investment.service';
import { of } from 'rxjs';
import { InvestmentSimulationResult } from '../../models/investment.model';

describe('InvestmentSimulatorComponent', () => {
  let component: InvestmentSimulatorComponent;
  let fixture: ComponentFixture<InvestmentSimulatorComponent>;
  let investmentService: jasmine.SpyObj<InvestmentService>;

  beforeEach(async () => {
    const investmentSpy = jasmine.createSpyObj('InvestmentService', ['simularInvestimento']);

    await TestBed.configureTestingModule({
      imports: [InvestmentSimulatorComponent],
      providers: [
        { provide: InvestmentService, useValue: investmentSpy }
      ]
    }).compileComponents();

    investmentService = TestBed.inject(InvestmentService) as jasmine.SpyObj<InvestmentService>;

    fixture = TestBed.createComponent(InvestmentSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form correctly', () => {
    component.simulation = {
      valor: 1000,
      prazoMeses: 12,
      tipo: 'CDB'
    };
    expect(component.isFormValid()).toBeTrue();

    component.simulation.valor = 50;
    expect(component.isFormValid()).toBeFalse();

    component.simulation.valor = 1000;
    component.simulation.tipo = '';
    expect(component.isFormValid()).toBeFalse();
  });

  it('should simulate investment', () => {
    const mockResult: InvestmentSimulationResult = {
      valorFinal: 11200,
      rentabilidade: 0.12,
      detalhes: 'Test',
      retornoMensal: []
    };

    investmentService.simularInvestimento.and.returnValue(of(mockResult));

    component.simulation = {
      valor: 10000,
      prazoMeses: 12,
      tipo: 'CDB'
    };

    component.onSimulate();

    expect(investmentService.simularInvestimento).toHaveBeenCalled();
    expect(component.result).toBeTruthy();
  });
});

