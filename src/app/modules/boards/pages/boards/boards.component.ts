import { Component, OnInit } from '@angular/core';
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { MeService } from 'src/app/service/me.service';
import { board } from '@models/me.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  boards : board[] = [];  
  ngOnInit(): void {
    this.meService.getMeBoards().subscribe(item => this.boards = item )
  }
  constructor(
    private meService :MeService
  ) { }

}
