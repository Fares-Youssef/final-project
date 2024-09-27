import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'product',children:[
    {path:':id',component:ProductsComponent},
    {path:'single/:id',component:SingleProductComponent},
  ]},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo:'/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {
    scrollPositionRestoration:'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
