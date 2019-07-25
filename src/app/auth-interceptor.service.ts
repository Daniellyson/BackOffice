import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private dataService: DataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("userToken");

    if (idToken) {
      const cloned = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + idToken)
      });

      return next.handle(cloned);
    }
    else {
      this.dataService.logout();
      return next.handle(req);
    }
    //throw new Error("Method not implemented.");
  }
}
