import { IProduct } from "./IProduct";
import { IUserInformation } from "./ISession";

export interface OrderDataMP {
    quantity: string;
    price: string;
    amount: number;
    description: string;
}

interface ProductId {
    id: string;
}

export interface OrderData {
    userId?: string;
    products: ProductId[];
    token?: string; // Opcional si es necesario
}

export interface OrderResponse {
    order: {
      id: string;
      date: string;
      user: {
        id: string;
        name: string;
      };
    };
    price: number;
    orderDetailId: string;
}

interface Order {
  id:string,
  date:string
}

export interface OrderDetailInformation {
  order: Order,
  orderDetail: IProduct[]
}

export interface IOrderUserBasicInfo { 
  id:string,
  date:string
}

// export interface IOrder { 
//   id:string,
//   date:string,
//   user: IUserInformation
//   status:string
// }

// export interface orderProducts {
//     id:string
//     product:IProduct
//     quantity:number
// }
// export interface OrderDetail {
//   id:string,
//   price?:number, 
//   order:IOrder,
//   detailOrder:orderProducts[]
// }

// export interface IOrderDetail{
//   order:IOrder,
// }

export interface IOrderProduct {
  productId: string;
  productName: string;
  quantity: number;
}

export interface IOrderDetail {
  id: string;
  price: number;
  products: IOrderProduct[];
}

export interface IOrder {
  id: string;
  date: string; // Fecha en formato ISO o string
  status: string; // Estado del pedido
  user: IUserInformation; // Información del usuario asociado al pedido
}

export interface IOrderResponse {
  order: IOrder;
  orderDetail: IOrderDetail;
}
