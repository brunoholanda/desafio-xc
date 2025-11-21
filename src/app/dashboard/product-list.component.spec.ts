import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Product } from '../../models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.products = [
      {
        id: 1,
        nome: 'CDB Test',
        tipo: 'CDB',
        rentabilidade: 0.12,
        risco: 'Baixo'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit simulate event', () => {
    const product: Product = {
      id: 1,
      nome: 'Test',
      tipo: 'CDB',
      rentabilidade: 0.12,
      risco: 'Baixo'
    };

    spyOn(component.simulate, 'emit');
    component.onSimulate(product);
    expect(component.simulate.emit).toHaveBeenCalledWith(product);
  });
});

