import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo }  from '../interfaces/todo'

const baseURL = environment.baseUrl


@Injectable({
  providedIn: 'root'
})


export class TrackerService {

  constructor(private http: HttpClient, private router: Router) { }

 
  postTask(job :any ) {

    return this.http.post(`${baseURL}/api/createTask`, job);

  }


 //============ get a job ==============


  getJob(id : any ): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${baseURL}/api/getTasks/${id}`);
  }

  getDoneTask(id : any ): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${baseURL}/api/getdone/${id}`);
  }

 
  // updateStatus(task : any): Observable<any> { 
  //   return this.http.put(`${baseURL}/api/area`, task);
  // }

  updateStatus(id: any, data:any){

    return this.http.put(`${baseURL}/api/updatestatus/${id}`, data )
   }
}
