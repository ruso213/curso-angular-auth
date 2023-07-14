import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService : TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken()
    let requestClone = request
    if(token){
        requestClone = request.clone({
        setHeaders : {
          Authorization : `Bearer ${token}`
        }
      })
    }
    return next.handle(requestClone)
  }
}
