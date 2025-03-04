import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient: HttpClient) { }

   getAllCategories() : Observable<any> {
      return this.httpClient.get(`${environment.BaseUrl}/api/v1/brands`);
    }
}
