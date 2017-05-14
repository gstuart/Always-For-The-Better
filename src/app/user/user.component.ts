import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  currentRoute: string = this.router.url;
  users: FirebaseListObservable<any[]>;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(){
    this.users = this.userService.getUsers();
  }

  goToDetailPage(clickedUser) {
    this.router.navigate(['users', clickedUser.$key]);
  };
}
