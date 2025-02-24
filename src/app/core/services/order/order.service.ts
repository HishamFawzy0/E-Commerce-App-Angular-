import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

   constructor(private httpClient: HttpClient) {}
    private readonly authService = inject(AuthService);

    // API logic for order service goes here
      checkOutSession(cartID: string ,data:object): Observable<any> {
        return this.httpClient.post(
          `${environment.BaseUrl}/api/v1/orders/checkout-session/${cartID}?url=https://e-commerce-app-angular-lilac.vercel.app/allorders`,
          {
            shippingAddress: data,
          }, 
          { headers: { token: this.authService.token } }
        );
      }


      getMyOrders(): Observable<any> {
        return this.httpClient.get(`${environment.BaseUrl}/api/v1/orders/user/${this.authService.decode.id}`)
      }

}
