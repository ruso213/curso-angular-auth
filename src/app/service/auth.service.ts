import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkEmail, login, recovery } from '@models/auth.model';
import { map, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private tokenService: TokenService,

  ) { }
  private api = 'https://fake-trello-api.herokuapp.com/api/v1'

  login(email: string, password : string) {
    return this.http.post<login>(`${this.api}/auth/login`,{
      email, password
    }).pipe(
      tap(item => this.tokenService.setToken(item.access_token))
    )
  }

  isAvailable(email:string){
    return this.http.post<checkEmail>(`${this.api}/auth/is-available`,{email})
  }

  register(email: string, password : string, name: string){
    return this.http.post(`${this.api}/auth/register`,{
      email,
      password,
      name
    })
  }

  registerAndLogin(email: string, password : string, name: string){
    return this.register(email,password,name).pipe(
      switchMap(()=> this.login(email, password)),
      
    )
  }

  recovery(email: string){
    console.log('ola');
    return this.http.post<recovery>(`${this.api}/auth/recovery`,{
      email
    })
  }
  changePassword(newPassword: string, token: string){    
    console.log('ola');
    
      return this.http.post(`${this.api}/auth/change-password`, {
        token,
        newPassword,
      })  
    
  }
}
