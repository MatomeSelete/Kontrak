import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseURL = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
   }
   getjobdetails(data:any){
    return this.http.get(`${baseURL}/dashboard/jobreq/${data}`)
   }
  
   getAvgRating(data:any){
    return this.http.get(`${baseURL}/dashboard/avgrating/${data}`)
   }

   updateStatus(id: any, data:any){

   
    
    return this.http.patch(`${baseURL}/dashboard/updateStatus/${id}`, data )
   }

   activeJob(data:any){
    

    return this.http.get(`${baseURL}/dashboard/activeJob/${data}`)
   }

}

