import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '',component: AuthLayoutComponent,children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forget-password', component: ForgetPasswordComponent, title: 'Forget Password' },
    ],
  },

  {path: '',component: BlankLayoutComponent  ,children: [
      { path: 'home',loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent), title: 'Home',canActivate:[authGuard]  },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then((c) => c.CartComponent), title: 'Cart',canActivate:[authGuard] },
      { path: 'products',loadComponent: () => import('./pages/products/products.component').then((c) => c.ProductsComponent), title: 'Product',canActivate:[authGuard] },
      { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then((c) => c.BrandsComponent),title: 'Brands',canActivate:[authGuard] },
      {path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then((c) => c.CategoriesComponent),title: 'Categories',canActivate:[authGuard]},
      {path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then((c) => c.AllordersComponent),title: 'All Orders',canActivate:[authGuard]},
      {path: 'wishlist', loadComponent: () => import('./pages/wish-list/wish-list.component').then((c) => c.WishListComponent),title: 'Wish List',canActivate:[authGuard]},
      { path: 'checkout/:id', loadComponent: () => import('./pages/checkout/checkout.component').then((c) => c.CheckoutComponent),title: 'Checkout',canActivate:[authGuard] },
      { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then((c) => c.DetailsComponent),title: 'Details',canActivate:[authGuard] },
      { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then((c) => c.NotfoundComponent), title: 'Not Found',canActivate:[authGuard] },
    ],
},
];
