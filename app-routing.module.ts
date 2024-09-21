import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'seller',component:SellerComponent},
  {path:'login',component:LoginComponent},
  {path:'cart',component:CartComponent},
  {path:'signup',component:SignupComponent},
  {path:'orders',component:OrdersComponent},
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'payment', component:PaymentMethodComponent }, // Add payment route
  {path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
