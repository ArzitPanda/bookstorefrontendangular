import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequestItem } from '../model/OrderRequestItem';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/payment';

  constructor(private http: HttpClient) { }

  getOrderIdRzrPay(orderRequestItem:OrderRequestItem[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/order`,orderRequestItem);
  }
}
