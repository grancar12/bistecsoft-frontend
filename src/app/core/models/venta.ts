import { Cliente } from './cliente';
import { DetalleVenta, DetalleVentaRequest } from './detalle-venta';

export interface Venta {
  id: number;
  cliente_id: number;
  total: number;
  fecha: string;
  cliente?: Cliente;
  detalles?: DetalleVenta[];
  created_at?: string;
}

export interface VentaRequest {
  cliente_id: number;
  fecha: string;
  detalles: DetalleVentaRequest[];
}