import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItemResponseDto } from '../model/CartItemResponseDto';


export enum AddingType
{
  INCREMENT="INCREMENT",
  FULL="FULL"
}

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItemResponseDto[] = [
  
  ];
  cartTotal:number=0;
  private base_url: string = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) {}


 

  addToCart(bookId: number, quantity: number,type:AddingType): Observable<any> {
    const url = `${this.base_url}/${bookId}`;
    const body = { quantity ,type };
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
