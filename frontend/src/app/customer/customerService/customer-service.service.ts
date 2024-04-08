import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StoragUserInfoService} from "../../services/storag-user-info.service";
import {Observable} from "rxjs";


const BASIC_URL =['http://localhost:8080'];

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http:HttpClient,
              private storage:StoragUserInfoService) { }






  getAllCars():Observable<any>{
    return this.http.get(BASIC_URL + '/customer/cars',{
      headers: this.createAuthHeader()
    })
  }

  getCar(carid: number): Observable<any>{
    return this.http.get(BASIC_URL+"/customer/car/"+carid,{
      headers: this.createAuthHeader()
    });
  }

  bookCar(carDTO:any): Observable<any>{
    return this.http.post(BASIC_URL+"/customer/car/booking", carDTO, {
      headers: this.createAuthHeader()
    })
  }

  isCarAviable(carId: number):Observable<any>{
    return this.http.get(BASIC_URL+"/customer/car/isaviable/"+carId, {
      headers: this.createAuthHeader()
    })
  }

  getBookings():Observable<any>{
    return this.http.get(BASIC_URL+"/customer/mybookings/"+this.storage.getUserId(),{
      headers: this.createAuthHeader()
    })
  }

  createAuthHeader():HttpHeaders{
    let authHeader : HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',
      'Bearer ' + this.storage.getToken()
    );
  }

}
