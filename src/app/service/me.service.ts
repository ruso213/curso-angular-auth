import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenInterceptor, checkToken } from '@interceptors/token.interceptor';
import { api } from '@models/api';
import { Meboard } from '@models/me.models';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  constructor(
    private http: HttpClient,
    
  ) { }
  getMeProfiel(){
    return this.http.get(`${api}/me/profile`,{
      context: checkToken()
    })
  }
  getMeBoards(){
    return this.http.get<Meboard[]>(`${api}/me/boards`,{
      context: checkToken()
    })
  }
}
