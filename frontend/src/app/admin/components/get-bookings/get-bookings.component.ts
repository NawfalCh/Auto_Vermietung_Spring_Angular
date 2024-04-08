import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from "../../adminService/adminservice.service";

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.css']
})
export class GetBookingsComponent implements OnInit{

  bookings: any[]=[];

  constructor(private adminservice:AdminserviceService) {
  }

  ngOnInit(): void {
    this.geBookings();
  }

  geBookings(){
    this.adminservice.getBookings().subscribe(res =>{
      console.table(res);
      this.bookings=res;
    },
      error => {
        console.log("Error fetching cars:", error);
      })
  }

  getStatusColor(status: string): any {
    switch (status) {
      case 'PENDING':
        return { color: 'blue' };
      case 'APPROVED':
        return { color: 'green' };
      case 'CANCELD':
        return { color: 'red' };
      default:
        return {};
    }
  }

  changeBookingStatus(bookingId: number, status: string){
    this.adminservice.changeStatus(bookingId,status).subscribe(res =>{
      console.log(res);
      this.geBookings();
    },
      error => {
        console.log("Error fetching cars:", error);
      })
    console.log(bookingId);
    console.log(status);
  }



}
