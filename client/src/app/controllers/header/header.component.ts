import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { userService } from '../../services/user.service'
import { Subscription } from 'rxjs'
import { profileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isUserAuth: boolean;
  private authListenerSubs: Subscription;
  private imagePath: string;
  private imagePathSub: Subscription;
  constructor(
    private userService: userService,
    private profileService: profileService
  ) { }

  ngOnInit() {
    this.isUserAuth = false;
    this.imagePath = "assets/images/person.png";
    this.authListenerSubs = this.userService.getAuthListener()
      .subscribe((isAuthenticaed: boolean) => {
        this.isUserAuth = isAuthenticaed;
        this.imagePathSub= this.profileService.getProfileApi()
        .subscribe((item: Profile) => {
         this.imagePath=item.imagePath;
        });
      });
    
  }

  public onLogOut() {
    this.userService.logOut();
  }
  public ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.imagePathSub.unsubscribe();
  }

}
