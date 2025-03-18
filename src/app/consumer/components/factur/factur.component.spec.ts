import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturComponent } from './factur.component';

describe('FacturComponent', () => {
  let component: FacturComponent;
  let fixture: ComponentFixture<FacturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
