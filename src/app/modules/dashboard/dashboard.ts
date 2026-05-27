import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../core/services/cliente.service';
import { ProductoService } from '../../core/services/producto.service';
import { VentaService } from '../../core/services/venta.service';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private productoService = inject(ProductoService);
  private ventaService = inject(VentaService);
  private cdr = inject(ChangeDetectorRef);

  totalClientes = 0;
  totalProductos = 0;
  totalVentas = 0;
  ingresoTotal = 0;

  ngOnInit(): void {
    this.clienteService.getAll().subscribe({
      next: r => { this.totalClientes = r.data.length; this.cdr.detectChanges(); },
      error: () => {}
    });

    this.productoService.getAll().subscribe({
      next: r => { this.totalProductos = r.data.length; this.cdr.detectChanges(); },
      error: () => {}
    });

    this.ventaService.getAll().subscribe({
      next: r => {
        this.totalVentas = r.data.length;
        this.ingresoTotal = r.data.reduce((acc, v) => acc + Number(v.total), 0);
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }
}