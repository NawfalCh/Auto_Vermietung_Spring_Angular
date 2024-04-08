import {Component, OnInit} from '@angular/core';
import {CustomerServiceService} from "../../customerService/customer-service.service";
import {ActivatedRoute} from "@angular/router";
import {StoragUserInfoService} from "../../../services/storag-user-info.service";

@Component({
  selector: 'app-booking-car',
  templateUrl: './booking-car.component.html',
  styleUrls: ['./booking-car.component.css']
})
export class BookingCarComponent implements OnInit{


  carId:number =this.activatedRoute.snapshot.params["carId"]
  car: any;
  fromDate!: Date;
  toDate!: Date;
  daysCount!: number;
  price:number = 0.0;


  constructor(private customerservice:CustomerServiceService,
              private storage: StoragUserInfoService,
              private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCarById();
  }

  getCarById(){
    this.customerservice.getCar(this.carId).subscribe(res =>{
      console.log(res);
      this.car=res;
    })
  }

  getCarImage(image: any): string {
    if (image && image.length > 0) {
      return 'data:image/png;base64,' + image;
    }
    return '';
  }

  bookCar() {
    console.log('From Date:', this.fromDate);
    console.log('To Date:', this.toDate);

    let carDTO={
      fromDate: this.fromDate,
      toDate: this.toDate,
      userId: this.storage.getUserId(),
      carId: this.carId
    }
    this.customerservice.bookCar(carDTO).subscribe(res =>{
      console.log(res);
    })
  }


  calculateDaysCount(price:number) {
    if (this.fromDate && this.toDate) {
      // Differenz in Millisekunden zwischen den beiden Datumsangaben
      const diffMs = this.toDate.getTime() - this.fromDate.getTime();
      // Umwandlung von Millisekunden in Tage
      this.daysCount = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      this.price=this.daysCount*price;
    } else {
      // Wenn ein Datum fehlt, setze die Anzahl der Tage auf null
      this.price;
    }
  }

}
