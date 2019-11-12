import { Component, OnInit } from '@angular/core';
import { centerService } from './center.service';
import { Profile } from 'src/app/profiles/profile.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-center',
  templateUrl: './home-center.component.html',
  styleUrls: ['./home-center.component.css']
})
export class HomeCenterComponent implements OnInit {

  indexUser: number = 0;
  fullName: string
  currentUser: Profile
  users: Profile[] = []
  subUser: Subscription
  constructor(private centerService: centerService) { }

  ngOnInit() {
    this.centerService.getAllUser();
    this.centerService.getUsers().subscribe(res => {
      this.users = [...res].filter(user=> user.id!==localStorage.getItem("userId") ) 
      this.currentUser = this.users[0];
      this.fullName = this.currentUser.firstName + ' ' + this.currentUser.lastName
    })

  }

  async next() {
    if (this.indexUser < this.users.length - 1) {
      this.indexUser++;
      this.currentUser = this.users[this.indexUser]
      this.fullName = this.currentUser.firstName + ' ' + this.currentUser.lastName
    }
  }

  want() {
    this.centerService.addFriend(this.users[this.indexUser])
  }

}
