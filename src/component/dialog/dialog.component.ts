import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CartItemResponseDto } from '../../model/CartItemResponseDto';
import { OrderserviceService } from '../../services/orderservice.service';
import { OrderRequestItem } from '../../model/OrderRequestItem';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent, MatDialogActions,
     MatDialogClose, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CartItemResponseDto[],private OrderService:OrderserviceService,private dialogRef:MatDialogRef<DialogComponent>) {

    console.log(data);
  }


  onCheckOut():void
  {
   
    const order: OrderRequestItem[] = this.data.map((ele:CartItemResponseDto)=>{
      return {bookId:ele.bookId,quantity:ele.quantity}
    })

    this.OrderService.createOrder(order).subscribe((res)=>{console.log(res)}
    
  
  )
  this.dialogRef.close()
  

  }



}
