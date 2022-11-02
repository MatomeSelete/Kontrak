import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../login';
import { ActivatedRoute, Router } from '@angular/router';
const baseURL = environment.baseUrl




@Injectable({
  providedIn: 'root'

})



export class LoginService {
  
  
  constructor(private http: HttpClient,   private route: ActivatedRoute, private router: Router) { }

  login(users : Login): Observable<any> { 
    return this.http.post(`${baseURL}/api/login`, users);
  }

  decodeToken(token: any): any {
    try{
        return jwt_decode(token);
    }catch (err){
        return err;
    }
  }
  logout(){
    localStorage.clear();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}


 