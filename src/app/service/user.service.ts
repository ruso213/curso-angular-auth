import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '@models/api';
import { userResponse } from '@models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private  http : HttpClient,
    private tokenService: TokenService
  ) { }
  getAllUsers(){
    const token = this.tokenService.getToken()
    return this.http.get<userResponse[]>(`${api}/users`)
  }
  
}
