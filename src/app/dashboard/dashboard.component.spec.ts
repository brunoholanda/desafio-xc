import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { InvestmentService } from '../../services/investment.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let investmentService: jasmine.SpyObj<InvestmentService>;
  let profileService: jasmine.SpyObj<ProfileService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const investmentSpy = jasmine.createSpyObj('InvestmentService', ['getInvestimentos', 'getProdutosRecomendados']);
    const profileSpy = jasmine.createSpyObj('ProfileService', ['getPerfilRisco', 'getPerfilColor', 'getPerfilDescription']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getCurrentClientId']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: InvestmentService, useValue: investmentSpy },
        { provide: ProfileService, useValue: profileSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    investmentService = TestBed.inject(InvestmentService) as jasmine.SpyObj<InvestmentService>;
    profileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    authService.getCurrentClientId.and.returnValue(123);
    investmentService.getInvestimentos.and.returnValue(of([]));
    profileService.getPerfilRisco.and.returnValue(of({
      clienteId: 123,
      perfil: 'Moderado',
      descricao: 'Test',
      pontuacao: 65
    }));
    profileService.getPerfilColor.and.returnValue('#FF9800');
    profileService.getPerfilDescription.and.returnValue('Test description');
    investmentService.getProdutosRecomendados.and.returnValue(of([]));

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    expect(authService.getCurrentClientId).toHaveBeenCalled();
    expect(investmentService.getInvestimentos).toHaveBeenCalledWith(123);
    expect(profileService.getPerfilRisco).toHaveBeenCalledWith(123);
  });

  it('should handle simulate product', () => {
    const product = { id: 1, nome: 'Test', tipo: 'CDB', rentabilidade: 0.12, risco: 'Baixo' as const };
    component.onSimulateProduct(product);
    expect(component.selectedProduct).toBe(product);
  });
});

