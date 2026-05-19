import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-productos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './productos-form.html',
})
export class ProductosFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup = this.fb.group({
    nombre:      ['', Validators.required],
    descripcion: [''],
    precio:      [null, [Validators.required, Validators.min(0)]],
    stock:       [null, [Validators.required, Validators.min(0)]],
  });

  id: number | null = null;
  loading = false;
  error = '';
  get esEdicion(): boolean { return !!this.id; }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.esEdicion) {
      this.productoService.getById(this.id!).subscribe({
        next: (r) => this.form.patchValue(r.data),
        error: () => this.error = 'Error al cargar producto'
      });
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.error = '';

    const op = this.esEdicion
      ? this.productoService.update(this.id!, this.form.value)
      : this.productoService.create(this.form.value);

    op.subscribe({
      next: () => this.router.navigate(['/productos']),
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar producto';
        this.loading = false;
      }
    });
  }
}