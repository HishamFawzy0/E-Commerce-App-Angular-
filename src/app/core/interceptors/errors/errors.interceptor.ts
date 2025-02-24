import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(catchError((err)=>{
    console.log('interceptor' + err.error.message);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false,
      background: '#f1f1f1',
      timerProgressBar: true,
      titleText: 'Something went wrong!',
      toast: true,
      text: err.error.message,
    });
    
    return throwError(()=>{return err});
  }));
  
};
