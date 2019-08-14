import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { ResourceLoader } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private dataService: DataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.reload();
    /*const idToken = localStorage.getItem("userToken");

    if (idToken) {
      const cloned = req.clone({
          headers : req.headers.set("Authorization",
              "Bearer " + idToken)
      });

    }*/

    return next.handle(req)
      .pipe(tap(
        (response: HttpEvent<any>) => {
          console.log("REPONSE : " + response.type); 
        },
        (error: HttpErrorResponse) => {
          if(localStorage.getItem("logged") && error.status == 401) {
            console.log("ERROR : " + error.status);
            alert("Your session has expired. Please login");
            this.dataService.logout();
          }   
        },
        () => {
          console.log("completed successfully");
        }
      ));    
  }

  reload() {
    const firstTime = localStorage.getItem("firstTime");
		if(firstTime) {
			localStorage.removeItem("firstTime");
			location.reload();
		}
  }
}