import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesListaComponent } from './clientes-lista';

describe('ClientesListaComponent', () => {
  let component: ClientesListaComponent;
  let fixture: ComponentFixture<ClientesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesListaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesListaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
