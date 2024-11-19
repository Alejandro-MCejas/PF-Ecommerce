import { IProduct } from "./IProduct";

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