import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VentaService } from '../../../core/services/venta.service';
import { Venta } from '../../../core/models/venta';

@Component({
  selector: 'app-ventas-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ventas-lista.html',
})
export class VentasListaComponent implements OnInit {
  private ventaService = inject(VentaService);

  ventas: Venta[] = [];
  loading = true;
  error = '';
  eliminando: number | null = null;
  ventaExpandida: number | null = null;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.ventaService.getAll().subscribe({
      next: (r) => { this.ventas = r.data; this.loading = false; },
      error: () => { this.error = 'Error al cargar ventas'; this.loading = false; }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar esta venta? Se restaurará el stock de los productos.')) return;
    this.eliminando = id;
    this.ventaService.delete(id).subscribe({
      next: () => { this.ventas = this.ventas.filter(v => v.id !== id); this.eliminando = null; },
      error: () => { this.error = 'Error al eliminar venta'; this.eliminando = null; }
    });
  }

  toggleDetalles(id: number): void {
    this.ventaExpandida = this.ventaExpandida === id ? null : id;
  }
}