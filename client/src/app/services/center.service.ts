import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
Injectable()
export class centerService {
    private url = environment.urlApi + "center";
    private listUser: Profile[]
    private ListUserSub = new Subject<Profile[]>();
    constructor(
        private http: HttpClient,
        private router: Router
        ){ }
    public getUsers() {
        return this.ListUserSub.asObservable();
    }
    public getAllUser() {
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
    public addFriend(profile: Profile) {
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
