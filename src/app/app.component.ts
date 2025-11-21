import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardComponent, LoginComponent],
  template: `
    <div class="app-container">
      <header class="app-header" role="banner" *ngIf="isAuthenticated">
        <div class="header-content">
          <div class="header-left">
            <button class="menu-button" aria-label="Menu">
              <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span class="menu-text">Menu</span>
            </button>
            <div class="logo-section">
              <span class="caixa-logo"><img src="assets/CAIXA_2cores_negativa.png"
            alt="Logo da CAIXA" class="logo-img"></span>
            </div>
            <div class="separator"></div>
            <span class="system-name">SIDSC Sistema do Design System</span>
          </div>
          <div class="header-right">
            <div class="user-info">
              <div class="user-greeting">Olá {{ userName }}</div>
              <div class="user-unit">{{ userUnit }}</div>
            </div>
            <button class="notification-button" aria-label="Notificações">
              <svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span class="notification-text">Notificações</span>
              <span class="notification-badge">5</span>
            </button>
            <button class="profile-button" aria-label="Perfil">
              <svg class="profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span class="profile-text">Perfil</span>
            </button>
          </div>
        </div>
      </header>
      <div class="classification-bar" *ngIf="isAuthenticated">
        <span class="classification-text">Conteúdo #EXTERNO.CONFIDENCIAL</span>
        <span class="user-role">{{ userRole }}</span>
      </div>
      <header class="app-header-simple" role="banner" *ngIf="!isAuthenticated">
        <div class="header-content">
          <div class="logo-container">
            <h1 class="logo-text" aria-label="Caixa Econômica Federal"><img src="assets/CAIXA_2cores_negativa.png"
            alt="Logo da CAIXA" class="logo-img">
          <span class="logo-frase">Investimentos</span>
          </h1>
          </div>
        </div>
      </header>
      <main class="app-main" role="main">
        <app-login *ngIf="!isAuthenticated"></app-login>
        <app-dashboard *ngIf="isAuthenticated"></app-dashboard>
      </main>

      <footer class="caixa-footer" role="contentinfo">
</footer>
    </div>

  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      width: 100%;
    }

    .logo-img{
      width: 110px;
    height: auto;
      max-width: 100%;
    }

    .logo-text {
      display: flex;
      align-items: center;
      gap: 15px;
      margin: 0;
        font-weight: 600;
      color: #FF6B00;
      font-size: 16px;
    }

    .logo-frase {
      align-items: center;
      font-size: 16px;
      color: #ffffffff;
      font-weight: 400;
    }

    .app-header {
      background: #003896;
      color: white;
      padding: 0.75rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      margin: 0;
    }

    .app-header-simple {
      background: linear-gradient(135deg, #003896 0%, #004080 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: 80px;
      width: 100%;
      margin: 0;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 2rem;
      box-sizing: border-box;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .menu-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.25rem;
      gap: 0.25rem;
    }

    .menu-icon {
      width: 24px;
      height: 24px;
    }

    .menu-text {
      font-size: 0.75rem;
      font-weight: 400;
    }

    .logo-section {
      display: flex;
      align-items: center;
    }

    .caixa-logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      letter-spacing: 1px;
    }

    .caixa-x {
      color: #FF6B00;
    }

    .separator {
      width: 1px;
      height: 30px;
      background: white;
      margin: 0 1rem;
    }

    .system-name {
      font-size: 0.9rem;
      font-weight: 400;
      color: white;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .user-greeting {
      font-size: 0.9rem;
      font-weight: 400;
      color: white;
    }

    .user-unit {
      font-size: 0.75rem;
      font-weight: 300;
      color: white;
      opacity: 0.9;
    }

    .notification-button,
    .profile-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.25rem;
      gap: 0.25rem;
      position: relative;
    }

    .notification-icon,
    .profile-icon {
      width: 24px;
      height: 24px;
    }

    .notification-text,
    .profile-text {
      font-size: 0.75rem;
      font-weight: 400;
    }

    .notification-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #dc3545;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: bold;
    }

    .classification-bar {
      background: #e0e0e0;
      padding: 0.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      font-size: 0.85rem;
      color: #333;
    }

    .classification-text {
      font-weight: 400;
    }

    .user-role {
      font-weight: 400;
    }

    .logo-container {
      display: flex;
      align-items: baseline;
      gap: 1rem;
    }

    .logo-text {
      font-size: 2rem;
      font-weight: bold;
      margin: 0;
      letter-spacing: 2px;
      height: 40px;
      width: auto;
    }

    .subtitle {
      font-size: 0.9rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .header-nav {
      display: flex;
      gap: 1rem;
    }

    .logout-btn {
      background-color: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .logout-btn:hover {
      background-color: rgba(255,255,255,0.3);
    }

    .app-main {
      flex: 1;
      padding: 2rem;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .caixa-footer {
  background: linear-gradient(135deg, #003896 0%, #004080 100%);
  color: white;
  padding: 2rem 0 1rem 0;
  margin-top: auto;
  width: 100%;
  margin: 0;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  box-sizing: border-box;
}

.footer-section h3 {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 1rem;
  border-bottom: 2px solid #00a8e8;
  padding-bottom: 0.5rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #e6f3ff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #00a8e8;
  text-decoration: underline;
}

.footer-copyright {
  grid-column: 1 / -1;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #0050a0;
  margin-top: 1rem;
  font-size: 14px;
  color: #cce4ff;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
      .header-content {
        padding: 0 1.5rem;
      }

      .logo-img {
        width: 90px;
      }

      .logo-text {
        font-size: 1.4rem;
      }

      .logo-frase {
        font-size: 14px;
      }

      .app-main {
        padding: 1.5rem;
      }

      .system-name {
        font-size: 0.8rem;
      }

      .user-greeting {
        font-size: 0.85rem;
      }

      .user-unit {
        font-size: 0.7rem;
      }
    }

    /* Mobile */
    @media (max-width: 767px) {
      .app-header {
        padding: 0.5rem 0;
      }

      .app-header-simple {
        height: auto;
        min-height: 80px;
        padding: 0.75rem 0;
      }

      .header-content {
        padding: 0 1rem;
      }

      .header-left {
        gap: 0.5rem;
      }

      .system-name {
        display: none;
      }

      .separator {
        display: none;
      }

      .logo-container {
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .logo-img {
        width: 80px;
      }

      .logo-text {
        font-size: 1.2rem;
        gap: 10px;
        height: auto;
      }

      .logo-frase {
        font-size: 13px;
      }

      .header-right {
        gap: 0.75rem;
      }

      .user-info {
        display: none;
      }

      .notification-text,
      .profile-text {
        display: none;
      }

      .app-main {
        padding: 1rem;
      }

      .classification-bar {
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
      }

      .subtitle {
        display: none;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  userName = 'João da Silva';
  userUnit = 'Unidade de Design';
  userRole = 'Cargo do Usuário';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Auto-login para demonstração
    if (!this.authService.isAuthenticated()) {
      // Opcional: fazer login automático para facilitar testes
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
