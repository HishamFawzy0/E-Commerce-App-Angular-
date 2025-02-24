import { AuthService } from './../../core/services/auth/auth.service';
import { Component, computed, inject, Input, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly cartService = inject(CartService);
  readonly wishListService = inject(WishListService);
  num = computed(() => this.cartService.cartNumber());
  numwishList = computed(() => this.wishListService.wishListNumber());

  ngOnInit(): void {
    this.wishListService.getUserLoggedWishList().subscribe({
      next: (res) => {
        // this.numwishList = res.count;
        this.wishListService.wishListNumber.set(res.count);
        console.log(res);
      },
    });
    // this.wishListService.wishListNumber.subscribe({
    //   next: (res) => {
    //     this.numwishList = res;
    //   },
    // })

    this.cartService.getUserLoggedCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  @Input() islogin!: boolean;
  readonly authService = inject(AuthService);
}
