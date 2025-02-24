import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  step: number = 1;
  private readonly authService = inject(AuthService);
  private readonly Router = inject(Router);
  error: string = '';

  private readonly formBuilder = inject(FormBuilder);
  isLoading: boolean = false;

  verfiyEmail: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verfiycode: FormGroup = this.formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  });

  resetPassword: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/)],
    ],
  });

  step1(): void {
    this.resetPassword.get('email')?.patchValue(this.verfiyEmail.get('email')?.value)
    if (this.verfiyEmail.valid) {
      this.isLoading = true;
      this.authService.setEmailVerify(this.verfiyEmail.value).subscribe({
        next: (res) => {
          if (res.statusMsg == 'success'){
          console.log(res);
          this.isLoading = false;
          this.error = '';
          this.step = 2;
          }
        },
        error: (err) => {
          console.log(err);
          this.error=err.error.message
          this.isLoading = false;
        },
      });
    }
  }

  step2(): void {
    if (this.verfiycode.valid) {
      this.isLoading = true;
      this.authService.setCodeVerify(this.verfiycode.value).subscribe({
        next: (res) => {
          if (res.status == 'Success'){
            console.log(res);
            this.error = '';
            this.isLoading = false;
            this.step = 3;

          }
        },
        error: (err) => {
          console.log(err);
          this.error = err.error.message;
          this.isLoading = false;
          
        },
      });
    }
  }

  step3(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true;
      this.authService.setRestPassword(this.resetPassword.value).subscribe({
        next: (res) => {

          console.log(res);
          this.isLoading = false;
          localStorage.setItem('userToken', res.token);
          this.authService.decodeToken();
          this.Router.navigate(['/home']);
          this.step = 1;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
