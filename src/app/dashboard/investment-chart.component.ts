import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Investment } from '../../models/investment.model';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  template: `
    <div class="charts-container" role="region" aria-label="Gráficos de investimentos">
      <div class="chart-wrapper" *ngIf="distributionData.length > 0">
        <h4 class="chart-title">Distribuição por Tipo</h4>
        <ngx-charts-pie-chart
          [results]="distributionData"
          [legend]="false"
          [labels]="true"
          [doughnut]="true"
          [arcWidth]="0.4"
          [scheme]="colorScheme"
          [view]="chartView"
          [trimLabels]="false">
        </ngx-charts-pie-chart>
      </div>

      <div class="chart-wrapper" *ngIf="evolutionData.length > 0">
        <h4 class="chart-title">Evolução do Patrimônio</h4>
        <ngx-charts-line-chart
          [results]="evolutionData"
          [legend]="false"
          [showXAxisLabel]="true"
          [showYAxisLabel]="true"
          [showGridLines]="true"
          xAxisLabel="Período"
          yAxisLabel="Valor (R$)"
          [scheme]="colorScheme"
          [view]="chartView"
          [xAxisTickFormatting]="xAxisTickFormatting"
          [yAxisTickFormatting]="yAxisTickFormatting">
        </ngx-charts-line-chart>
      </div>
    </div>
  `,
  styles: [`
    .charts-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      margin-top: 1rem;
    }

    .chart-wrapper {
      min-height: 300px;
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .chart-title {
      font-size: 1rem;
      color: #666;
      margin-bottom: 1rem;
      font-weight: 500;
      text-align: center;
      width: 100%;
    }

    ::ng-deep .chart-wrapper ngx-charts-pie-chart,
    ::ng-deep .chart-wrapper ngx-charts-line-chart {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    ::ng-deep .chart-wrapper .ngx-charts {
      margin: 0 auto;
      display: block;
    }

    ::ng-deep .chart-wrapper ngx-charts-pie-chart > div,
    ::ng-deep .chart-wrapper ngx-charts-line-chart > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .pie-chart-wrapper {
      min-height: 300px;
      justify-content: start;
    }

    ::ng-deep .pie-chart-wrapper .chart-legend {
    position: relative !important;
    margin-top: 1rem !important;
    padding-top: 1rem !important;
    border-top: 1px solid #e0e0e0 !important;
    width: 100% !important;
}

::ng-deep .chart-wrapper .chart-legend {
    width: 100% !important;
}

::ng-deep .chart-legend .legend-items {
    width: 100% !important;
}

::ng-deep .chart-legend .legend-item {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    max-width: none !important;
    margin: 0.25rem 0.5rem !important;
}

::ng-deep .chart-legend .legend-label-text,
::ng-deep .chart-legend .legend-label span,
::ng-deep .chart-legend .legend-label {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    max-width: none !important;
    width: auto !important;
    display: inline-block !important;
    word-wrap: break-word !important;
}

::ng-deep .pie-chart-wrapper .chart-legend .legend-label-text,
::ng-deep .pie-chart-wrapper .chart-legend .legend-label span,
::ng-deep .pie-chart-wrapper .chart-legend .legend-label {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    max-width: none !important;
    width: auto !important;
    display: inline-block !important;
    word-wrap: break-word !important;
}

::ng-deep .pie-chart-wrapper .legend-wrap {
    display: flex !important;
    justify-content: center !important;
    flex-wrap: wrap !important;
    gap: 0.5rem !important;
    width: calc(140% - 10px) !important;
}

::ng-deep .chart-legend .legend-wrap {
    width: calc(155% - 10px) !important;
}

::ng-deep .chart-legend .legend-label-text {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    max-width: none !important;
    width: auto !important;
}

::ng-deep .chart-legend .legend-label {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    max-width: none !important;
}

::ng-deep .chart-legend .legend-label span {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    max-width: none !important;
    display: inline-block !important;
}

::ng-deep .pie-chart-wrapper .ngx-charts {
    height: 200px !important;
}

    /* Desktop/PC */
    @media (min-width: 1025px) {
      ::ng-deep .chart-wrapper ngx-charts-pie-chart,
      ::ng-deep .chart-wrapper ngx-charts-line-chart {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
      }

      ::ng-deep .chart-wrapper ngx-charts-pie-chart > div,
      ::ng-deep .chart-wrapper ngx-charts-line-chart > div {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
      }

      ::ng-deep .chart-wrapper .ngx-charts {
        margin: 0 auto !important;
        display: block !important;
      }

      ::ng-deep .chart-wrapper .chart-legend {
        position: relative !important;
        margin-top: 0 !important;
        padding-top: 0 !important;
        border-top: none !important;
        border-left: 1px solid #e0e0e0 !important;
        padding-left: 1.5rem !important;
        margin-left: 0 !important;
        width: auto !important;
        min-width: 200px !important;
        max-width: 300px !important;
        flex: 0 0 auto !important;
        order: 2 !important;
        display: block !important;
      }

      ::ng-deep .chart-wrapper .ngx-charts {
        flex: 0 0 auto !important;
        order: 1 !important;
        display: block !important;
      }

      ::ng-deep .chart-wrapper .chart-legend .legend-wrap {
        width: 100% !important;
        justify-content: flex-start !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        display: flex !important;
      }

      ::ng-deep .chart-wrapper .chart-legend .legend-item {
        margin: 0.5rem 0 !important;
        width: 100% !important;
      }
    }

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
      .charts-container {
        gap: 1.5rem;
        margin-top: 0.75rem;
      }

      .chart-wrapper {
        min-height: 280px;
        padding: 0.75rem;
      }

      .chart-title {
        font-size: 0.95rem;
        margin-bottom: 0.75rem;
      }

      ::ng-deep .pie-chart-wrapper .ngx-charts {
        height: 220px !important;
      }
    }

    /* Mobile - Legenda abaixo */
    @media (max-width: 1024px) {
      .charts-container {
        gap: 1.25rem;
        margin-top: 0.5rem;
      }

      .chart-wrapper {
        min-height: 250px;
        padding: 0.5rem;
      }

      .chart-title {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      ::ng-deep .chart-wrapper ngx-charts-pie-chart,
      ::ng-deep .chart-wrapper ngx-charts-line-chart {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
      }

      ::ng-deep .chart-wrapper ngx-charts-pie-chart > div,
      ::ng-deep .chart-wrapper ngx-charts-line-chart > div {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        flex-direction: column !important;
        width: 100% !important;
      }

      ::ng-deep .chart-wrapper .ngx-charts {
        margin: 0 auto !important;
        display: block !important;
      }

      ::ng-deep .chart-wrapper .chart-legend {
        position: relative !important;
        margin-top: 1rem !important;
        padding-top: 1rem !important;
        border-top: 1px solid #e0e0e0 !important;
        border-left: none !important;
        padding-left: 0 !important;
        width: 100% !important;
        order: 2 !important;
      }

      ::ng-deep .chart-wrapper .ngx-charts {
        order: 1 !important;
      }

      ::ng-deep .pie-chart-wrapper .ngx-charts {
        height: 180px !important;
      }

      ::ng-deep .pie-chart-wrapper .legend-wrap {
        gap: 0.4rem !important;
        width: 100% !important;
        flex-direction: row !important;
        justify-content: center !important;
        flex-wrap: wrap !important;
      }

      ::ng-deep .chart-legend .legend-wrap {
        width: 100% !important;
        flex-direction: row !important;
        justify-content: center !important;
        flex-wrap: wrap !important;
      }
    }
  `]
})
export class InvestmentChartComponent implements OnChanges {
  @Input() investments: Investment[] = [];

  distributionData: { name: string; value: number }[] = [];
  evolutionData: { name: string; series: { name: string; value: number }[] }[] = [];

  colorScheme: any = {
    domain: ['#003366', '#FF6600', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0']
  };

  chartView: [number, number] = [700, 300];

  constructor(private investmentService: InvestmentService) {
    this.updateChartView();
    window.addEventListener('resize', () => {
      this.updateChartView();
    });
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['investments'] && this.investments.length > 0) {
      this.distributionData = this.investmentService.getInvestmentDistribution(this.investments);
      this.evolutionData = this.investmentService.getInvestmentEvolution(this.investments);
    }
  }

  xAxisTickFormatting = (value: string): string => {
    return value;
  }

  yAxisTickFormatting = (value: number): string => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}k`;
    } else {
      return `R$ ${value.toFixed(0)}`;
    }
  }
}

