import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VentaService } from '../../../core/services/venta.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { ProductoService } from '../../../core/services/producto.service';
import { Cliente } from '../../../core/models/cliente';
import { Producto } from '../../../core/models/producto';

@Component({
  selector: 'app-ventas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ventas-form.html',
})
export class VentasFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ventaService = inject(VentaService);
  private clienteService = inject(ClienteService);
  private productoService = inject(ProductoService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  clientes: Cliente[] = [];
  productos: Producto[] = [];
  loading = false;
  error = '';

  form: FormGroup = this.fb.group({
    cliente_id: [null, Validators.required],
    fecha:      [new Date().toISOString().split('T')[0], Validators.required],
    detalles:   this.fb.array([])
  });

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  get total(): number {
    return this.detalles.controls.reduce((acc, ctrl) => {
      const cantidad = ctrl.get('cantidad')?.value || 0;
      const precio = ctrl.get('precio_unitario')?.value || 0;
      return acc + (cantidad * precio);
    }, 0);
  }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe({
      next: r => { this.clientes = r.data; this.cdr.detectChanges(); },
      error: () => {}
    });
    this.productoService.getAll().subscribe({
      next: r => { this.productos = r.data; this.cdr.detectChanges(); },
      error: () => {}
    });
    this.agregarDetalle();
  }

  agregarDetalle(): void {
    this.detalles.push(this.fb.group({
      producto_id:     [null, Validators.required],
      cantidad:        [1, [Validators.required, Validators.min(1)]],
      precio_unitario: [null, [Validators.required, Validators.min(0)]],
    }));
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  onProductoChange(index: number): void {
    const productoId = this.detalles.at(index).get('producto_id')?.value;
    const producto = this.productos.find(p => p.id === +productoId);
    if (producto) {
      this.detalles.at(index).patchValue({ precio_unitario: producto.precio });
    }
    this.cdr.detectChanges();
  }

  subtotal(index: number): number {
    const cantidad = this.detalles.at(index).get('cantidad')?.value || 0;
    const precio = this.detalles.at(index).get('precio_unitario')?.value || 0;
    return cantidad * precio;
  }

  // Verifica si el producto en el índice dado está agotado
  productoAgotado(index: number): boolean {
    const productoId = this.detalles.at(index).get('producto_id')?.value;
    if (!productoId) return false;
    const producto = this.productos.find(p => p.id === +productoId);
    return producto ? producto.stock === 0 : false;
  }

  // Verifica si hay algún producto agotado en la lista
  hayProductosAgotados(): boolean {
    return this.detalles.controls.some((_, i) => this.productoAgotado(i));
  }

  submit(): void {
    if (this.form.invalid || this.detalles.length === 0 || this.hayProductosAgotados()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';

    this.ventaService.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/ventas']),
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar la venta';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}