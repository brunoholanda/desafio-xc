import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-list-container" role="region" aria-labelledby="products-heading">
      <div class="products-grid" *ngIf="products.length > 0; else noProducts">
        <div
          *ngFor="let product of products"
          class="product-card"
          [attr.data-risk]="product.risco.toLowerCase()"
          role="article"
          [attr.aria-label]="'Produto: ' + product.nome">
          <div class="product-header">
            <h4 class="product-name">{{ product.nome }}</h4>
            <span class="product-type">{{ product.tipo }}</span>
          </div>

          <div class="product-details">
            <div class="product-info">
              <span class="info-label">Rentabilidade:</span>
              <span class="info-value rentability">{{ (product.rentabilidade * 100).toFixed(2) }}% a.a.</span>
            </div>
            <div class="product-info">
              <span class="info-label">Risco:</span>
              <span class="info-value risk-badge" [attr.data-risk]="product.risco.toLowerCase()">
                {{ product.risco }}
              </span>
            </div>
            <div class="product-info" *ngIf="product.valorMinimo">
              <span class="info-label">Valor Mínimo:</span>
              <span class="info-value">R$ {{ product.valorMinimo.toLocaleString('pt-BR') }}</span>
            </div>
            <div class="product-info" *ngIf="product.prazoMinimo">
              <span class="info-label">Prazo Mínimo:</span>
              <span class="info-value">{{ product.prazoMinimo }} dias</span>
            </div>
          </div>

          <p class="product-description" *ngIf="product.descricao">
            {{ product.descricao }}
          </p>

          <button
            class="simulate-btn"
            (click)="onSimulate(product)"
            [attr.aria-label]="'Simular investimento em ' + product.nome">
            Simular Investimento
          </button>
        </div>
      </div>

      <ng-template #noProducts>
        <p class="no-products">Nenhum produto disponível no momento.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .product-list-container {
      width: 100%;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .product-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      border-left: 4px solid;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .product-card[data-risk="baixo"] {
      border-left-color: #4CAF50;
    }

    .product-card[data-risk="médio"] {
      border-left-color: #FF9800;
    }

    .product-card[data-risk="alto"] {
      border-left-color: #F44336;
    }

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 0.5rem;
    }

    .product-name {
      font-size: 1.1rem;
      color: #003366;
      margin: 0;
      font-weight: 600;
      flex: 1;
    }

    .product-type {
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      color: #666;
      white-space: nowrap;
    }

    .product-details {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .product-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .info-label {
      font-size: 0.9rem;
      color: #666;
    }

    .info-value {
      font-weight: 600;
      color: #003366;
    }

    .rentability {
      color: #4CAF50;
      font-size: 1.1rem;
    }

    .risk-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    .risk-badge[data-risk="baixo"] {
      background: #E8F5E9;
      color: #2E7D32;
    }

    .risk-badge[data-risk="médio"] {
      background: #FFF3E0;
      color: #E65100;
    }

    .risk-badge[data-risk="alto"] {
      background: #FFEBEE;
      color: #C62828;
    }

    .product-description {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.5;
      margin-bottom: 1rem;
      flex: 1;
    }

    .simulate-btn {
      background: linear-gradient(135deg, #003366 0%, #004080 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s, transform 0.2s;
      margin-top: auto;
    }

    .simulate-btn:hover {
      background: linear-gradient(135deg, #004080 0%, #0050a0 100%);
      transform: scale(1.02);
    }

    .simulate-btn:active {
      transform: scale(0.98);
    }

    .simulate-btn:focus {
      outline: 2px solid #FF6600;
      outline-offset: 2px;
    }

    .no-products {
      text-align: center;
      color: #666;
      padding: 2rem;
    }

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
      .products-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
      }

      .product-card {
        padding: 1.25rem;
      }

      .product-name {
        font-size: 1.05rem;
      }

      .product-type {
        font-size: 0.7rem;
        padding: 0.2rem 0.65rem;
      }
    }

    /* Mobile */
    @media (max-width: 767px) {
      .products-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-top: 0.75rem;
      }

      .product-card {
        padding: 1rem;
        border-radius: 6px;
      }

      .product-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }

      .product-name {
        font-size: 1rem;
        width: 100%;
      }

      .product-type {
        font-size: 0.7rem;
        padding: 0.2rem 0.6rem;
        align-self: flex-start;
      }

      .product-details {
        gap: 0.6rem;
        margin-bottom: 0.75rem;
      }

      .product-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }

      .info-label {
        font-size: 0.85rem;
      }

      .info-value {
        font-size: 0.95rem;
      }

      .rentability {
        font-size: 1rem;
      }

      .risk-badge {
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
      }

      .product-description {
        font-size: 0.85rem;
        line-height: 1.4;
        margin-bottom: 0.75rem;
      }

      .simulate-btn {
        padding: 0.65rem 1.25rem;
        font-size: 0.9rem;
        width: 100%;
      }

      .no-products {
        padding: 1.5rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() simulate = new EventEmitter<Product>();

  onSimulate(product: Product): void {
    this.simulate.emit(product);
  }
}

