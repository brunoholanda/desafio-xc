import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentChartComponent } from './investment-chart.component';
import { RiskProfileComponent } from './risk-profile.component';
import { ProductListComponent } from './product-list.component';
import { InvestmentSimulatorComponent } from './investment-simulator.component';
import { InvestmentService } from '../../services/investment.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { Investment } from '../../models/investment.model';
import { Profile, RiskProfile } from '../../models/profile.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    InvestmentChartComponent,
    RiskProfileComponent,
    ProductListComponent,
    InvestmentSimulatorComponent
  ],
  template: `
    <div class="dashboard-container" role="region" aria-label="Painel de investimentos">
      <h2 class="dashboard-title">Dashboard de Investimentos</h2>

      <div class="dashboard-grid">
        <section class="dashboard-section risk-section" aria-labelledby="risk-profile-title">
          <app-risk-profile
            [profile]="profile"
            (profileChange)="onProfileChange($event)"
            *ngIf="profile">
          </app-risk-profile>
        </section>

        <section class="dashboard-section chart-section" aria-labelledby="charts-title">
          <h3 id="charts-title" class="section-title">Análise de Investimentos</h3>
          <app-investment-chart
            [investments]="investments">
          </app-investment-chart>
        </section>

        <section class="dashboard-section products-section" aria-labelledby="products-title">
          <h3 id="products-title" class="section-title">Produtos Recomendados</h3>
          <app-product-list
            [products]="products"
            (simulate)="onSimulateProduct($event)">
          </app-product-list>
        </section>

        <section class="dashboard-section simulator-section" aria-labelledby="simulator-title">
          <h3 id="simulator-title" class="section-title">Simulador de Investimento</h3>
          <app-investment-simulator
            [selectedProduct]="selectedProduct">
          </app-investment-simulator>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      width: 100%;
    }

    .dashboard-title {
      font-size: 2rem;
      color: #003366;
      margin-bottom: 2rem;
      font-weight: 600;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .dashboard-section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .risk-section {
      grid-column: span 1;
    }

    .chart-section {
      grid-column: span 3;
    }

    .products-section {
      grid-column: span 2;
    }

    .simulator-section {
      grid-column: span 2;
    }

    .section-title {
      font-size: 1.25rem;
      color: #003366;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
      .dashboard-container {
        padding: 0;
      }

      .dashboard-title {
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
      }

      .dashboard-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .chart-section {
        grid-column: span 2;
      }

      .products-section,
      .simulator-section {
        grid-column: span 1;
      }

      .dashboard-section {
        padding: 1.25rem;
      }

      .section-title {
        font-size: 1.15rem;
      }
    }

    /* Mobile */
    @media (max-width: 767px) {
      .dashboard-container {
        width: 100%;
        padding: 0;
      }

      .dashboard-title {
        font-size: 1.5rem;
        margin-bottom: 1.25rem;
        padding: 0 0.5rem;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }

      .chart-section,
      .products-section,
      .simulator-section,
      .risk-section {
        grid-column: span 1;
      }

      .dashboard-section {
        padding: 1rem;
        border-radius: 6px;
      }

      .section-title {
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  investments: Investment[] = [];
  profile: Profile | null = null;
  products: any[] = [];
  selectedProduct: any = null;

  constructor(
    private investmentService: InvestmentService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const clienteId = this.authService.getCurrentClientId();
    if (!clienteId) return;

    this.investmentService.getInvestimentos(clienteId).subscribe({
      next: (data) => {
        this.investments = data;
      },
      error: (err) => console.error('Erro ao carregar investimentos:', err)
    });

    this.profileService.getPerfilRisco(clienteId).subscribe({
      next: (data) => {
        this.profile = data;
        this.loadProducts(data.perfil);
      },
      error: (err) => console.error('Erro ao carregar perfil:', err)
    });
  }

  loadProducts(perfil: string): void {
    this.investmentService.getProdutosRecomendados(perfil as any).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  onSimulateProduct(product: any): void {
    this.selectedProduct = product;
  }

  onProfileChange(perfil: RiskProfile): void {
    if (this.profile) {
      this.profile = {
        ...this.profile,
        perfil: perfil,
        descricao: this.profileService.getPerfilDescription(perfil)
      };
    }
    this.loadProducts(perfil);
  }
}

