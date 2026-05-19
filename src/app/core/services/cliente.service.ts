import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cliente, ClienteRequest } from '../models/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/clientes`;

  getAll(): Observable<{ data: Cliente[] }> {
    return this.http.get<{ data: Cliente[] }>(this.apiUrl);
  }

  getById(id: number): Observable<{ data: Cliente }> {
    return this.http.get<{ data: Cliente }>(`${this.apiUrl}/${id}`);
  }

  create(data: ClienteRequest): Observable<{ data: Cliente }> {
    return this.http.post<{ data: Cliente }>(this.apiUrl, data);
  }

  update(id: number, data: ClienteRequest): Observable<{ data: Cliente }> {
    return this.http.put<{ data: Cliente }>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
