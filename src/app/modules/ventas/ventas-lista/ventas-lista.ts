import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { VentaService } from '../../../core/services/venta.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { Venta } from '../../../core/models/venta';
import { Cliente } from '../../../core/models/cliente';

@Component({
  selector: 'app-ventas-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ventas-lista.html',
})
export class VentasListaComponent implements OnInit {
  private ventaService = inject(VentaService);
  private clienteService = inject(ClienteService);
  private cdr = inject(ChangeDetectorRef);

  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];
  clientes: Cliente[] = [];

  loading = true;
  error = '';
  eliminando: number | null = null;
  ventaExpandida: number | null = null;

  // Filtros
  filtroCliente = '';
  filtroFechaDesde = '';
  filtroFechaHasta = '';

  ngOnInit(): void {
    this.cargar();
    this.clienteService.getAll().pipe(
      catchError(() => of({ data: [] as Cliente[] }))
    ).subscribe({
      next: r => { this.clientes = r.data; this.cdr.detectChanges(); }
    });
  }

  cargar(): void {
    this.loading = true;
    this.error = '';
    this.ventaService.getAll().pipe(
      catchError(() => of({ data: [] as Venta[] }))
    ).subscribe({
      next: (r) => {
        this.ventas = r.data;
        this.ventasFiltradas = r.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar ventas';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrar(): void {
    this.ventasFiltradas = this.ventas.filter(v => {
      // Filtro por cliente
      const coincideCliente = this.filtroCliente
        ? v.cliente_id === +this.filtroCliente
        : true;

      // Filtro por fecha desde
      const coincideDesde = this.filtroFechaDesde
        ? v.fecha >= this.filtroFechaDesde
        : true;

      // Filtro por fecha hasta
      const coincideHasta = this.filtroFechaHasta
        ? v.fecha <= this.filtroFechaHasta
        : true;

      return coincideCliente && coincideDesde && coincideHasta;
    });
    this.cdr.detectChanges();
  }

  limpiarFiltros(): void {
    this.filtroCliente = '';
    this.filtroFechaDesde = '';
    this.filtroFechaHasta = '';
    this.ventasFiltradas = this.ventas;
    this.cdr.detectChanges();
  }

  get hayFiltrosActivos(): boolean {
    return !!(this.filtroCliente || this.filtroFechaDesde || this.filtroFechaHasta);
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar esta venta? Se restaurará el stock de los productos.')) return;
    this.eliminando = id;
    this.ventaService.delete(id).subscribe({
      next: () => {
        this.ventas = this.ventas.filter(v => v.id !== id);
        this.ventasFiltradas = this.ventasFiltradas.filter(v => v.id !== id);
        this.eliminando = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al eliminar venta';
        this.eliminando = null;
        this.cdr.detectChanges();
      }
    });
  }

  toggleDetalles(id: number): void {
    this.ventaExpandida = this.ventaExpandida === id ? null : id;
    this.cdr.detectChanges();
  }

  get totalFiltrado(): number {
    return this.ventasFiltradas.reduce((acc, v) => acc + Number(v.total), 0);
  }
}