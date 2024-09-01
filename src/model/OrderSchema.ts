export enum OrderStatus {
    CONFIRM = 'CONFIRM',
    CANCEL = 'CANCEL',
    SHIPPED = 'SHIPPED',
    DISPATCHED = 'DISPATCHED',
    DELIVERED = 'DELIVERED'
  }
  
 export  interface OrderResponse {
    userId: number;
    orderId: number;
    orderStatus: OrderStatus;
    quantity: number;
    bookName: string;
    bookId: number;
  }