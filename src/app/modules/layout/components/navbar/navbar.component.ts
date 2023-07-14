import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { profile } from '@models/auth.model';
import { AuthService } from 'src/app/service/auth.service';

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
  constructor(
    private authService: AuthService
  ) {}
  
}
