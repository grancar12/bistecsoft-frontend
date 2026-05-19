import { Producto } from './producto';

export interface DetalleVenta {
  id: number;
  venta_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  producto?: Producto;
}

export interface DetalleVentaRequest {
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}