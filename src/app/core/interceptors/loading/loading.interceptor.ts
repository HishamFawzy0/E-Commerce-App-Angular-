import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { read } from 'fs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let ngxSpinnerService = inject(NgxSpinnerService);

  ngxSpinnerService.show();

  return next(req).pipe(finalize(()=>{
    ngxSpinnerService.hide();}));
};
