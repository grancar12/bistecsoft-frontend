import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto';

@Component({
  selector: 'app-productos-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos-lista.html',
})
export class ProductosListaComponent implements OnInit {
  private productoService = inject(ProductoService);

  productos: Producto[] = [];
  loading = true;
  error = '';
  eliminando: number | null = null;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.error = '';
    this.productoService.getAll().pipe(
      catchError(() => of({ data: [] as Producto[] }))
    ).subscribe({
      next: (r) => {
        this.productos = r.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar productos';
        this.loading = false;
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    this.eliminando = id;
    this.productoService.delete(id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== id);
        this.eliminando = null;
      },
      error: () => {
        this.error = 'Error al eliminar producto';
        this.eliminando = null;
      }
    });
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'danger';
    if (stock <= 5) return 'warning';
    return 'success';
  }
}