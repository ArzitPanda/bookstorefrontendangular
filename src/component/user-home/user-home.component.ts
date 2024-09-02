import { Component, inject, OnInit } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BookResponse } from '../../model/BookResponse';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [
    BookCardComponent,
    MatPaginatorModule,
    MatSelectModule,
    NgxPaginationModule,
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent implements OnInit {
  bestseller: string = 'all';
  priceRange: number = 1000;
  books: BookResponse[] = [];
  sortKey: string = 'name';
  page: number = 0;
  totalElements: number = 0;
  rating: number = 0;
  search?: string = '';
  minPrice?: number = 0;
  maxPrice?: number = 100000;
  searchControl = new FormControl('');

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {}
  private _snackBar = inject(MatSnackBar);
  ngOnInit(): void {
    this.userService.getUserDetails()?.role === 'ADMIN'
      ? this.router.navigate(['admin'])
      : this.fetchBooks();
  }

  onSearchChange(event: any) {
    this.search = event?.target.value;
    console.log(this.search);
    this.fetchBooks();
    console.log(event);
  }

  fetchBooks(): void {
    this.bookService
      .getBooks(
        this.page,
        5,
        this.sortKey,
        this.minPrice,
        this.maxPrice,
        this.search,
        this.rating
      )
      .subscribe((response) => {
        this.books = response.content;
        console.log(response);
        this.totalElements = response.totalElements;
      });
  }
  onSortKeyChange(): void {
    this.fetchBooks();
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.fetchBooks();
  }

  addToCart(bookId: number): void {
    this.cartService.addToCart(bookId, 1).subscribe((response) => {
      console.log('Book added to cart:', response);
      this._snackBar.open('Add to cart sucessfully', 'Undo', {
        duration: 3000,
      });
    });
  }

  addToWishList(bookId: number) {
    this.bookService.addToWishList(bookId).subscribe({
      next: (response) => {
        console.log('Book added to wishlist:', response);
        this._snackBar.open('Add to wishlist sucessfully', 'Undo', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.log('error occurred', err);
        this._snackBar.open('error occured at adding in wishlist', 'Undo', {
          duration: 3000,
        });
      },
    });
  }

  onDeleteCartItem(cartItemId: number): void {
    this.cartService.deleteCartItem(cartItemId).subscribe((response) => {
      console.log('Book remove  from cart:', response);
      this._snackBar.open('removed sucessfully', 'Undo', {
        duration: 3000,
      });
    });
  }
}
