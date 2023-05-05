import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  user = new User();
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let httpHeaders = new HttpHeaders();

    // get the user details from session storage, set from login
    if (sessionStorage.getItem('userdetails')) {
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }

    // if user details are present, set the authorization header to send the basic auth credentials to the server
    if (this.user && this.user.password && this.user.email) {
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.user.email + ':' + this.user.password));
    } else {
      let authorization: string = sessionStorage.getItem("Authorization")!;
      if(authorization){
        httpHeaders = httpHeaders.append('Authorization', authorization);
      }
    }

    // set the X-Requested-With header to XMLHttpRequest
    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    // clone the request and replace the original headers with cloned headers, updated with the authorization.
    const xhr = req.clone({
      headers: httpHeaders
    });

    // send the newly created request
    return next.handle(xhr).pipe(tap(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['dashboard']);
        }
      }));
  }
}