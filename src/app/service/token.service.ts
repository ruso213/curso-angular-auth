import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    
  ) { }

  setToken(token: string){
    localStorage.setItem('token', token)
  }
  getToken(){
    localStorage.getItem('token')
  }
  deleteToken(){
    localStorage.removeItem('token')
  }
  
}
