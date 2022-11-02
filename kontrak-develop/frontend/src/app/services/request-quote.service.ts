import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

const baseURL = environment.baseUrl


 
@Injectable({
  providedIn: 'root'
})


export class RequestQuoteService {
  get(id: any) {
    throw new Error('Method not implemented.');
  }

  //constructor() { }
  
  baseURL = environment.baseUrl


  constructor(private http: HttpClient) {}
  


  // ============== get contactor name from the backend ============ 
  // showname() {
  //   return this.http.get(`${this.baseURL}/api/users.firstname`,);
  // }

  getContractor(data:any) { 
    
    return this.http.post(`${this.baseURL}/api/getC`,data);
  }


  // ============== get contacts from the backend ============ 
  getContacts(id:any) {
    return this.http.get(`${this.baseURL}/api/getcontacts/${id}`);
  }


  // ============== Post request from the backend ============ 
  postRequest(data:any) {
    return this.http.patch(`${this.baseURL}/api/request`,data);
  }


  // ============== Get request from the backend ============ 
  getRequest() {
    return this.http.get(`${this.baseURL}/api/getrequest`);
  }


  // ============== get contactor images from the backend ============ 
  showimages(img:any): Observable<any> {
   
    console.log('img ',img);
    
    return this.http.post(`${this.baseURL}/api/gallery`,img);
  }


  // ============== get contactor details from the backend ============ 
  // showsubcategory() {
  //   return this.http.get(`${this.baseURL}/api/`);
  // }



  // ============== get contactor  CallOuFee  from the backend ============ 
  showCallOuFee() {
    return this.http.get(`${this.baseURL}/api/contractor.calloutfee`);
  }


  // ============== get contactor  ratings from the backend ============ 
  showRatings() {
    return this.http.get(`${this.baseURL}/api/review.rating`);
  }
 
  // location:any;
  // category:any;
  // subcategory:any


  // getFilter(location:any, category:any, subcategory:any){
  //   this.location = location,
  //   this.category = category,
  //   this.subcategory = subcategory,
    
  //   // console.log(location);
  //   // console.log(category);
  //   // console.log(subcategory);
  // }

  // passFilterCategory (){
  //   let filters = {
  //     location: this.location,
  //     category: this.category,
  //     subcategory: this.subcategory,
  //   }
  //   return filters
  // }
}
