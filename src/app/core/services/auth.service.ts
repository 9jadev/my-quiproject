import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = sessionStorage.getItem('qui-user');
  // userObject$  = new BehaviorSubject<any>(JSON.parse(this.user) || null);
  constructor(private http: HttpClient, private router: Router) { }

  storeToken(token: string) {
    return sessionStorage.setItem('qui-token', token);
  }

  getToken() {
    return sessionStorage.getItem('qui-token');
  }

  storeUser(user: any) {
    sessionStorage.setItem('qui-user', JSON.stringify(user));
    // return this.userObject$.next(user);
  }

  getUser$() {
    // return this.userObject$.asObservable();
    const user = sessionStorage.getItem('qui-user');
    if (user != null) {
      const parseUser = JSON.parse(user);
      // console.log(parseUser) 
      return parseUser;
    }
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  async clearSessionStorage() {
    await sessionStorage.clear();
    this.router.navigate([""])
  }

  login(user:Object) {
    return this.http.post(`${environment.baseurl}customer/login`, user).pipe(catchError((error) => throwError(error)));
  }

  fetchDashboard() {
    return this.http.post(`${environment.baseurl}invoice/homelist`,{}).pipe(catchError((error) => throwError(error)));
  }
}
