import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StoragUserInfoService} from "../../services/storag-user-info.service";
import {Observable} from "rxjs";


const BASIC_URL =['http://localhost:8080'];

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http:HttpClient,
              private storage:StoragUserInfoService)
  { }


  addCar(carDTO:any):Observable<any>{
    return this.http.post(BASIC_URL + '/admin/addcar', carDTO, {
      headers: this.createAuthHeader()
    })
  }

  getAllCars():Observable<any>{
    return this.http.get(BASIC_URL + '/admin/allcars',{
      headers: this.createAuthHeader()
    })
  }

  deleteCar(id:number):Observable<any>{
    return this.http.delete(BASIC_URL + "/admin/deletecar/" + id,{
      headers: this.createAuthHeader()
    });
  }

  getCar(carid: number): Observable<any>{
    return this.http.get(BASIC_URL+"/admin/car/"+carid,{
      headers: this.createAuthHeader()
    });
  }

  updateCar(carid:number, carDTO:any):Observable<any>{
    return this.http.put(BASIC_URL+'/admin/update/'+carid, carDTO,{
      headers: this.createAuthHeader()
    });
  }

  getBookings():Observable<any>{
    return this.http.get(BASIC_URL+"/admin/bookings", {
      headers: this.createAuthHeader()
    })
  }

  changeStatus(bookingId:number,status:string): Observable<any>{
    return this.http.get(BASIC_URL+"/admin/status/"+bookingId+"/"+status, {
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
