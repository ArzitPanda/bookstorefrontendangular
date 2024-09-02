import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

interface UserDetails {
  role: string;
  id:number;
  email:string;
  phone:string;
  cartItemLength:number;
  

}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router,private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.http.get<UserDetails>('http://localhost:8080/auth/authorize').pipe(
      map(userDetails => {
        console.log(userDetails);
        if (!userDetails) {
          this.router.navigate(['/login']);
          return false;
        }
        this.userService.setUserDetails(userDetails);
        if (userDetails.role === 'ADMIN') {
          
          return true; 
        }

        if (userDetails.role === 'USER' && !state.url.startsWith('/admin')) {
          return true; 
        }

        // If user tries to access admin route without admin role
        this.router.navigate(['/']); // Redirect to home or appropriate page
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return new Observable<boolean>(observer => observer.next(false));
      })
    );
  }
}