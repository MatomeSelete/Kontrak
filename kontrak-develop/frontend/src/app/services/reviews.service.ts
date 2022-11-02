import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });


//============ the enviroment credidatials===========


const baseURL = environment.baseUrl


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {




  constructor(private http: HttpClient, private router: Router) { }


  //=============service to post the review ======


  postReview(review :any ) {
 console.log();
 
    return this.http.post(`${baseURL}/api/postReview/${review.user_id}`, review);

  }


  //================= service to get the review =============

  getReview(id : any ): Observable<any> {
    return this.http.get(`${baseURL}/api/getReview/${id}`);
  }

}
