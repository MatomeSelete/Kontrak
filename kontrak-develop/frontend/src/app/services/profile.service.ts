import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseURL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  updatePassord(users : any): Observable<any> { 
    return this.http.put(`${baseURL}/api/Pass/${users.user_id}`, users);
  }

  updatContacts(users : any): Observable<any> { 
    return this.http.patch(`${baseURL}/api/updateContact/${users.user_id}`, users);
  }

  updateName(users : any): Observable<any> { 
    return this.http.patch(`${baseURL}/api/updateName/${users.user_id}`, users);
  }

  
}
