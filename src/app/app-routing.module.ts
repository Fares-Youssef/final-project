import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./pages/index/index.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { AddressComponent } from './user/address/address.component';
import { CreateAddressComponent } from './user/create-address/create-address.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'signup', component: SignupComponent , canActivate:[guestGuard]},
  { path: 'login', component: LoginComponent , canActivate:[guestGuard]},
  { path: 'profile', component: ProfileComponent , canActivate:[authGuard]},
  {
    path: 'address', children: [
      { path: '', component: AddressComponent },
      { path: 'create', component: CreateAddressComponent },
      { path: 'update/:id', component: CreateAddressComponent },
    ], canActivate:[authGuard]
  },
  {
    path: 'product', children: [
      { path: ':id', component: ProductsComponent },
      { path: 'single/:id', component: SingleProductComponent },
    ]
  },
  {
    path: 'cart', children: [
      { path: '', component: CartComponent },
      { path: 'single/:id', component: SingleProductComponent },
    ], canActivate:[authGuard]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
