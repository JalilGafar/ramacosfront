import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturDetailComponent } from './factur-detail.component';

describe('FacturDetailComponent', () => {
  let component: FacturDetailComponent;
  let fixture: ComponentFixture<FacturDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
