import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkEmail, login, profile, recovery } from '@models/auth.model';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { api } from '@models/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private tokenService: TokenService,
    private router: Router

  ) { }
  
  private profileData = new BehaviorSubject<profile>({
    avatar:"",
    email:"",
    id:0,
    name:"",
    updatedAt:""
  })
  profileData$ = this.profileData.asObservable()
  login(email: string, password : string) {
    return this.http.post<login>(`${api}/auth/login`,{
      email, password
    }).pipe(
      tap(item => {
        this.tokenService.setToken(item.access_token)
        this.tokenService.setRefreshToken(item.refresh_token)
      }),
      
    )
  }
  logout(){
    this.tokenService.deleteToken()
    this.tokenService.deleteRefreshToken()
    this.router.navigate(['/login'])
  }
  isAvailable(email:string){
    return this.http.post<checkEmail>(`${api}/auth/is-available`,{email})
  }

  register(email: string, password : string, name: string){
    return this.http.post(`${api}/auth/register`,{
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
    return this.http.post<recovery>(`${api}/auth/recovery`,{
      email
    })
  }
  changePassword(newPassword: string, token: string){    
    console.log('ola');
    
      return this.http.post(`${api}/auth/change-password`, {
        token,
        newPassword,
      })  
  }
  profile(){
    const token = this.tokenService.getToken()
    return this.http.get<profile>(`${api}/auth/profile`).pipe(
      tap(item =>{
        this.profileData.next(item)
      })
    )
  }
  refreshToken(refreshToken:string){
    return this.http.post<login>(`${api}/auth/refresh-token`,{
      refreshToken
    }).pipe(
      tap((i)=>{
        this.tokenService.setToken(i.access_token)
        this.tokenService.setRefreshToken(i.refresh_token)
      })
    )
  }
}
