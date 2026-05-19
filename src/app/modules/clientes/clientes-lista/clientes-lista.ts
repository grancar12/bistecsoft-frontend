import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente } from '../../../core/models/cliente';

@Component({
  selector: 'app-clientes-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clientes-lista.html',
})
export class ClientesListaComponent implements OnInit {
  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];
  loading = true;
  error = '';
  eliminando: number | null = null;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.clienteService.getAll().subscribe({
      next: (r) => { this.clientes = r.data; this.loading = false; },
      error: () => { this.error = 'Error al cargar clientes'; this.loading = false; }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return;
    this.eliminando = id;
    this.clienteService.delete(id).subscribe({
      next: () => { this.clientes = this.clientes.filter(c => c.id !== id); this.eliminando = null; },
      error: () => { this.error = 'Error al eliminar cliente'; this.eliminando = null; }
    });
  }
}