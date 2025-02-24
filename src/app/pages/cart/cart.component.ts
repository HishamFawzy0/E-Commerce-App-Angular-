import { ICart } from '../../shared/interfaces/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, SweetAlert2Module, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getUserLoggedCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProductQuantity(productID: string, quantity: number): void {
    this.cartService
      .updateProductQuantityInCart(productID, quantity)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data;
          this.cartService.cartNumber.set(res.numOfCartItems);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeProduct(productID: string, imageproduct: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to remove this product!",
      imageUrl: imageproduct,
      imageWidth: 400,
      imageHeight: 300,
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      customClass: {
        image: 'object-contain', // إضافة الكلاس هنا
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeProductFromCart(productID).subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = res.data;
            this.cartService.cartNumber.set(res.numOfCartItems);
            Swal.fire({
              title: 'Removed!',
              text: 'Your product has been removed successfully.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  clearCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to clear all the products in cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: 'red',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.cartService.cartNumber.set(0);
              this.cartDetails = {} as ICart;
              Swal.fire({
                title: 'Cleared!',
                text: 'Your Cart has been cleared successfully.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
