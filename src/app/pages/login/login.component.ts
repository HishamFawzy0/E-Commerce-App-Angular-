import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  error!: string;
  loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/),]]
  });


  subregister(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'success') {
            this.loginForm.reset();
            this.error = '';

            // 1- save the token in local storage
            localStorage.setItem('userToken', res.token);

            // 2- decode the token
            const decodedToken = this.authService.decodeToken();
            // 3- navigate to home
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.error.message;
        },
      });
    }
  }
}
