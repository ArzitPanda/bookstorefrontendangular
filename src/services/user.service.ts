import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserDetails {
  role: string;
  id: number;
  email: string;
  phone: string;
  cartItemLength: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetailsSubject = new BehaviorSubject<UserDetails | null>(null);
  userDetails$ = this.userDetailsSubject.asObservable();

  setUserDetails(userDetails: UserDetails) {
    this.userDetailsSubject.next(userDetails);
  }

  clearUserDetails() {
    this.userDetailsSubject.next(null);
  }

  getUserDetails(): UserDetails | null {
    return this.userDetailsSubject.value;
  }
}
