import { Component, OnInit, OnDestroy } from '@angular/core';
import { CenterService } from '../../../services/center.service';
import { Profile } from 'src/app/models/profile.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-center',
  templateUrl: './home-center.component.html',
  styleUrls: ['./home-center.component.css']
})
export class HomeCenterComponent implements OnInit, OnDestroy {
  private indexUser: number;
  private fullName: string;
  private currentUser: Profile;
  private users: Profile[];
  private subUser: Subscription;
  constructor(
    private centerService: CenterService
  ) {
    this.indexUser = 0;
    this.users = [];
  }
  ngOnInit() {
    this.centerService.getAllUser();
    this.subUser = this.centerService.getUsers()
      .subscribe((res: any) => {
        this.users = res;
        if (this.users.length) {
          this.currentUser = this.users[0];
          this.fullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
        }
      })

  }
  public async next() {
    if (this.indexUser < this.users.length - 2) {
      this.indexUser++;
      this.currentUser = this.users[this.indexUser]
      this.fullName = this.currentUser.firstName + ' ' + this.currentUser.lastName
    }
  }
  public want() {
    this.centerService.addFriend(this.users[this.indexUser])
  }
  ngOnDestroy() {
    this.subUser.unsubscribe();
  }
}
