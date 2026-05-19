import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-clientes-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './clientes-form.html',
})
export class ClientesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup = this.fb.group({
    nombre:   ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    telefono: [''],
  });

  id: number | null = null;
  loading = false;
  error = '';
  get esEdicion(): boolean { return !!this.id; }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.esEdicion) {
      this.clienteService.getById(this.id!).subscribe({
        next: (r) => this.form.patchValue(r.data),
        error: () => this.error = 'Error al cargar cliente'
      });
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.error = '';

    const op = this.esEdicion
      ? this.clienteService.update(this.id!, this.form.value)
      : this.clienteService.create(this.form.value);

    op.subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar cliente';
        this.loading = false;
      }
    });
  }
}