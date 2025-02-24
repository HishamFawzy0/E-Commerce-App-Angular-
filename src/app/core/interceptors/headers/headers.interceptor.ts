import { inject } from '@angular/core';
import {  AuthService } from './../../services/auth/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  let authService=inject(AuthService);
  if( authService.token!==null ){
      req = req.clone({
        setHeaders: {
          token:authService.token,
        },
      });

   
  }

  return next(req);
};
