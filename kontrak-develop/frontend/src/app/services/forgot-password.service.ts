import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseURL = environment.baseUrl



@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) {
   
  } 
  forgotPassword(data : any): Observable<any> { 
     return this.http.post(`${baseURL}/api/forgot`, data);
   }
   change(data:any){
    return this.http.post(`${baseURL}/api/change`, data);
  }
}
