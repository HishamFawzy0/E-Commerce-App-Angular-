import { OrderService } from './../../core/services/order/order.service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService =inject(OrderService);
  cartID :string=''
  isLoading: boolean = false;

  checkoutForm: FormGroup = this.formBuilder.group({
    details: [null, [Validators.required, Validators.minLength(3)]],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^(?:\+20|0)?1[0-25]\d{8}$/)],
    ],
    city: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.paramMap.subscribe({
      next: (info) => {
        console.log(info.get('id'));
        this.cartID = info.get('id')!;
      },
    });
  }

  submitForm(): void {
    this.isLoading = true;
    this.orderService.checkOutSession(this.cartID,this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        if(res.status == 'success'){
          window.open(res.session.url, '_self');
        } 
        // window.location.href = res.seesion.url;
      },
      error: (err) => {
        console.log(err);
      this.isLoading = false;

      }
    })
   
  }
}
