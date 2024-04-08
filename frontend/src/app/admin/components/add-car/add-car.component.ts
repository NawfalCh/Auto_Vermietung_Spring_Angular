import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminserviceService} from "../../adminService/adminservice.service";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit{

  carForm!: FormGroup;
  selectedFile!: File;


  fuelTypes: string[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  transmissionTypes: string[] = ['Manual', 'Automatic'];


  constructor(private fb: FormBuilder,
              private adminService: AdminserviceService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      year: ['', Validators.required],
      price:[null, [Validators.required, Validators.min(0)]],
      fuelType: [''],
      transmissionType: [''],

    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];


  }



  addcar(){
    if(this.carForm.valid){
      const car: FormData = new FormData();
      car.append('brand', this.carForm.value.brand);
      car.append('model',this.carForm.value.model);
      car.append('color',this.carForm.value.color);
      car.append('year',this.carForm.value.year);
      car.append('price',this.carForm.value.price);
      car.append('fuelType',this.carForm.value.fuelType);
      car.append('transmission',this.carForm.value.transmissionType);
      car.append('returnedImage', this.selectedFile);


      console.log(car);
      this.adminService.addCar(car).subscribe(res =>{
        console.log(res);
        this.openSnackBar('Car has been added successfully');
      },
        error => {
          this.openSnackBar('Error dedected');
        })

      this.carForm.reset();
    }else {
      console.log('Form is invalid');}

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
