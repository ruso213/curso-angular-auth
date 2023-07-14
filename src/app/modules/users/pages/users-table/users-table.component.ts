import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  profileData$ = this.authService.profileData$
  constructor(
    private userService: UserService,
    private authService : AuthService
  ) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(item =>{
      this.dataSource.init(item)
    })
  }

}
