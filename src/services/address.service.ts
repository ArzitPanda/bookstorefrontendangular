// address.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressRequestDTO, AddressResponseDTO } from '../model/AddressDtos';
 // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:8080/address'; 

  constructor(private http: HttpClient) { }

  getAddress(): Observable<AddressResponseDTO> {
    return this.http.get<AddressResponseDTO>(this.apiUrl);
  }

  addAddress(address: AddressRequestDTO): Observable<AddressResponseDTO> {
    return this.http.post<AddressResponseDTO>(this.apiUrl, address);
  }

  updateAddress(address: AddressRequestDTO): Observable<AddressResponseDTO> {
    return this.http.put<AddressResponseDTO>(this.apiUrl, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
