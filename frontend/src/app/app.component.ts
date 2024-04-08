import {Component, OnInit} from '@angular/core';
import {StoragUserInfoService} from "./services/storag-user-info.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isAdminLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;

  constructor(private storage:StoragUserInfoService,
              private router:Router) {
  }


  ngOnInit(){

    this.router.events.subscribe(event =>{
      if(event.constructor.name == "NavigationEnd"){
        this.isAdminLoggedIn = this.storage.isAdminLoggedIn();
        this.isCustomerLoggedIn = this.storage.isCustomerLoggedIn();
      }
    })

  }

  logout(){
    this.storage.logout();
    this.router.navigateByUrl("/login")
  }
}
