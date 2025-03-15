import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModifComponent } from './product-modif.component';

describe('ProductModifComponent', () => {
  let component: ProductModifComponent;
  let fixture: ComponentFixture<ProductModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
