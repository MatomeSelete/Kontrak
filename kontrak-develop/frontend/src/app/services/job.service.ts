import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Job } from '../interfaces/job';
import { Category } from '../interfaces/category';
import { SubCategory } from '../interfaces/sub-category';
const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
const options = { headers: headers, crossDomain: true, withCredentials: true };

const baseURL = environment.baseUrl


 
@Injectable({
  providedIn: 'root'
})
export class JobService {

 baseURL = environment.baseUrl

  constructor(private http: HttpClient) { }

 

  //============= service to get category in the backend ========


getContractor(){
  return this.http.get(`${this.baseURL}/api/getSubcategory`,)
}

//=============== service to get the subcategories =============

// getSubcategory(category_id:number){
//   return this.http.get(`${this.baseURL}/api/getSubcategory/:`)
// }
 

//===========getting the location from the  backend =====

getLocation(location:string){
  return this.http.get(`${this.baseURL}/api/getLocation`)
}
//================= service to post the job ==============

//============== posting an image ===========

postImg(image:any){
  return this.http.post(`${this.baseURL}/api/add_job`, image)
}

  postJob(job: any){
    return this.http.post(`${this.baseURL}/api/postJob`,job)
  }
 
}
