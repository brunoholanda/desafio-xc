import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);

    // Note: window.location.reload() is called after successful login
    // In headless test environment, this should not cause issues
    // We don't mock it as window.location is not easily mockable

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authService.login.and.returnValue(of({ token: 'test-token', clienteId: 123 }));

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login on form submit', fakeAsync(() => {
    component.credentials = { email: 'test@example.com', senha: '123456' };
    component.onLogin();
    tick(); // Wait for async operations
    expect(authService.login).toHaveBeenCalledWith(component.credentials);
    // Note: window.location.reload() is called after login but won't cause issues in headless mode
  }));

  it('should set loading to true during login', fakeAsync(() => {
    component.credentials = { email: 'test@example.com', senha: '123456' };
    component.onLogin();
    expect(component.loading).toBeTrue();
    tick(); // Wait for async operations
    expect(component.loading).toBeFalse();
  }));
});

