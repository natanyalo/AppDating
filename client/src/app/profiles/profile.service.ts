import { Injectable } from '@angular/core';
import {profile} from './profile.model'
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
 import {map} from 'rxjs/operators'
import {Router} from '@angular/router'
import {environment} from '../../environments/environment'
Injectable()
export class profileService{
  
   port =environment.urlApi +"profile";
    profile:profile
   private profileSub= new Subject<profile>();

    constructor(private http:HttpClient,
        private router:Router){}

public getProfileFromBackend(){
     this.http.get(this.port).subscribe((respost:profile)=>{
          this.profile={... respost};
          this.profile.image=respost['imagePath'];
          this.profile.id=respost['_id'];
          console.log(this.profile)
        this.profileSub.next({... this.profile})
         
      });

}   

public getProfile(){
    return this.profileSub.asObservable();
}     

updataProfile(profile:profile){
    const Data= new FormData();
     Data.append('firstName', profile.firstName)
     Data.append('lastName', profile.lastName)
     Data.append('age', profile.age)
     Data.append('range', profile.range)
     Data.append('maximum', profile.maximum)
     Data.append('minimum', profile.minimum)
     Data.append('favorite', profile.favorite)
     Data.append('summery', profile.summery)
     Data.append('image', profile.image)
     Data.append('city', profile.city)
     Data.append('id', this.profile.id)
     Data.append('phoneNumber', profile.phoneNumber)
      this.http.put(this.port,Data).subscribe((res:profile)=>{

        this.profile=res;
        this.profile.id=res["_id"]
        this.profile.image=res["imagePath"]
        this.profileSub.next({... this.profile})

       console.log("okup",res)
      }, 
      error=>{
        console.log("badup")
      })

  }

createProfile(profile:profile){
 
 /*hey my name is Natan , I would like  
 to know new friends , 
 so who want to know me he invited to know me */
    const Data= new FormData();
     Data.append('firstName', profile.firstName)
     Data.append('lastName', profile.lastName)
     Data.append('age', profile.age)
     Data.append('range', profile.range)
     Data.append('maximum', profile.maximum)
     Data.append('minimum', profile.minimum)
     Data.append('favorite', profile.favorite)
     Data.append('summery', profile.summery)
     Data.append('image', profile.image)
     Data.append('city', profile.city)
     Data.append('phoneNumber', profile.phoneNumber)

      this.http.post(this.port,Data).subscribe((res:profile)=>{
        this.profile=res;
        this.profile.id=res["_id"]
        this.profile.image=res["imagePath"]
        this.profileSub.next({... this.profile})
       console.log("okcreate",res)
      }, 
      error=>{
        console.log("badcreate")
      })

  }
}