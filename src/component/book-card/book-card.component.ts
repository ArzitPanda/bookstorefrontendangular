import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../model/BookResponse';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatIconModule,RouterModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: BookResponse;
  @Output() addToCart = new EventEmitter<void>();

  onAddToCart(): void {
    this.addToCart.emit();
  }
}