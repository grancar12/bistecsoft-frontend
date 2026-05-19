import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Producto, ProductoRequest } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/productos`;

  getAll(): Observable<{ data: Producto[] }> {
    return this.http.get<{ data: Producto[] }>(this.apiUrl);
  }

  getById(id: number): Observable<{ data: Producto }> {
    return this.http.get<{ data: Producto }>(`${this.apiUrl}/${id}`);
  }

  create(data: ProductoRequest): Observable<{ data: Producto }> {
    return this.http.post<{ data: Producto }>(this.apiUrl, data);
  }

  update(id: number, data: ProductoRequest): Observable<{ data: Producto }> {
    return this.http.put<{ data: Producto }>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}