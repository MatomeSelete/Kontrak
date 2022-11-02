import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ActivePageService {

  baseURL = environment.baseUrl

  constructor(private http: HttpClient) {}

  getRequestedJob(id:any) {
    
    return this.http.get(`${this.baseURL}/api/getRequestedjob/${id.contractor_id}`);
    //http://localhost:5400/api/getRequestedjob/14
  }
}
