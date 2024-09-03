import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'
import {MatIconModule} from '@angular/material/icon'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookResponse } from '../../../model/BookResponse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { BookService } from '../../../services/book.service';
import { inject } from '@angular/core/testing';

import { MatSnackBar,MatSnackBarModule } from "@angular/material/snack-bar";
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AdminEditBottomSheetComponent } from '../admin-edit-bottom-sheet/admin-edit-bottom-sheet.component';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [MatTabsModule,
    MatInputModule,
    CommonModule,
    MatTableModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent  implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'authorName', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<BookResponse>([]);
  pageIndex:number=0;
  pageSize:number=2;
  bookForm: FormGroup;
  responseValue:any;
  selectedFile: File | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(private formBuilder: FormBuilder,private bookService:BookService,private snackbar:MatSnackBar,private bottomSheet: MatBottomSheet) {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      authorName: ['', Validators.required],
      discountPrice: ['', [Validators.required, Validators.min(0)]],
    
    });
  }

  ngOnInit() {
       this.loadbooks()

    


   
  }


  deletebook(bookId:number):any
  {
    this.bookService.deleteBook(bookId).subscribe({
      next:(response)=>console.log(response),
      error:(error)=>console.log(error)
      
    })
  }

  openBottomSheet(book:BookResponse): void {
    this.bottomSheet.open(AdminEditBottomSheetComponent,{data:book});
  }

  loadbooks()
  {
    this.bookService.getBooks(this.pageIndex,this.pageSize).subscribe({
      next:(value)=>{
        console.log(value);
        this.responseValue=value;
        this.dataSource=value?.content;
      },
      error:(error)=>console.log(error)
    })
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadbooks()

 console.log(event)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editBook(book: BookResponse) {
    // Implement edit functionality
    this.openBottomSheet(book)
    console.log('Editing book:', book);
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

 

  onSubmit() {
    if (this.bookForm.valid && this.selectedFile) {
      console.log('Form submitted:', this.bookForm.value);
      this.bookService.addBook(this.bookForm.value,this.selectedFile).subscribe({
        next:(val)=>{
          console.log(val);
          this.snackbar.open("sucessfully added")
        },
        error:(err)=>{
          this.snackbar.open(err);
        }
  
      })
    }
  }
}
