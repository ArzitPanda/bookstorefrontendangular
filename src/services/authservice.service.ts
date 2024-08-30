import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class AuthserviceService {

  private loginUrl = 'http://localhost:8080/auth/';
  constructor(private http: HttpClient) {}
  login(loginRequest: { email: string; password: string }): Observable<any> {
    
    return this.http.post<any>(this.loginUrl+"login", loginRequest).pipe(tap(response=>{sessionStorage.setItem("authtoken",response.token)}));
  }

  signup(signupRequest: any): Observable<any> {
    return this.http.post<any>(this.loginUrl+"registration", signupRequest);
  }


}
