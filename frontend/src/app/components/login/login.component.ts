import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthUsersService} from "../../services/authUsers.service";
import {Loginrequest} from "../../interfaces/loginrequest";
import {StoragUserInfoService} from "../../services/storag-user-info.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb:FormBuilder,
              private router:Router,
              private snackBar: MatSnackBar,
              private userservice:AuthUsersService,
              private storageservice:StoragUserInfoService) {

    this.loginForm= fb.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]],
    })
  }

  login(){
    let loginUser: Loginrequest={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    this.userservice.loginUser(loginUser).subscribe(res =>{
      console.log(res);

      if(res.userId!=null){
        const user={
          id: res.userId,
          role: res.role
        }
        this.storageservice.saveUser(user);
        this.storageservice.saveToken(res.jwt);

        if(this.storageservice.isAdminLoggedIn()){
          this.router.navigateByUrl("/admin/dashboard");

        }else if(this.storageservice.isCustomerLoggedIn()){
          this.router.navigateByUrl("/customer/dashboard");

        }else
          this.openSnackBar("email or password false");
      }
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
