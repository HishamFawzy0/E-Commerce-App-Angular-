import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // api logic

  constructor(private httpClient: HttpClient) {}

  getAllProducts() : Observable<any> {
    return this.httpClient.get(`${environment.BaseUrl}/api/v1/products`); 
  }



    getSpacificProduct(id:string) : Observable<any> {
    return this.httpClient.get(`${environment.BaseUrl}/api/v1/products/${id}`); 
  }
}
