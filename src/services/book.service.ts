import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRequest } from '../model/BookRequest';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private base_url:string= "http://localhost:8080/";
  constructor(private http: HttpClient) {}
  getBooks(page: number, size: number,sort?:string,minPrice?:number,maxPrice?:number,search?:string,rating?:number): Observable<any> {
    

    let queryParams = `?page=${page}&size=${size}`;

    if (sort !== undefined) {
        queryParams += `&sort=${sort}`;
    }
    if (minPrice !== undefined) {
        queryParams += `&minPrice=${minPrice}`;
    }
    if (maxPrice !== undefined) {
        queryParams += `&maxPrice=${maxPrice}`;
    }
    if (search !== undefined) {
        queryParams += `&Key=${search}`;
    }
    if (rating !== undefined) {
      queryParams += `&rating=${rating}`;
  }
console.log(queryParams)
    return this.http.get<any>(`${this.base_url}books${queryParams}`);
  }
  getBookById(bookId:number): Observable<any> {
    

    return this.http.get<any>(`${this.base_url+"books/"+bookId}`);
  }

  addBook(bookRequest: BookRequest, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', bookRequest.name);
    formData.append('description', bookRequest.description);
    formData.append('quantity', bookRequest.quantity.toString());
    formData.append('price', bookRequest.price.toString());
    formData.append('authorName', bookRequest.authorName);
    formData.append('discountPrice', bookRequest.discountPrice.toString());
    formData.append('image', image, image.name);

    return this.http.post(this.base_url + "books", formData);
}


  deleteBook(bookId:number):Observable<any>
  {
    return this.http.delete(this.base_url+"books/"+bookId);
  }

  addToWishList(bookId:number):Observable<any>
  {
    return this.http.post(this.base_url+"wishlist/"+bookId,{});

  }
  removeFromWishList(bookId:number):Observable<any>
  {
    return this.http.delete(this.base_url+"wishlist/"+bookId,{});

  }
  getWishList():Observable<any>
  {
    
    return this.http.get<any>(`${this.base_url+"wishlist"}`);
  }



}
