import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  firstOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    center: true,
    margin: 10,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
    items: 1,

    nav: true,
    // animateOut: 'fadeOut',
  };

  productID!: string | null;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  detalisProduct!: IProduct;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (info) => {
        this.productID = info.get('id');
        if (this.productID) {
          this.productsService.getSpacificProduct(this.productID).subscribe({
            next: (res) => {
              this.detalisProduct = res.data;
              console.log(res.data);
              
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    });
  }
  // add to cart function
  addToCart(id: string): void {
    
    this.cartService.addProductToCart(this.productID!).subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
        Swal.fire({
                 position: 'top-end',
                 toast: true,
                 background: '#f1f1f1',
                 showConfirmButton: false,
                 icon: 'success',
                 title: 'Added to your cart successfully',
                 
                 timer: 1500,
               });
      },
      error: (err) => {
        console.log(err);
      },
    });
    // this.toastr.success('Item added to cart!');
  }
}
