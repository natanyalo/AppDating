import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model'
import { Subject, pipe, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private port = environment.urlApi + "profile";
  private profile: Profile=null;
  private profileSub = new Subject<Profile>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  public getProfile() {
    return this.profileSub.asObservable();
  }
  public getProfileApi() {
     this.http.get<{ profile: Profile }>(this.port).subscribe((res) => {
       res.profile ? this.profile = res.profile : this.profile = null;
        this.profileSub.next({ ... this.profile });
      });
  }
  public updataProfile(profile: any) {
    const Data = new FormData();
    Data.append('firstName', profile.firstName)
    Data.append('lastName', profile.lastName)
    Data.append('age', profile.age)
    Data.append('range', profile.range)
    Data.append('maximum', profile.maximum)
    Data.append('minimum', profile.minimum)
    Data.append('gender', profile.gender)
    Data.append('favorite', profile.favorite)
    Data.append('summery', profile.summery)
    Data.append('id', profile.id)
    Data.append('image', profile.image)
    Data.append('address', JSON.stringify(profile.address))
    Data.append('phoneNumber', profile.phoneNumber)
    this.http.put<{ profile: Profile }>(this.port, Data)
      .subscribe(() => {
        this.snackbar.open(
          'עדכון פרויפל עבר בהצלחה!',
          'סגירה'
        );
      },
        () => {
          this.snackbar.open(
            'אירעה שגיאה בעת עדכון',
            'סגירה'
          );
        })
  }
  public createProfile(profile: any) {
    const Data = new FormData();
    Data.append('firstName', profile.firstName)
    Data.append('lastName', profile.lastName)
    Data.append('age', profile.age)
    Data.append('range', profile.range)
    Data.append('maximum', profile.maximum)
    Data.append('minimum', profile.minimum)
    Data.append('gender', profile.gender)
    Data.append('favorite', profile.favorite)
    Data.append('summery', profile.summery)
    Data.append('image', profile.image)
    Data.append('address', JSON.stringify(profile.address))
    Data.append('phoneNumber', profile.phoneNumber)
    this.http.post(this.port, Data)
      .subscribe((res: Profile) => {
        this.profile = res;
        this.profileSub.next({ ... this.profile })
        this.snackbar.open(
          ' יצירת פרופיל עברה בהצלחה!',
          'סגירה'
        );
      },
        () => {
          this.snackbar.open(
            'אירעה שגיאה בעת יצירת פרופיל',
            'סגירה'
          );
        })

  }
}