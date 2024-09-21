import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://techs-experts.net/public/api/';

  constructor(private Http: HttpClient) {
  }

  login(obj:any):Observable<any> {
    return this.Http.post(`${this.baseUrl}client/customer_login`,obj);
  }

  register(obj:any):Observable<any> {
    return this.Http.post(`${this.baseUrl}client/customer_register`,obj);
  }

  getPrfile():Observable<any> {
    return this.Http.get(`${this.baseUrl}client/profile`);
  }

  updateProfile(obj:any ,id:any):Observable<any> {
    return this.Http.post(`${this.baseUrl}client/profile/${id}`,obj);
  }
  changePassword(obj:any):Observable<any> {
    return this.Http.post(`${this.baseUrl}client/change_password`,obj);
  }
}
