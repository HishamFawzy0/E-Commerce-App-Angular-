import { WishList } from './../../../shared/interfaces/wish-list';
import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private readonly authService=inject(AuthService);
  wishListNumber:WritableSignal<number>=signal(0);
  constructor(private httpClient: HttpClient) { }


  addProductToWishList(productID: string):Observable<any>{
    return this.httpClient.post(
      `${environment.BaseUrl}/api/v1/wishlist`,
      {productId: productID,},
      { headers: { token: this.authService.token } }
    );
  }

  getUserLoggedWishList():Observable<any>{
    return this.httpClient.get(`${environment.BaseUrl}/api/v1/wishlist`,{headers:{token:this.authService.token}});
  }

  removeProductFromWishList(productID: string):Observable<any>{
    return this.httpClient.delete(`${environment.BaseUrl}/api/v1/wishlist/${productID}`,
      { headers: { token: this.authService.token } }
    );
  }
}
