
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemResponseDto } from '../../model/CartItemResponseDto';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item!: CartItemResponseDto;
  @Output() onquantityChange=new EventEmitter<void>();

  @Output() onRemoved=new EventEmitter<void>();

  incrementQuantity() {
    this.item.quantity++;
    this.onquantityChange.emit();
  }

  decrementQuantity() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
      this.onquantityChange.emit();
    }
  }

  removeditem()
  {
    this.onRemoved.emit();
  }
}
