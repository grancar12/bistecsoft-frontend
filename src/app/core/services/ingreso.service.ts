import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResumenIngresos, Ingreso } from '../models/ingreso';

@Injectable({ providedIn: 'root' })
export class IngresoService {
  private http = inject(HttpClient);
  private api  = environment.apiUrl;

  getByFecha(fecha: string) {
    const params = new HttpParams().set('fecha', fecha);
    return this.http.get<ResumenIngresos>(`${this.api}/ingresos`, { params });
  }

  store(data: { descripcion: string; monto: number }) {
    return this.http.post<{ data: Ingreso }>(`${this.api}/ingresos`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/ingresos/${id}`);
  }
}