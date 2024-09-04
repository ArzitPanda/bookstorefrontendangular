import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequestItem } from '../model/OrderRequestItem';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {
  private baseurl = "http://localhost:8080/orders";

  constructor(private http: HttpClient) { }

  createOrder(value:{orderRequestList: OrderRequestItem[],paymentVerificationRequest:any}): Observable<any[]> {
    return this.http.post<OrderResponse[]>(`${this.baseurl}`, value);
  }


  getOrder():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseurl+"/user"}`)
  }

}



export class OrderResponse {
  userId!:number
  orderId!:number
  orderStatus!:OrderStatus
  quantity!:number
  bookName!:string
  bookId!:string


  // Define the properties of OrderResponse based on your backend response
}
export enum OrderStatus
{
  CONFIRM="CONFIRM",
  CANCEL="CANCEL",
  SHIPPED="SHIPPED",
  DISPATCHED="DISPATCHED",
  DELIVERED="DELIVERED"
}
