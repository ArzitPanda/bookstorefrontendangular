import { Component, inject, OnInit } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BookResponse } from '../../model/BookResponse';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [BookCardComponent,MatPaginatorModule,MatSelectModule, NgxPaginationModule,CommonModule,MatSliderModule,FormsModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  mostRated: string = 'all';
  bestseller: string = 'all';
  priceRange: number = 1000;
  books: BookResponse[] = [];
  sortKey: string = 'name';
  page: number = 0;
  totalElements: number = 0;
 
  constructor(private bookService: BookService,private cartService:CartService) {}
  private _snackBar = inject(MatSnackBar);
  ngOnInit(): void {
   this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks(this.page , 5).subscribe(response => {
      this.books = response.content;
      this.totalElements = response.totalElements;
    });
  }
  onPageChange(event: any): void {
    this.page = event.pageIndex ;
    this.fetchBooks();
  }

  addToCart(bookId: number): void {
    this.cartService.addToCart(bookId, 1).subscribe(response => {
    
      console.log('Book added to cart:', response);
      this._snackBar.open('Add to cart sucessfully', 'Undo', {
        duration: 3000
      });
    });
   
  }

  onDeleteCartItem(cartItemId:number):void{
    this.cartService.deleteCartItem(cartItemId).subscribe(response => {
      console.log('Book remove  from cart:', response);
      this._snackBar.open('removed sucessfully', 'Undo', {
        duration: 3000
      });
    });
  
  }

}
