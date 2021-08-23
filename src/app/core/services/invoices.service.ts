import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient, private router: Router) { }
  getinvoices () {
    return this.http.post(`${environment.baseurl}invoice/list`,{}).pipe(catchError((error) => throwError(error)));
  }
  
}
