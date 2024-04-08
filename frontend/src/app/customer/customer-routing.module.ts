import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerDashboardComponent} from "./components/customer-dashboard/customer-dashboard.component";
import {BookingCarComponent} from "./components/booking-car/booking-car.component";
import {MybookingsComponent} from "./components/mybookings/mybookings.component";

const routes: Routes = [
  {path:"dashboard", component:CustomerDashboardComponent},
  {path:"booking/:carId", component:BookingCarComponent},
  {path:"my-bookings", component:MybookingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
