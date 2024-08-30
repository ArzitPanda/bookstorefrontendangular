import { Component, OnInit } from '@angular/core';
import { OrderResponse, OrderserviceService } from '../../services/orderservice.service';
import { CommonModule } from '@angular/common';
import { OrderitemComponent } from "../orderitem/orderitem.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderitemComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  public orderItem:OrderResponse[] =[];


  constructor(private orderService:OrderserviceService)
  {

  }
  ngOnInit(): void {
  this.OnFetchAllOrder();
  console.log(this.orderItem);
  }


  OnFetchAllOrder()
  {
    this.orderService.getOrder().subscribe(res=>this.orderItem=res);
  }


}
