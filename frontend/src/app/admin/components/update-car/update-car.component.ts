import {Component, Inject, OnInit} from '@angular/core';
import {AdminserviceService} from "../../adminService/adminservice.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-apdate-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  carId: number;
  car:any;
  updateCarForm!: FormGroup;
  fuelTypes: string[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  transmissionTypes: string[] = ['Manual', 'Automatic'];
  selectedFile!: File;
  imageChanged: boolean=false;
  constructor(private adminservice:AdminserviceService,
              private fb: FormBuilder,
              private router:Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialogRef<UpdateCarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.carId=data.carId;
  }

  ngOnInit(): void {
    this.updateCarForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      year: ['', Validators.required],
      price:['', [Validators.required, Validators.min(0)]],
      fuelType: [''],
      transmissionType: [''],
    });

    this.getCarDetails();

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imageChanged=true;


  }

  getCarDetails(){
    this.adminservice.getCar(this.carId).subscribe(res =>{
      this.car=res;
      console.log(this.carId);
      console.log(res);
      this.updateCarForm.patchValue(this.car);
    })
  }

  updateCar() {
    if (this.updateCarForm.valid) {
      const car: FormData = new FormData();
      if(this.selectedFile && this.imageChanged){
        car.append('returnedImage', this.selectedFile);
      }
      car.append('brand', this.updateCarForm.value.brand);
      car.append('model',this.updateCarForm.value.model);
      car.append('color',this.updateCarForm.value.color);
      car.append('year',this.updateCarForm.value.year);
      car.append('price',this.updateCarForm.value.price);
      car.append('fuelType',this.updateCarForm.value.fuelType);
      car.append('transmission',this.updateCarForm.value.transmissionType);


      this.adminservice.updateCar(this.carId,car).subscribe(res =>{
        console.log('Updated Car Form:', this.updateCarForm.value);
        console.log(res);
        this.openSnackBar('Car has been updated successfully');
        this.router.navigateByUrl("/admin/dashboard");

      },
        error => {
          this.openSnackBar('Car input not valid');
        })

    } else {
      console.log('Form is invalid');
    }
  }

  closeDialog() {
    this.dialog.close(); // Dialog schließen
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
