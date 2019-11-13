import { Component, OnInit, OnDestroy } from '@angular/core';
import { userService } from '../service/user.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isUserAuth: boolean;
  private authListenerSubs: Subscription
  private imagePath: boolean;
  constructor(private userService: userService) { }

  ngOnInit() {
    this.isUserAuth = false;
    this.isUserAuth = this.userService.getAuth()
    this.authListenerSubs = this.userService.getAuthListener()
      .subscribe((isAuthenticaed: boolean) => this.isUserAuth = isAuthenticaed)
  }

  public onLogOut() {
    this.userService.logOut();
  }
  public ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
