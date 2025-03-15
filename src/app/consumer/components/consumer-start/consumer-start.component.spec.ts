import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerStartComponent } from './consumer-start.component';

describe('ConsumerStartComponent', () => {
  let component: ConsumerStartComponent;
  let fixture: ComponentFixture<ConsumerStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
