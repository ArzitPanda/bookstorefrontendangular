import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CartItemResponseDto } from '../../model/CartItemResponseDto';
import { OrderserviceService } from '../../services/orderservice.service';
import { OrderRequestItem, PaymentMethod } from '../../model/OrderRequestItem';
import { PaymentService } from '../../services/payment.service';
declare var Razorpay: any;

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CartItemResponseDto[],
    private OrderService: OrderserviceService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private paymentService: PaymentService
  ) {
    console.log(data);
  }

  onCheckOut(): void {
    const order: OrderRequestItem[] = this.data.map(
      (ele: CartItemResponseDto) => {
        return {
          bookId: ele.bookId,
          quantity: ele.quantity,
          paymentMethod: PaymentMethod.COD,
        };
      }
    );

    this.paymentService.getOrderIdRzrPay(order).subscribe((orderResponse) => {
      const options: any = {
        key: orderResponse.publicKey,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: orderResponse.comapnyname,
        description: 'Purchase Description',
        order_id: orderResponse.orderItemId,
        handler: (response: any) => {
          console.log(response);
          this.OrderService.createOrder({
            orderRequestList: order,
            paymentVerificationRequest: {
              paymentId: response?.razorpay_payment_id,
              orderId: response?.razorpay_order_id,
              razorpaySignature: response?.razorpay_signature,
            },
          }).subscribe((res) => {
            console.log(res);
          });
        },
        modal: {
          escape: true,
        },
        theme: {
          color: '#0c238a',
        },
      };

      const rzp = new Razorpay(options);

      rzp.open();
    });

    this.dialogRef.close();
  }
}
