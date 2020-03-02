import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from '../../../models/profile.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles-display',
  templateUrl: './profiles-display.component.html',
  styleUrls: ['./profiles-display.component.css']
})
export class ProfilesDisplayComponent implements OnInit, OnDestroy {
  public typeButton: string;
  public imagePreview: string;
  private profileSub$: Subscription;
  public profile: Profile;
  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) {
    this.typeButton = "Edit";
    this.imagePreview = "http://localhost:4200/assets/images/person.png";
  }
  ngOnInit() {
    this.profileService.getProfileApi()
    this.profileSub$ = this.profileService.getProfile()
      .subscribe((profile: Profile) => {
        this.profile = {... profile};
        console.log(profile.image)
        this.imagePreview = profile.image;
      },
        () => {
         this.router.navigate(['/profile/edit'])
        })


  }
  ngOnDestroy() {
    this.profileSub$.unsubscribe();
  }
}
