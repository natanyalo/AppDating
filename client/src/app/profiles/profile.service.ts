import { Injectable } from '@angular/core';
import { Profile } from './profile.model'
import { Subject, pipe, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
Injectable()
export class profileService {

  port = environment.urlApi + "profile";
  profile: Profile
  private profileSub = new Subject<Profile>();

  constructor(private http: HttpClient,
    private router: Router) { }

  public getProfile() {
    return this.profileSub.asObservable();
  }
  public getProfileApi() {
    return this.http.get<{ profile: Profile }>(this.port)
      .pipe(map((res) => {
        console.log(res.profile)
        return {
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
      error => {
        console.log("badup")
      })

  }

  createProfile(profile: Profile) {
    console.log(profile)
    /*hey my name is Natan , I would like  
    to know new friends , 
    so who want to know me he invited to know me */
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
      error => {
        console.log("badcreate")
      })

  }
}