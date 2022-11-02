import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import { Login } from '../Interfaces/login';
//import {  survey } from '../Interfaces/survey';
import { Router } from '@angular/router';
const baseURL = environment.baseUrl


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private router: Router) { }

  signup(users : any) {
    return this.http.post(`${baseURL}/api/register`, users);
  }


   get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['signin']);
    }
  }

}
