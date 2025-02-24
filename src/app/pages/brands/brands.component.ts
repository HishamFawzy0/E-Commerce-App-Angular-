import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  private readonly BrandsService = inject(BrandsService);
  brands: Ibrands[] = [];


  ngOnInit(): void {
 
    this.getallBrands();
  }
  getallBrands(){
    this.BrandsService.getAllCategories().subscribe({
      next: (res) => {
        this.brands = res.data;
        console.log(res);
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      }
    })
  } 
}
