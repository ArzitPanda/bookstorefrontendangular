import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, MatIconModule,ReactiveFormsModule,FormsModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;
  isLoading = true;
  showReviews = false;
  reviews: any[] = [];
  newReview = { productId: 0, comment: '', rating: 0 };

  constructor(
    private route: ActivatedRoute,
    private productService: BookService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const productId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.newReview.productId = productId;

    this.productService.getBookById(productId).subscribe(data => {
      this.product = data;
      this.isLoading = false;
    });

    this.loadReviews(productId);
  }

  loadReviews(productId: number): void {
    this.reviewService.getReviewsByProductId(productId).subscribe(data => {
      this.reviews = data;
    });
  }

  onAddToCart(): void {
    // Logic to add the product to the cart
  }

  toggleReviews(): void {
    this.showReviews = !this.showReviews;
  }

  submitReview(): void {
    this.reviewService.addReview(this.newReview).subscribe(() => {
      this.loadReviews(this.newReview.productId);
      this.newReview.comment = '';
      this.newReview.rating = 0;
    });
  }
}
