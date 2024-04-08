import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from "../../adminService/adminservice.service";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {UpdateCarComponent} from "../update-car/update-car.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  cars: any[]=[];


  constructor(private adminservice:AdminserviceService,
              private snackBar: MatSnackBar,
              private dialoge: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(){
    this.adminservice.getAllCars().subscribe(res =>{
      this.cars=res;
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

  deleteCar(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');

    if (confirmDelete) {
      this.adminservice.deleteCar(id).subscribe(
        res => {
          this.getAllCars();
          this.openSnackBar('Car deleted successfully');

        },
        error => {
          this.openSnackBar('Error, Car could not be deleted');
        }
      );
    }
  }


  openUpdateCar(carId:number): void {
    this.dialoge.open(UpdateCarComponent, {
      width: '800px',

      data: { carId }
    });
  }

  openSnackBar(message: string) {
    let snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['custom-snackbar'],
    });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed');
    });
  }

}
