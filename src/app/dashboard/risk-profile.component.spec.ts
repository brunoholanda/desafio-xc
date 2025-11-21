import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskProfileComponent } from './risk-profile.component';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';

describe('RiskProfileComponent', () => {
  let component: RiskProfileComponent;
  let fixture: ComponentFixture<RiskProfileComponent>;
  let profileService: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    const profileSpy = jasmine.createSpyObj('ProfileService', ['getPerfilColor', 'getPerfilDescription']);

    await TestBed.configureTestingModule({
      imports: [RiskProfileComponent],
      providers: [
        { provide: ProfileService, useValue: profileSpy }
      ]
    }).compileComponents();

    profileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    profileService.getPerfilColor.and.returnValue('#FF9800');
    profileService.getPerfilDescription.and.returnValue('Test description');

    fixture = TestBed.createComponent(RiskProfileComponent);
    component = fixture.componentInstance;
    component.profile = {
      clienteId: 123,
      perfil: 'Moderado',
      descricao: 'Test',
      pontuacao: 65
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get profile color', () => {
    const color = component.getProfileColor();
    expect(color).toBe('#FF9800');
    expect(profileService.getPerfilColor).toHaveBeenCalledWith('Moderado');
  });

  it('should get profile explanation', () => {
    const explanation = component.getProfileExplanation();
    expect(explanation).toBe('Test description');
    expect(profileService.getPerfilDescription).toHaveBeenCalledWith('Moderado');
  });
});

