import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private base_url: string = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) {}

  addToCart(bookId: number, quantity: number): Observable<any> {
    const url = `${this.base_url}/${bookId}`;
    const body = { quantity };
    return this.http.post<any>(url, body);
  }

  getCartItems():Observable<any>
  {
    return this.http.get<any>(this.base_url);
  }

  deleteCartItem(cartItemId:number):Observable<any>
  {
    return this.http.delete<any>(this.base_url+`/${cartItemId}`);
  }
}
