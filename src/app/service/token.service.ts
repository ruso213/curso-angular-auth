import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    
  ) { }

  setToken(token: string){
    setCookie('token', token)
  }
  getToken(){
    return getCookie('token')
  }
  deleteToken(){
    removeCookie('token')
  }
  
}
