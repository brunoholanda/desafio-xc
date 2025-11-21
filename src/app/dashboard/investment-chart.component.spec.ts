import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentChartComponent } from './investment-chart.component';
import { InvestmentService } from '../../services/investment.service';
import { Investment } from '../../models/investment.model';

describe('InvestmentChartComponent', () => {
  let component: InvestmentChartComponent;
  let fixture: ComponentFixture<InvestmentChartComponent>;
  let investmentService: jasmine.SpyObj<InvestmentService>;

  beforeEach(async () => {
    const investmentSpy = jasmine.createSpyObj('InvestmentService', [
      'getInvestmentDistribution',
      'getInvestmentEvolution'
    ]);

    await TestBed.configureTestingModule({
      imports: [InvestmentChartComponent],
      providers: [
        { provide: InvestmentService, useValue: investmentSpy }
      ]
    }).compileComponents();

    investmentService = TestBed.inject(InvestmentService) as jasmine.SpyObj<InvestmentService>;
    investmentService.getInvestmentDistribution.and.returnValue([
      { name: 'CDB', value: 5000 }
    ]);
    investmentService.getInvestmentEvolution.and.returnValue([
      { name: 'Evolução', series: [{ name: 'Jan', value: 5000 }] }
    ]);

    fixture = TestBed.createComponent(InvestmentChartComponent);
    component = fixture.componentInstance;
    component.investments = [
      { id: 1, tipo: 'CDB', valor: 5000, rentabilidade: 0.12, data: '2025-01-15' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data on investments change', () => {
    const investments: Investment[] = [
      { id: 1, tipo: 'CDB', valor: 5000, rentabilidade: 0.12, data: '2025-01-15' }
    ];
    component.investments = investments;
    component.ngOnChanges({ investments: { currentValue: investments, previousValue: [], firstChange: false, isFirstChange: () => false } } as any);

    expect(investmentService.getInvestmentDistribution).toHaveBeenCalledWith(investments);
    expect(investmentService.getInvestmentEvolution).toHaveBeenCalledWith(investments);
  });
});

