import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../../services/investment.service';
import { InvestmentSimulation, InvestmentSimulationResult } from '../../models/investment.model';
import { Product } from '../../models/product.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-investment-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  template: `
    <div class="simulator-container" role="region" aria-labelledby="simulator-heading">
      <form
        class="simulator-form"
        (ngSubmit)="onSimulate()"
        [attr.aria-label]="'Formulário de simulação de investimento'">
        <div class="form-group">
          <label for="valor" class="form-label">Valor do Investimento (R$)</label>
          <input
            id="valor"
            type="number"
            class="form-input"
            [(ngModel)]="simulation.valor"
            name="valor"
            min="100"
            step="100"
            required
            [attr.aria-required]="true"
            aria-describedby="valor-desc">
          <small id="valor-desc" class="form-hint">Valor mínimo: R$ 100,00</small>
        </div>

        <div class="form-group">
          <label for="prazo" class="form-label">Prazo (meses)</label>
          <input
            id="prazo"
            type="number"
            class="form-input"
            [(ngModel)]="simulation.prazoMeses"
            name="prazoMeses"
            min="1"
            max="120"
            required
            [attr.aria-required]="true"
            aria-describedby="prazo-desc">
          <small id="prazo-desc" class="form-hint">Entre 1 e 120 meses</small>
        </div>

        <div class="form-group">
          <label for="tipo" class="form-label">Tipo de Investimento</label>
          <select
            id="tipo"
            class="form-select"
            [(ngModel)]="simulation.tipo"
            name="tipo"
            required
            [attr.aria-required]="true">
            <option value="">Selecione um tipo</option>
            <option value="CDB">CDB</option>
            <option value="LCI">LCI</option>
            <option value="LCA">LCA</option>
            <option value="Tesouro Direto">Tesouro Direto</option>
            <option value="Fundo">Fundo</option>
            <option value="Ações">Ações</option>
          </select>
        </div>

        <button
          type="submit"
          class="simulate-button"
          [disabled]="!isFormValid()"
          [attr.aria-disabled]="!isFormValid()">
          Simular
        </button>
      </form>

      <div
        class="simulation-result"
        *ngIf="result"
        role="region"
        aria-live="polite"
        aria-label="Resultado da simulação">
        <h4 class="result-title">Resultado da Simulação</h4>

        <div class="result-summary">
          <div class="result-item">
            <span class="result-label">Valor Inicial:</span>
            <span class="result-value">R$ {{ simulation.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Valor Final:</span>
            <span class="result-value highlight">R$ {{ result.valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Rentabilidade:</span>
            <span class="result-value highlight">{{ (result.rentabilidade * 100).toFixed(2) }}%</span>
          </div>
          <div class="result-item">
            <span class="result-label">Lucro:</span>
            <span class="result-value highlight">R$ {{ (result.valorFinal - simulation.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
          </div>
        </div>

        <p class="result-details">{{ result.detalhes }}</p>

        <div class="monthly-chart" *ngIf="result.retornoMensal && result.retornoMensal.length > 0">
          <h5 class="chart-title">Evolução Mês a Mês</h5>
          <ngx-charts-line-chart
            [results]="monthlyChartData"
            [legend]="true"
            [showXAxisLabel]="true"
            [showYAxisLabel]="true"
            xAxisLabel="Mês"
            yAxisLabel="Valor (R$)"
            [scheme]="colorScheme"
            [view]="chartView">
          </ngx-charts-line-chart>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .simulator-container {
      width: 100%;
    }

    .simulator-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      font-weight: 600;
      color: #003366;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .form-input,
    .form-select {
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: #003366;
      box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.1);
    }

    .form-hint {
      font-size: 0.75rem;
      color: #666;
      margin-top: 0.25rem;
    }

    .simulate-button {
      grid-column: 1 / -1;
      background: linear-gradient(135deg, #FF6600 0%, #FF8533 100%);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s, transform 0.2s;
      align-self: end;
    }

    .simulate-button:hover:not(:disabled) {
      background: linear-gradient(135deg, #FF8533 0%, #FF9933 100%);
      transform: scale(1.02);
    }

    .simulate-button:disabled {
      background: #ccc;
      cursor: not-allowed;
      opacity: 0.6;
    }

    .simulation-result {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 2rem;
      margin-top: 2rem;
    }

    .result-title {
      font-size: 1.25rem;
      color: #003366;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .result-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .result-item {
      background: white;
      padding: 1rem;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .result-label {
      font-size: 0.9rem;
      color: #666;
    }

    .result-value {
      font-size: 1.25rem;
      font-weight: 600;
      color: #003366;
    }

    .result-value.highlight {
      color: #FF6600;
      font-size: 1.5rem;
    }

    .result-details {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .monthly-chart {
      margin-top: 2rem;
    }

    .chart-title {
      font-size: 1rem;
      color: #003366;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
      .simulator-form {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
      }

      .simulate-button {
        grid-column: 1 / -1;
      }

      .result-summary {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.9rem;
      }

      .simulation-result {
        padding: 1.5rem;
      }

      .result-title {
        font-size: 1.15rem;
        margin-bottom: 1.25rem;
      }

      .result-item {
        padding: 0.9rem;
      }

      .result-value {
        font-size: 1.15rem;
      }

      .result-value.highlight {
        font-size: 1.35rem;
      }
    }

    /* Mobile */
    @media (max-width: 767px) {
      .simulator-container {
        width: 100%;
      }

      .simulator-form {
        grid-template-columns: 1fr;
        gap: 1.25rem;
        margin-bottom: 1.5rem;
      }

      .form-group {
        width: 100%;
      }

      .form-label {
        font-size: 0.85rem;
        margin-bottom: 0.4rem;
      }

      .form-input,
      .form-select {
        padding: 0.65rem;
        font-size: 0.95rem;
      }

      .form-hint {
        font-size: 0.7rem;
      }

      .simulate-button {
        grid-column: 1 / -1;
        padding: 0.9rem 1.5rem;
        font-size: 0.95rem;
        width: 100%;
      }

      .simulation-result {
        padding: 1.25rem;
        margin-top: 1.5rem;
        border-radius: 6px;
      }

      .result-title {
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }

      .result-summary {
        grid-template-columns: 1fr;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .result-item {
        padding: 0.75rem;
        gap: 0.4rem;
      }

      .result-label {
        font-size: 0.85rem;
      }

      .result-value {
        font-size: 1.1rem;
      }

      .result-value.highlight {
        font-size: 1.3rem;
      }

      .result-details {
        font-size: 0.85rem;
        line-height: 1.5;
        margin-bottom: 1rem;
      }

      .monthly-chart {
        margin-top: 1.5rem;
      }

      .chart-title {
        font-size: 0.95rem;
        margin-bottom: 0.75rem;
      }
    }
  `]
})
export class InvestmentSimulatorComponent implements OnInit, OnChanges {
  @Input() selectedProduct: Product | null = null;

  simulation: InvestmentSimulation = {
    valor: 1000,
    prazoMeses: 12,
    tipo: ''
  };

  result: InvestmentSimulationResult | null = null;
  monthlyChartData: { name: string; series: { name: string; value: number }[] }[] = [];

  colorScheme: any = {
    domain: ['#003366', '#FF6600']
  };

  chartView: [number, number] = [700, 300];

  constructor(private investmentService: InvestmentService) {
    this.updateChartView();
    window.addEventListener('resize', () => this.updateChartView());
  }

  private updateChartView(): void {
    if (window.innerWidth < 768) {
      this.chartView = [Math.max(window.innerWidth - 40, 280), 250];
    } else if (window.innerWidth < 1025) {
      this.chartView = [Math.min(window.innerWidth - 80, 600), 280];
    } else {
      this.chartView = [700, 300];
    }
  }

  ngOnInit(): void {
    if (this.selectedProduct) {
      this.simulation.tipo = this.selectedProduct.tipo;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProduct'] && this.selectedProduct) {
      this.simulation.tipo = this.selectedProduct.tipo;
    }
  }

  isFormValid(): boolean {
    return !!(
      this.simulation.valor &&
      this.simulation.valor >= 100 &&
      this.simulation.prazoMeses &&
      this.simulation.prazoMeses >= 1 &&
      this.simulation.tipo
    );
  }

  onSimulate(): void {
    if (!this.isFormValid()) return;

    this.investmentService.simularInvestimento(this.simulation).subscribe({
      next: (data) => {
        this.result = data;
        if (data.retornoMensal) {
          this.monthlyChartData = [{
            name: 'Valor Acumulado',
            series: data.retornoMensal.map(item => ({
              name: `Mês ${item.mes}`,
              value: Math.round(item.acumulado * 100) / 100
            }))
          }];
        }
      },
      error: (err) => {
        console.error('Erro ao simular investimento:', err);
      }
    });
  }
}

