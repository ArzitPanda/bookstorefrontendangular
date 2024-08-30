import { Component, inject } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  private _snackBar = inject(MatSnackBar);
  constructor(private fb: FormBuilder, private signupService: AuthserviceService, private router: Router) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
}

onSubmit() {
  if (this.signupForm.valid) {
    this.signupService.signup(this.signupForm.value).subscribe(response => {
      console.log('User registered successfully', response);
      this.router.navigate(['/login']); // Navigate to login page
    }, error => {
      this._snackBar.open(error.error)
      console.error('Error registering user', error);
    });
  }


}

}
