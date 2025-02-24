import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { WishListService } from '../../core/services/wishList/wish-list.service';
@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
    SweetAlert2Module,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchValue: string = '';
  firstOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
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

  customOptions: OwlOptions = {
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
    items: 6,

    nav: true,
    // animateOut: 'fadeOut',
  };

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  addedToWishList: boolean = false;
  @ViewChild('heart') heart!: ElementRef;
  products: IProduct[] = [];
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.allproducts();
    this.getCategories();
  }
  

  allproducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        
        this.cartService.cartNumber.set(res.numOfCartItems); 
        console.log(this.cartService.cartNumber());
        
        Swal.fire({
          position: 'top-end',
          toast: true,
          background: '#f1f1f1',
          showConfirmButton: false,
          timerProgressBar: true, 
          icon: 'success',
          title: 'Added to your cart successfully',
          // showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToWishList(id: string): void {

    this.wishListService.addProductToWishList(id).subscribe({
      next: (res) => {
        // console.log(res);
        console.log(res.data.length);

        this.wishListService.wishListNumber.set(res.data.length);
        console.log(this.wishListService.wishListNumber());
        Swal.fire({
          position: 'top-end',
          toast: true,
          background: '#f1f1f1',
          showConfirmButton: false,
          timerProgressBar: true,
          icon: 'success',
          title: 'Added to your Wish List successfully',
          timer: 1500,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
        

    
  }
}
