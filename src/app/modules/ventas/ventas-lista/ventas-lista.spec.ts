import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasListaComponent } from './ventas-lista';

describe('VentasListaComponent', () => {
  let component: VentasListaComponent;
  let fixture: ComponentFixture<VentasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasListaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VentasListaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
