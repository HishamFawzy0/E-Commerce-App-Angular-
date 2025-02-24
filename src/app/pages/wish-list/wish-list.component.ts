import { Component, inject } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { WishList } from '../../shared/interfaces/wish-list';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-wish-list',
  imports: [ SweetAlert2Module ,RouterLink], 
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent {
  private readonly wishListService = inject(WishListService);
  wishList: WishList[] = [];

  ngOnInit(): void {
    this.getWishList();
  }

  getWishList(): void {
    this.wishListService.getUserLoggedWishList().subscribe({
      next: (res) => {
        this.wishList = res.data;
        console.log(res);
        console.log(this.wishList);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFromWishlist(imageproduct: string , productID: string ): void {
    // console.log(imageproduct);

    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to remove this product from wishlist!",
      imageUrl: imageproduct,

      imageWidth: 400,
      imageHeight: 300,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      customClass: {
        image: 'object-contain', // إضافة الكلاس هنا
      },
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.wishListService.removeProductFromWishList(productID).subscribe({
          next: (res) => {
            console.log(res);
            this.wishListService.wishListNumber.set(res.data.length);
            Swal.fire({
              title: 'Removed!',
              text: 'Your product has been removed successfully.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
            this.getWishList();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }


  
}
