import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { IngresoService } from '../../core/services/ingreso.service';
import { Ingreso } from '../../core/models/ingreso';

@Component({
  selector: 'app-ingresos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingresos-lista.html',
})
export class IngresosListaComponent implements OnInit {
  private ingresoService = inject(IngresoService);
  private cdr            = inject(ChangeDetectorRef);

  ingresos:       Ingreso[] = [];
  totalVentas   = 0;
  totalManuales = 0;
  totalDia      = 0;

  fechaSeleccionada = new Date(
  new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })
  ).toISOString().split('T')[0];
  loading  = true;
  error    = '';

  // Formulario manual
  showForm    = false;
  descripcion = '';
  monto: number | null = null;
  guardando  = false;
  eliminando: number | null = null;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.error   = '';

    this.ingresoService.getByFecha(this.fechaSeleccionada).pipe(
      catchError(() => of(null))
    ).subscribe({
      next: (r) => {
        if (r) {
          this.ingresos       = r.data;
          this.totalVentas    = r.total_ventas;
          this.totalManuales  = r.total_manuales;
          this.totalDia       = r.total_dia;
        } else {
          this.error = 'Error al cargar ingresos';
        }
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  guardarManual(): void {
    if (!this.descripcion || !this.monto) return;
    this.guardando = true;

    this.ingresoService.store({ descripcion: this.descripcion, monto: this.monto }).subscribe({
      next: () => {
        this.descripcion = '';
        this.monto       = null;
        this.showForm    = false;
        this.guardando   = false;
        this.cargar();
      },
      error: () => {
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este ingreso manual?')) return;
    this.eliminando = id;

    this.ingresoService.delete(id).subscribe({
      next: () => {
        this.ingresos      = this.ingresos.filter(i => i.id !== id);
        this.totalManuales = this.ingresos
          .filter(i => i.tipo === 'manual')
          .reduce((a, i) => a + Number(i.monto), 0);
        this.totalDia  = this.totalVentas + this.totalManuales;
        this.eliminando = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.eliminando = null;
        this.cdr.detectChanges();
      }
    });
  }
}