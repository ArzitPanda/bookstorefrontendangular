import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderResponse } from '../../../services/orderservice.service';
import { OrderStatus } from '../../../model/OrderSchema';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { OrderService } from '../../../services/order.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-order-admin',
  standalone: true,
  imports: [ MatInputModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule],
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.css'
})
export class OrderAdminComponent implements OnInit {

  displayedColumns: string[] = ['orderId', 'userId', 'bookName', 'quantity', 'orderStatus'];
  dataSource = new MatTableDataSource<OrderResponse>([]);
  orderStatuses = Object.values(OrderStatus);
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
blue: any="primary";
  constructor(private orderService: OrderService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders(this.currentPage,this.pageSize).subscribe({
      next:(response)=>{
        this.dataSource.data = response.content;
        this.totalItems = response.totalElements;
      },
      error:(error) => {
        console.error('Error fetching orders', error);
        this.snackBar.open('Error loading orders', 'Close', { duration: 3000 });
      }
    })

  }
  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }
  updateOrderStatus(orderId:number,status: OrderStatus) 
  {
    this.orderService.updateOrderStatus(orderId,status).subscribe(
      () => {
        this.snackBar.open('Order status updated successfully', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error updating order status', error);
        this.snackBar.open('Error updating order status', 'Close', { duration: 3000 });
      }
    );
  }


}
