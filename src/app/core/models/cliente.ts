export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ClienteRequest {
  nombre: string;
  email: string;
  telefono?: string;
}