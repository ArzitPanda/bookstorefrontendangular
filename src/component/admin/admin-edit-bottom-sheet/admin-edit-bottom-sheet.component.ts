import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { MatCommonModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { BookResponse } from '../../../model/BookResponse';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookService } from '../../../services/book.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-edit-bottom-sheet',
  standalone: true,
  imports: [
    MatListModule,
    MatCommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './admin-edit-bottom-sheet.component.html',
  styleUrl: './admin-edit-bottom-sheet.component.css',
})
export class AdminEditBottomSheetComponent implements OnInit {
  editBookForm: FormGroup;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdminEditBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BookResponse,
    private fb: FormBuilder,
    private bookService: BookService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.editBookForm = this.fb.group({
      description: [data.description],
      name: [data.name, Validators.required],
      author: [data.authorName, Validators.required],
      price: [data.price, Validators.required],
      quantity: [data.quantity, Validators.required],
      discountPrice: [data.discountPrice, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  save(): void {
    if (this.editBookForm.valid) {
      console.log('Form data:', this.editBookForm.value);

      this.bookService.updateBook(this.editBookForm.value, this.data.id).subscribe({
        next: (response) => {
          console.log(response);
     
          this.snackBar.open('Book updated successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snack-bar-success'], 
          });
          this.bottomSheetRef.dismiss(this.editBookForm.value);
        },
        error: (error) => {
          console.log(error);
          // Show error snack bar
          this.snackBar.open('Error updating book. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-error'], 
          });
        },
      });
    }
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }
}
