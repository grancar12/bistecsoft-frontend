import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Venta, VentaRequest } from '../models/venta';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/ventas`;

  getAll(): Observable<{ data: Venta[] }> {
    return this.http.get<{ data: Venta[] }>(this.apiUrl);
  }

  getById(id: number): Observable<{ data: Venta }> {
    return this.http.get<{ data: Venta }>(`${this.apiUrl}/${id}`);
  }

  create(data: VentaRequest): Observable<{ data: Venta }> {
    return this.http.post<{ data: Venta }>(this.apiUrl, data);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}