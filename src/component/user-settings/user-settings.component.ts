import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddressRequestDTO, AddressResponseDTO, AddressType } from '../../model/AddressDtos';
import { AddressService } from '../../services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  addressForm: FormGroup;
  address: AddressResponseDTO | null = null;
  AddressType = AddressType; // Ensure AddressType is correctly assigned

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.addressForm = this.fb.group({
      addressType: [null, Validators.required],
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAddress();
  }

  loadAddress(): void {
    this.addressService.getAddress().subscribe(
      (data) => {
        this.address = data;
        if (data) {
          this.addressForm.patchValue(data);
        }
      },
      (error) => {
        console.error('Error loading address', error);
        this.snackBar.open('Error loading address', 'Close', { duration: 3000 });
      }
    );
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const addressData: AddressRequestDTO = this.addressForm.value;
      if (this.address) {
        // Update existing address
        this.addressService.updateAddress(addressData).subscribe(
          (data) => {
            this.address = data;
            this.snackBar.open('Address updated successfully', 'Close', { duration: 3000 });
            console.log('Address updated successfully', data);
          },
          (error) => {
            console.error('Error updating address', error);
            this.snackBar.open('Error updating address', 'Close', { duration: 3000 });
          }
        );
      } else {
        // Add new address
        this.addressService.addAddress(addressData).subscribe(
          (data) => {
            this.address = data;
            this.snackBar.open('Address added successfully', 'Close', { duration: 3000 });
            console.log('Address added successfully', data);
          },
          (error) => {
            console.error('Error adding address', error);
            this.snackBar.open('Error adding address', 'Close', { duration: 3000 });
          }
        );
      }
    }
  }

  onDelete(): void {
    if (this.address && this.address.id) {
      this.addressService.deleteAddress(this.address.id).subscribe(
        () => {
          this.address = null;
          this.addressForm.reset();
          this.snackBar.open('Address deleted successfully', 'Close', { duration: 3000 });
          console.log('Address deleted successfully');
        },
        (error) => {
          console.error('Error deleting address', error);
          this.snackBar.open('Error deleting address', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
