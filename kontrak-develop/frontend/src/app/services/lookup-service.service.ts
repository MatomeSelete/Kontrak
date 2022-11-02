import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseURL = environment.baseUrl



@Injectable({
  providedIn: 'root'
})
export class LookupServiceService {



  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> { 
    return this.http.get(`${baseURL}/api/getcate`);
  }
  getSubCategories(): Observable<any> { 
    return this.http.get(`${baseURL}/api/getsub`);
  }

}
