import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthUsersService} from "../../services/authUsers.service";
import {Signuprequest} from "../../interfaces/signuprequest";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  registerForm: FormGroup;


  constructor(private userservice:AuthUsersService,
              private fb:FormBuilder, private snackBar: MatSnackBar) {
    this.registerForm=this.fb.group({
      firstName: [null,[Validators.required]],
      lastName: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required]],

    })
  }





  register() {

    let newUser: Signuprequest= {
      firstname:this.registerForm.value.firstName,
      lastname:this.registerForm.value.lastName,
      email:this.registerForm.value.email,
      password:this.registerForm.value.password
    };
    this.userservice.addUser(newUser).subscribe(res=>{
      console.log(res);
      if(res.id == null){
        this.openSnackBar('Error registering user');
      }else{
        this.openSnackBar('User registered successfully');
      }

    },
      (error) => {
        console.error('User already exists!:', error);
        this.openSnackBar('User already exists!');
      })
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
