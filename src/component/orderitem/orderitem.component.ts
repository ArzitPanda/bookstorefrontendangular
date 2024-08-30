import { Component, Input } from '@angular/core';
import { OrderResponse } from '../../services/orderservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderitem.component.html',
  styleUrl: './orderitem.component.css'
})
export class OrderitemComponent {


  @Input() order: OrderResponse | undefined;

}
