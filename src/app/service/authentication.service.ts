import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment' ;
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http' ;
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
private host  = environment.apiUrl;
  private token: string;
  private loggedInUsername : string;
  private jwthelper = new JwtHelperService;

  constructor(private http : HttpClient) {}

    public login(user : User) : Observable<HttpResponse<any> | HttpErrorResponse > {
      return this.http.post<HttpResponse<any> | HttpErrorResponse >
      (`${this.host}/usre/login`, user, {observe:'response'});

    }

    public register(user : User) : Observable< User  | HttpErrorResponse> {
      return this.http.post< User | HttpErrorResponse >
      (`${this.host}/usre/register`, user);

    }

    public logOut() : void {
      this.token = null ;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('users');
    }

    public saveToken(token :string) : void {
      this.token = token ;
      localStorage.setItem('token' , token) ;
    }

    public adduserTolocalCache(user : User) : void {
      localStorage.setItem('user', JSON.stringify(user)) ;
    }

    public getUserFromLocalCache(): User {
      return JSON.parse(localStorage.getItem('user'));
    }

    public loadToken() : void {
      this.token = localStorage.getItem('token');
    }

    public getToken() : string {
      return this.token;
    }

    public isLoggedIn() : boolean {
      this.loadToken();
      if (this.token != null && this.token !== '') {

        if(this.jwthelper.decodeToken(this.token).sub != null || '') {

          if(this.jwthelper.isTokenExpired(this.token)) {
            this.loggedInUsername = this.jwthelper.decodeToken(this.token).sub ;
            return true;
          }
        }
      }
      else {
        this.logOut();
        return false;
      }
     
    }
   
}
