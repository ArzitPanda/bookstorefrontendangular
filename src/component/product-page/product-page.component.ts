import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule,MatIconModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;
  isLoading = true;
  showReviews = false;

  constructor(private route: ActivatedRoute, private productService: BookService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    this.productService.getBookById(parseInt(productId!)).subscribe(data => {
      this.product = data;
      this.isLoading = false;
    });
  }

  onAddToCart(): void {
    // Logic to add the product to the cart
  }

  toggleReviews(): void {
    this.showReviews = !this.showReviews;
  }
}
