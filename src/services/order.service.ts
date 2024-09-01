import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderStatus } from './orderservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private base_url:string= "http://localhost:8080/orders";
  constructor(private http:HttpClient) { }


  updateOrderStatus(orderId:number,orderStatus:OrderStatus):Observable<any> {
    return this.http.put(`${this.base_url}/${orderId}?orderStatus=${orderStatus}`,{})
  }


  getOrders(page:number,size:number):Observable<any>
  {
  return  this.http.get<any>(`${this.base_url}/user/pageable?page=${page}&size=${size}`)
  }


}
