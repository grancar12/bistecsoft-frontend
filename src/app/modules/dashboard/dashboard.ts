import { Component, inject, OnInit } from '@angular/core';
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

  totalClientes = 0;
  totalProductos = 0;
  totalVentas = 0;
  ingresoTotal = 0;

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(r => this.totalClientes = r.data.length);
    this.productoService.getAll().subscribe(r => this.totalProductos = r.data.length);
    this.ventaService.getAll().subscribe(r => {
      this.totalVentas = r.data.length;
      this.ingresoTotal = r.data.reduce((acc, v) => acc + Number(v.total), 0);
    });
  }
}