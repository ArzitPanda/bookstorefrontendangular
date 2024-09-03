
import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatCommonModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { BookResponse } from '../../../model/BookResponse';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookService } from '../../../services/book.service';


@Component({
  selector: 'app-admin-edit-bottom-sheet',
  standalone: true,
  imports: [MatListModule,MatCommonModule,ReactiveFormsModule,FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './admin-edit-bottom-sheet.component.html',
  styleUrl: './admin-edit-bottom-sheet.component.css'
})
export class AdminEditBottomSheetComponent implements OnInit{
  editBookForm: FormGroup;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdminEditBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BookResponse,
    private fb: FormBuilder,
    private bookService:BookService
  ) {
    this.editBookForm = this.fb.group({
      description:[data.description],
      name: [data.name, Validators.required],
      author: [data.authorName, Validators.required],
      price: [data.price, Validators.required],
      quantity:[data.quantity,Validators.required],
      discountPrice:[data.discountPrice,Validators.required]
    });
  }
  ngOnInit(): void {
   console.log(this.data)
  }

  save(): void {
    if (this.editBookForm.valid) {
     
      console.log('Form data:', this.editBookForm.value);

      this.bookService.updateBook(this.editBookForm.value,this.data.id).subscribe({
        next:(ele)=>console.log(ele),
        error:(error)=>console.log(error)
      })
      this.bottomSheetRef.dismiss(this.editBookForm.value);
    }
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }
}
