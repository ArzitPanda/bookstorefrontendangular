import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private base_url:string= "http://localhost:8080/";
  constructor(private http: HttpClient) {}
  getBooks(page: number, size: number): Observable<any> {
    

    return this.http.get<any>(`${this.base_url+"books"}?page=${page}&size=${size}`);
  }
  getBookById(bookId:number): Observable<any> {
    

    return this.http.get<any>(`${this.base_url+"books/"+bookId}`);
  }
}
