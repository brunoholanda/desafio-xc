import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { LoginRequest } from '../models/auth.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return token and clienteId', (done) => {
    const credentials: LoginRequest = {
      email: 'test@example.com',
      senha: '123456'
    };

    service.login(credentials).subscribe(response => {
      expect(response.token).toBeTruthy();
      expect(response.clienteId).toBe(123);
      done();
    });
  });

  it('should store token and clienteId in localStorage after login', (done) => {
    const credentials: LoginRequest = {
      email: 'test@example.com',
      senha: '123456'
    };

    service.login(credentials).subscribe(() => {
      expect(localStorage.getItem('token')).toBeTruthy();
      expect(localStorage.getItem('clienteId')).toBe('123');
      done();
    });
  });

  it('should logout and clear localStorage', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('clienteId', '123');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('clienteId')).toBeNull();
    expect(service.getCurrentClientId()).toBeNull();
  });

  it('should return current clientId from localStorage', () => {
    localStorage.setItem('clienteId', '456');
    expect(service.getCurrentClientId()).toBe(456);
  });

  it('should return null if not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return true if authenticated', () => {
    localStorage.setItem('token', 'test-token');
    expect(service.isAuthenticated()).toBeTrue();
  });
});

