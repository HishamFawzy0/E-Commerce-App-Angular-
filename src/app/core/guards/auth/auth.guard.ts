import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const pLATFORM_ID = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(pLATFORM_ID)) {
    if(localStorage.getItem('userToken')){
      return true;
    }else{
      // redirect to login page
      router.navigate(['/login']);
      return false;
    }
    }else{
      return false;
    }


};
