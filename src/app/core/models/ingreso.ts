export interface Ingreso {
  id: number;
  tipo: 'venta' | 'manual';
  descripcion: string;
  monto: number;
  venta_id: number | null;
  fecha: string;
  hora: string;
}

export interface ResumenIngresos {
  data: Ingreso[];
  total_ventas: number;
  total_manuales: number;
  total_dia: number;
  fecha: string;
}