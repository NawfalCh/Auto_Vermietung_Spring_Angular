import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  carForm!: FormGroup;

  fuelTypes: string[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  transmissionTypes: string[] = ['Manual', 'Automatic'];


  constructor(private fb: FormBuilder) { }



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



  addcar(){
    if(this.carForm.valid){
      const car: FormData = new FormData();
      car.append('brand',this.carForm.get('brand')?.value);
      car.append('model',this.carForm.get('model')?.value);
      car.append('color',this.carForm.get('color')?.value);
      car.append('year',this.carForm.get('year')?.value);
      car.append('price',this.carForm.get('price')?.value);
      car.append('fuelType',this.carForm.get('fuelType')?.value);
      car.append('transmissionType',this.carForm.get('transmissionType')?.value);
      console.log(car);
      this.carForm.reset();
    }else {
      console.log('Form is invalid');}

  }

}
