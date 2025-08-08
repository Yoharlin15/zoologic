//Boletos
export interface ITipoBoleto {
  TipoBoletoId: number;
  Descripcion: string;
  Precio: number;
}

export interface ICreateTipoBoletos {
  Descripcion: string;
  Precio: number;
}

//Compras
export interface ICompra {
  CompraId: number;
  UsuarioId: number;
  FechaCompra: string;
  TotalCompra: number;
  EstadoId: number;
  EstadoNombre: string;
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
  FechaFactura: string;
  MontoTotal: number;
  NumeroFactura: number;
}

export interface ICreateFactura {
  CompraId: number;
}


