//Boletos
export interface ITipoBoleto {
  TipoBoletoId: number;
  Descripcion: string;
  Precio: number;
}

export interface IValidacionBoleto {
  valido: boolean;
  Estado: string;        // "Válido" | "Usado" | "Vencido" | "No encontrado"
  mensaje: string;
  BoletoId: number;
  CompraId: number;
  Cantidad: number;
  Descripcion: string;
  CodigoQR: string;
  Vencimiento?: string | null;
}

export interface ICreateTipoBoletos {
  Descripcion: string;
  Precio: number;
}

//Compras
export interface ICompra {
  CompraId: number;
  UsuarioId: number;
  NombreUsuario:string;
  FechaCompra: string;
  TotalCompra: number;
  EstadoId: number;
  NombreEstado: string;
  FechaVisita: string;
}

export interface IDetalleCompraItem {
  TipoBoletoId: number;
  Cantidad: number;
}

export interface ICreateCompra {
  UsuarioId: number;
  FechaVisita: string | Date | null;
  DetalleCompra: IDetalleCompraItem[];
}
//Pagos

export interface IPago {
  IPagoId: number;
  CompraId: number;
  StripePaymentIntentId: string;
}

export interface ICreatePago {
  CompraId: number;
  StripePaymentIntentId: string;
}

//Facturas
export interface IFactura {
  FacturaId: number;
  CompraId: number;
  UsuarioId: number;
  NombreUsuario: string;
  FechaFactura: string;
  MontoTotal: number;
  NumeroFactura: number;
}

export interface IFacturaDetalle {
  DetalleFacturaId: number;
  FacturaId: number;
  TipoBoletoId: number;
  Descripcion: string;
  Cantidad: number;
  PrecioUnitario: number;
  precioTotal: number;
}

export interface ICreateFactura {
  CompraId: number;
}


