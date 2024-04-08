import {Component, OnInit} from '@angular/core';
import {CustomerServiceService} from "../../customerService/customer-service.service";


@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit{


  bookings: any[]=[];


  constructor(private customerservice:CustomerServiceService) {
  }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(){
    this.customerservice.getBookings().subscribe(res =>{
      this.bookings=res;
      console.log(this.bookings);
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

}
