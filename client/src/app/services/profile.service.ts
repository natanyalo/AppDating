import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model'
import { Subject, pipe, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
Injectable()
export class profileService {
  private port = environment.urlApi + "profile";
  private profile: Profile
  private profileSub = new Subject<Profile>();
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }
  public getProfile() {
    return this.profileSub.asObservable();
  }
  public getProfileApi() {
    return this.http.get<{ profile: Profile }>(this.port)
      .pipe(map((res) => {
        this.profile = {
          firstName: res.profile.firstName,
          lastName: res.profile.lastName,
          range: res.profile.range,
          summery: res.profile.summery,
          maximum: res.profile.maximum,
          minimum: res.profile.minimum,
          age: res.profile.age,
          city: res.profile.city,
          phoneNumber: res.profile.phoneNumber,
          imagePath: res.profile.imagePath,
          creator: res.profile.creator,
        }
        this.profileSub.next({... this.profile});
        return this.profile;
      }));
  }
  public updataProfile(profile: Profile) {
    const Data = new FormData();
    Data.append('firstName', profile.firstName)
    Data.append('lastName', profile.lastName)
    Data.append('age', profile.age)
    Data.append('range', profile.range)
    Data.append('maximum', profile.maximum)
    Data.append('minimum', profile.minimum)
    Data.append('favorite', profile.favorite)
    Data.append('summery', profile.summery)
    Data.append('imagePath', profile.imagePath)
    Data.append('city', profile.city)
    Data.append('id', this.profile.id)
    Data.append('phoneNumber', profile.phoneNumber)
    this.http.put(this.port, Data).subscribe((res: Profile) => {
      this.profile = res;
      this.profile.id = res["_id"]
      this.profile.imagePath = res["imagePath"]
      this.profileSub.next({ ... this.profile })
      console.log("okup", res)
    },
      () => {
        console.log("badup")
      })
  }
  public createProfile(profile: Profile) {
    const Data = new FormData();
    Data.append('firstName', profile.firstName)
    Data.append('lastName', profile.lastName)
    Data.append('age', profile.age)
    Data.append('range', profile.range)
    Data.append('maximum', profile.maximum)
    Data.append('minimum', profile.minimum)
    Data.append('favorite', profile.favorite)
    Data.append('summery', profile.summery)
    Data.append('imagePath', profile.imagePath)
    Data.append('city', profile.city)
    Data.append('phoneNumber', profile.phoneNumber)
    this.http.post(this.port, Data).subscribe((res: Profile) => {
      this.profile = res;
      this.profile.id = res["_id"]
      this.profile.imagePath = res["imagePath"]
      this.profileSub.next({ ... this.profile })
      console.log("okcreate", res)
    },
      () => {
        console.log("badcreate")
      })

  }
}