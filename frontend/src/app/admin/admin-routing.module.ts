import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {AddCarComponent} from "./components/add-car/add-car.component";
import {GetBookingsComponent} from "./components/get-bookings/get-bookings.component";

const routes: Routes = [
  {path:"dashboard", component:AdminDashboardComponent},
  {path:"addcar", component:AddCarComponent},
  {path:"bookings", component:GetBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
