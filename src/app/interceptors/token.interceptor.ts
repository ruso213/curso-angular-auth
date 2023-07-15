import { Injectable, TRANSLATIONS, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
const CHECK_TOKEN = new HttpContextToken<boolean>(()=> false)
function checkToken(){
  return new HttpContext().set(CHECK_TOKEN , true)
}
@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService : TokenService,
    private authService : AuthService,
  ) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHECK_TOKEN)){
      const isValidToken = this.tokenService.isValidToken()
      if(isValidToken){
        return this.addToken(request, next)
      }else{

        return this.updateAccessTokenAndRefreshToken(request, next)
      }
    }
    return next.handle(request)
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler){
    const token = this.tokenService.getToken()
      if(token){
         const requestClone = request.clone({
          setHeaders : {
            Authorization : `Bearer ${token}`
          }
        })
        return next.handle(requestClone)
      }
      return next.handle(request)
  }
 private updateAccessTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler){
  const refreshToken = this.tokenService.getRefreshToken()
  const isValidRefreshToken = this.tokenService.isValidRefreshToken()
  if(refreshToken && isValidRefreshToken){
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap(()=> this.addToken(request, next))
    )
  }
  return next.handle(request)
 }
}
