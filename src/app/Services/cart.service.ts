import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = 'http://techs-experts.net/public/api/';

  constructor(private Http: HttpClient) {
  }

  cart(): Observable<any> {
    return this.Http.get(`${this.baseUrl}client/usercart`)
  }

  addToCart(obj: any): Observable<any> {
    return this.Http.post(`${this.baseUrl}client/cart`, obj)
  }

  deleteCart(id: any): Observable<any> {
    return this.Http.delete(`${this.baseUrl}client/cart/${id}`)
  }
}
