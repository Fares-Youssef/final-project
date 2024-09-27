import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://techs-experts.net/public/api/';

  constructor(private Http: HttpClient) { }

  singleProduct(id: any): Observable<any> {
    return this.Http.get(`${this.baseUrl}single-product/${id}`);
  }

  products(id: any): Observable<any> {
    return this.Http.get(`${this.baseUrl}products-by-category/${id}/0/0`);
  }
}
