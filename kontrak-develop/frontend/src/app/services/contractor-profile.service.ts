import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseURL = environment.baseUrl



@Injectable({
  providedIn: 'root'
})
export class ContractorProfileService {

  constructor(private http: HttpClient) {

  }
  getProfile(users: any): Observable<any> {
    return this.http.get(`${baseURL}/api/getprofile/${users}`);
  }

  updatePassord(users: any): Observable<any> {
    return this.http.put(`${baseURL}/api/Pass/${users.user_id}`, users);
  }

  updatContacts(users: any): Observable<any> {
    return this.http.patch(`${baseURL}/api/updateContact/${users.user_id}`, users);
  }

  updateCategory(users: any): Observable<any> {
    return this.http.put(`${baseURL}/api/updateCat/${users.contractor_id}`, users);
  }
  updatSkills(users: any): Observable<any> {
    return this.http.post(`${baseURL}/api/upload`, users);
  }

  updateLocation(users: any): Observable<any> {
    return this.http.put(`${baseURL}/api/area/${users.user_id}`, users);
  }
  updateImg(users: any, id: any): Observable<any> {
    return this.http.patch(`${baseURL}/api/updatePic/${id}`, users);
  }

  finishProfile(data: any) {
    return this.http.post(`${baseURL}/api/finishProfile`, data);
  }
 addCategory(data:any){
  return this.http.post(`${baseURL}/api/cat`, data);
 }

 addSubCategory(data:any){
  return this.http.post(`${baseURL}/api/subcat`, data);
 }
  onceOff(data: any) {
    console.log('back daata ', data);

    return this.http.get(`${baseURL}/api/onceOff/${data}`)
  }

getcon(data:any){
  return this.http.get(`${baseURL}/api/con/${data}`)
}
getca(data:any){
  return this.http.get(`${baseURL}/api/ca/${data}`)
}
}
