import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {TestComponent} from "./components/test/test.component";




const routes: Routes = [
  {path:"", component:SignupComponent},
  {path:"registration", component:SignupComponent},
  {path:"login", component:LoginComponent},
  {path:"admin", loadChildren : () => import("./admin/admin.module").then(m => m.AdminModule)},
  {path:"customer", loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule)},
  {path:"test", component:TestComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
