import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl = 'http://techs-experts.net/public/api/';

  constructor(private Http: HttpClient) {
  }

  getCountry(): Observable<any> {
    return this.Http.get(`${this.baseUrl}countries`);
  }

  getGovernorates(id: any): Observable<any> {
    return this.Http.get(`${this.baseUrl}governorates/${id}`);
  }

  getCities(id: any): Observable<any> {
    return this.Http.get(`${this.baseUrl}cities/${id}`);
  }

  address(): Observable<any> {
    return this.Http.get(`${this.baseUrl}client/customer_address_book`);
  }

  addAddress(obj: any): Observable<any> {
    return this.Http.post(`${this.baseUrl}client/customer_address_book`, obj)
  }

  updateAddress(obj: any, id: any): Observable<any> {
    return this.Http.put(`${this.baseUrl}client/customer_address_book/${id}`, obj)
  }

  deleteAddress( id: any): Observable<any> {
    return this.Http.delete(`${this.baseUrl}client/customer_address_book/${id}`)
  }
}
