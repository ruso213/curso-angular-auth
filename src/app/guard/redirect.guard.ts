import { Injectable } from '@angular/core';
import {  CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(
     private router : Router,
     private tokenService: TokenService
  ){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken()
    if(token){
      this.router.navigate(['/app'])
      return false
    }else{
      return true
    }
  }
  
}
