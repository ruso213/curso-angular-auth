import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { profile } from '@models/auth.model';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent  {
 
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;
  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  profile$ =this.authService.profileData$
  
  logout(){
    this.authService.logout()
    
  }
  isValid(){
    const a = this.tokenService.isValidToken()
    console.log(a);
    
  }
  constructor(
    private authService: AuthService,
    private tokenService : TokenService
  ) {}
  
}
