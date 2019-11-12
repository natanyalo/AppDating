import { Injectable } from '@angular/core';
import { Profile } from '../../profiles/profile.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'
Injectable()
export class centerService {

    url = environment.urlApi + "center";
    listUser: Profile[]
    private ListUserSub = new Subject<Profile[]>();

    constructor(private http: HttpClient,
        private router: Router) { }

    getUsers() {
        return this.ListUserSub.asObservable();
    }

    getAllUser() {
        const userId = localStorage.getItem("userId")
        this.http.get<{ users: any }>(this.url)
            .subscribe(res => {
                this.listUser = [...res.users].filter(t => userId != t.creator)
                this.listUser.map(t => {
                    t.imagePath = t['imagePath'];
                })
                this.ListUserSub.next([...this.listUser])


            })

    }

    addFriend(profile: Profile) {
        console.log(profile.creator)
        this.http.post(this.url + "/want", {
            wantId: profile.creator,
            creatorId: localStorage.getItem("userId")
        }).subscribe(
            res => {
                console.log(res)
            },
            err => {
                console.log(err)
            }
        )
    }

}
