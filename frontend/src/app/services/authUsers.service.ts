import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Signuprequest} from "../interfaces/signuprequest";
import {Observable} from "rxjs";
import {Loginrequest} from "../interfaces/loginrequest";

@Injectable({
  providedIn: 'root'
})
export class AuthUsersService {

  constructor(private http: HttpClient) { }

  addUser(signuprequest:Signuprequest):Observable<any>{
     return this.http.post<Signuprequest>('http://localhost:8080/auth/registration',signuprequest);

  }

  loginUser(loginrequest:Loginrequest):Observable<any>{
    return this.http.post<Loginrequest>('http://localhost:8080/auth/login',loginrequest);
  }
}
