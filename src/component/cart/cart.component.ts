import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CartItemResponseDto } from '../../model/CartItemResponseDto';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from "../../app/cart-item/cart-item.component";
import { CartService } from '../../services/cart.service';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';







@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,
     CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',

})
export class CartComponent implements OnInit  {
  cartItems: CartItemResponseDto[] = [
  
  ];
  cartTotal:number=0;
  constructor(private cartService:CartService,public dialog: MatDialog)
  {

  }
  openDialog(): void {
    this.dialog.open(DialogComponent, {
      data: this.cartItems
    });
  }

 

  ngOnInit(): void {
   
    this.cartService.getCartItems().subscribe((res)=>{
      console.log(res)
      this.cartItems=res;
      
     this.cartTotal= this.cartItems.reduce((total, cartItem) => {
        return total + (cartItem.price *cartItem.quantity);
      }, 0);

    })


  }

  onQuantityChange(id:number,quantity:number)
  {
    this.cartService.addToCart(id,quantity).subscribe((res)=>{
      console.log(res)
    })

  }

  onItemRemove(id:number)
  {
    this.cartService.deleteCartItem(id).subscribe(res=>console.log(res));
    this.cartItems= this.cartItems.filter(ele=>ele.id!==id)
  }


}
