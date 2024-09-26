import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'http://techs-experts.net/public/api/';

  constructor(private http : HttpClient) { }

  topCategory():Observable<any>
  {
    return this.http.get(`${this.baseUrl}categories/asc`)
  }

  category():Observable<any>
  {
    return this.http.get(`${this.baseUrl}top-categories`)
  }
}
