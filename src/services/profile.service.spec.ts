import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { RiskProfile } from '../models/profile.model';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return perfil risco', (done) => {
    service.getPerfilRisco(123).subscribe(profile => {
      expect(profile).toBeTruthy();
      expect(profile.clienteId).toBe(123);
      expect(profile.perfil).toBe('Moderado');
      expect(profile.pontuacao).toBe(65);
      done();
    });
  });

  it('should return perfil history', (done) => {
    service.getPerfilHistory(123).subscribe(history => {
      expect(history).toBeTruthy();
      expect(history.length).toBeGreaterThan(0);
      expect(history[0].perfil).toBeDefined();
      done();
    });
  });

  it('should return description for Conservador', () => {
    const description = service.getPerfilDescription('Conservador');
    expect(description).toContain('segurança');
  });

  it('should return description for Moderado', () => {
    const description = service.getPerfilDescription('Moderado');
    expect(description).toContain('Equilibra');
  });

  it('should return description for Agressivo', () => {
    const description = service.getPerfilDescription('Agressivo');
    expect(description).toContain('maximizar');
  });

  it('should return color for each profile', () => {
    expect(service.getPerfilColor('Conservador')).toBe('#4CAF50');
    expect(service.getPerfilColor('Moderado')).toBe('#FF9800');
    expect(service.getPerfilColor('Agressivo')).toBe('#F44336');
  });
});

