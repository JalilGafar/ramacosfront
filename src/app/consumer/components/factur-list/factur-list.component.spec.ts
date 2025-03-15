import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturListComponent } from './factur-list.component';

describe('FacturListComponent', () => {
  let component: FacturListComponent;
  let fixture: ComponentFixture<FacturListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
