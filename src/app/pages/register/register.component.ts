import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  error!: string;

  registerForm: FormGroup = this.formBuilder.group({
    name: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20),]],
    email: [null,[Validators.required, Validators.email]],
    password: [null,[ Validators.required,Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/),]],
    rePassword: [null,[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/),]],
    phone: [null,[Validators.required,Validators.pattern(/^(?:\+20|0)?1[0-25]\d{8}$/),]],
  },
  this.confirmPassword
);

  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/),
  //     ]),
  //     rePassword: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/),
  //     ]),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^(?:\+20|0)?1[0-25]\d{8}$/),
  //     ]),
  //   },
  //   this.confirmPassword
  // );

  subregister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'success') {
            console.log(res);
            this.registerForm.reset();
            this.error = '';
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.error.message;
        },
      });
    }
  }

  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
}
