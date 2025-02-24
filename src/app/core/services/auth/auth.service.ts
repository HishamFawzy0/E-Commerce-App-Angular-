import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Userid } from '../../../shared/interfaces/userid';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = null;
  router = inject(Router);
  token: string = localStorage.getItem('userToken')!;
  decode : Userid = JSON.parse(localStorage.getItem('userDecodeToken')!);
  constructor(private httpClient: HttpClient) {}

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BaseUrl}/api/v1/auth/signup`,
      data
    );
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BaseUrl}/api/v1/auth/signin`,
      data
    );
  }

  decodeToken(): void {
    if (localStorage.getItem('userToken')) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      localStorage.setItem('userDecodeToken', JSON.stringify(this.userData));
    }
  }
  logOut(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userDecodeToken');
    this.userData = null;
    this.router.navigate(['/login']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BaseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  setCodeVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BaseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  setRestPassword(data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.BaseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}


