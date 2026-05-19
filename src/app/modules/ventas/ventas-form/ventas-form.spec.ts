import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasFormComponent } from './ventas-form';

describe('VentasFormComponent', () => {
  let component: VentasFormComponent;
  let fixture: ComponentFixture<VentasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VentasFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
