import {Component, OnInit} from '@angular/core';
import {CustomerServiceService} from "../../customerService/customer-service.service";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit{

  cars: any[]=[];
  carAvailabilityMap: { [carId: number]: boolean } = {};

 constructor(private customerservice:CustomerServiceService) {
 }



  ngOnInit(): void {
   this.getAllCars();
  }

  getAllCars(){
    this.customerservice.getAllCars().subscribe(res =>{
        this.cars=res;
        this.checkCarAvailability();
      },
      error => {
        console.log("Error fetching cars:", error);
      })
  }

  getCarImage(image: any): string {
    if (image && image.length > 0) {
      return 'data:image/png;base64,' + image;
    }
    return '';
  }

  checkCarAvailability() {
    for (const car of this.cars) {
      this.customerservice.isCarAviable(car.carId).subscribe(
        (res: boolean) => {
          this.carAvailabilityMap[car.carId] = res;
        },
        error => {
          console.log("Error checking car availability:", error);
        }
      );
    }
  }


}
