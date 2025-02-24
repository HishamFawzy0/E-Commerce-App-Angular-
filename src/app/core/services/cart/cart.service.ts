import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  cartNumber: WritableSignal<number> = signal(0);
  // private readonly authService = inject(AuthService);

  addProductToCart(productID: string): Observable<any> {
    return this.httpClient.post(
      `${environment.BaseUrl}/api/v1/cart`,
      { productId: productID }
    );
  }


  getUserLoggedCart(): Observable<any> {
    return this.httpClient.get(`${environment.BaseUrl}/api/v1/cart`);
  }
  updateProductQuantityInCart(productID: string , quantity: number): Observable<any> {
    return this.httpClient.put(
      `${environment.BaseUrl}/api/v1/cart/${productID}`,
      { count: quantity }
    );
  }

  removeProductFromCart(productID: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.BaseUrl}/api/v1/cart/${productID}`
    );
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.BaseUrl}/api/v1/cart`);
  }
}
