import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Subscription } from 'rxjs'
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ChetService } from 'src/app/services/chet.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _isUserAuth: boolean;
  private _notificationMessages: Profile[];
  private _notificationMatchs: Profile[];
  private _authListenerSubs: Subscription;
  private _image: string;
  private _nameUser: string;
  private _profileSub: Subscription;
  constructor(
    private _userService: UserService,
    private _profileService: ProfileService,
    private _notificationService: NotificationService,
    private _chetService: ChetService,
    private ref: ChangeDetectorRef
  ) {
    this._isUserAuth = false;
    this._notificationMessages = [];
    this._notificationMatchs = [];
    this._nameUser = '';
    this._image = "http://localhost:4200/assets/images/person.png";
  }
  ngOnInit() {
    this._authListenerSubs = this._userService.getAuthListener()
      .subscribe((isAuthenticaed: boolean) => {
        this._isUserAuth = isAuthenticaed;
        if (this._isUserAuth === true) {
          this.getProfile();
          this.initNotification();
        }
      });
  }
  public hideNotification(id: string, path: string) {
    if (path === "match")
      this._notificationService.hideNotificationsMatch(id)
        .subscribe(
          (res: any) => {
            this._notificationMatchs = res.profiles;
          },
          () => { })
    if (path === "message")
      this._notificationService.hideNotificationsMatch(id)
        .subscribe(
          (res: any) => {
            this._notificationMessages = res.profiles;
          },
          () => { })
  }
  public getProfile() {
    this._profileService.getProfileApi()
    this._profileSub = this._profileService.getProfile()
      .subscribe((item: Profile) => {
        if (item.image) {
          this._image = item.image;
          this._nameUser = item.firstName + ' ' + item.lastName;
        }
      });
  }
  public onLogOut() {
    this._userService.logOut();
  }
  public ngOnDestroy() {
    this._authListenerSubs.unsubscribe();
    this._profileSub.unsubscribe();
  }
  private initNotification() {
    this._notificationService.getNotificationsMatch()
      .subscribe(
        (res: any) => {
          this._notificationMatchs = res.profiles;
        },
        () => { })
    this._notificationService.getNotificationsMessage()
      .subscribe(
        (res: any) => {
          this._notificationMessages = res.profiles;
        },
        () => { })
    this._chetService._notificationMessages
      .subscribe((res: any) => {
        this._notificationMessages.push(res.profile);
        this.ref.detectChanges();
      })

  }

}
