import { Injectable } from '@angular/core';
import { CanActivate, Router,  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ){

  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.isValidRefreshToken()
    if(!token){
      this.router.navigate(['/login'])
      return false
    }else{
      return true
    }
  }
  /* takeToken(){
    const token = localStorage.getItem('token')
    
  } */
}
