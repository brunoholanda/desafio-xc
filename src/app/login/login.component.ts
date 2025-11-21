import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container" role="main" aria-labelledby="login-heading">
      <div class="login-card">
        <h2 id="login-heading" class="login-title">Painel de Investimentos</h2>
        <img
      src="assets/CAIXA_INVEST.png"
      alt="Caixa Econômica Federal"
      class="login-logo"
    >
                <form (ngSubmit)="onLogin()" class="login-form" [attr.aria-label]="'Formulário de login'">
          <div class="form-group">
            <label for="email" class="form-label">Usuário</label>
            <input
              id="email"
              type="email"
              class="form-input"
              [(ngModel)]="credentials.email"
              name="email"
              required
              [attr.aria-required]="true"
              placeholder="Cliente123">
          </div>

          <div class="form-group">
            <label for="senha" class="form-label">Senha</label>
            <input
              id="senha"
              type="password"
              class="form-input"
              [(ngModel)]="credentials.senha"
              name="senha"
              required
              [attr.aria-required]="true"
              placeholder="Digite sua senha">
          </div>

          <button
            type="submit"
            class="login-button"
            [disabled]="loading"
            [attr.aria-disabled]="loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="login-hint">Para demonstração, use qualquer usuário e senha</p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 2rem;
    }

    .login-card {
      background: #011220ff;
      border-radius: 12px;
      padding: 3rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .login-title {
      font-size: 1.35rem;
      color: #fdfeffff;
      margin-bottom: 0.5rem;
      text-align: center;
      font-weight: 600;
    }

    .login-logo {
      width: 200px;
      height: auto;
      margin: 0 auto 25px;
      display: block;

    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      font-weight: 600;
      color: #fdfeffff;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .form-input {
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-input:focus {
      outline: none;
      border-color: #003366;
      box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.1);
    }

    .login-button {
      background: linear-gradient(135deg, #e97c07ff 0%, #da7204ff 100%);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s, transform 0.2s;
      margin-top: 0.5rem;
    }

    .login-button:hover:not(:disabled) {
      background: linear-gradient(135deg, #004080 0%, #0050a0 100%);
      transform: scale(1.02);
    }

    .login-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .login-hint {
      text-align: center;
      color: #666;
      font-size: 0.85rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
    }

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
      .login-container {
        padding: 1.5rem;
      }

      .login-card {
        padding: 2.5rem;
        max-width: 450px;
      }

      .login-logo {
        width: 180px;
      }
    }

    /* Mobile */
    @media (max-width: 767px) {
      .login-container {
        min-height: calc(100vh - 160px);
        padding: 1rem;
      }

      .login-card {
        padding: 2rem 1.5rem;
        max-width: 100%;
      }

      .login-title {
        font-size: 1.2rem;
        margin-bottom: 0.75rem;
      }

      .login-logo {
        width: 150px;
        margin-bottom: 20px;
      }

      .login-form {
        gap: 1.25rem;
      }

      .form-label {
        font-size: 0.85rem;
      }

      .form-input {
        padding: 0.65rem;
        font-size: 0.95rem;
      }

      .login-button {
        padding: 0.9rem;
        font-size: 0.95rem;
      }

      .login-hint {
        font-size: 0.8rem;
        margin-top: 1.25rem;
        padding-top: 1.25rem;
      }
    }
  `]
})
export class LoginComponent {
  credentials: LoginRequest = {
    email: '',
    senha: ''
  };
  loading = false;

  constructor(private authService: AuthService) {}

  onLogin(): void {
    if (!this.credentials.email || !this.credentials.senha) return;

    this.loading = true;
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.loading = false;
        window.location.reload();
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.loading = false;
      }
    });
  }
}

