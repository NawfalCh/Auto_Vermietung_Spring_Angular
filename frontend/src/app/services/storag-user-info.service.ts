import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StoragUserInfoService {

  constructor() { }

  //save jwt Token in localstorage
   saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }


  // save userId and UserRole in localstorage
   saveUser(user:any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  //get jwt token from localstorage
  getToken(){
    return window.localStorage.getItem(TOKEN);
  }

  getUser() {
    const userData = localStorage.getItem(USER);
    if (userData !== null) {
      return JSON.parse(userData);
    }
    return null;
  }
  //get the role of logged User
  getUserRole(){
    const user = this.getUser();
    if(user == null)return "";
    return user.role;
  }

  getUserId(){
    const user = this.getUser();
    if(user == null)return"";
    return user.id;
  }

  isAdminLoggedIn():boolean{
    if(this.getToken() == null)return false;
    return this.getUserRole() == "Admin";
  }

  isCustomerLoggedIn():boolean{
    if(this.getToken() == null)return false;
    return this.getUserRole() == "Custumer";
  }

  logout():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
