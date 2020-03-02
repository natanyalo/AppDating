import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { MatSnackBar } from '@angular/material';
Injectable()
export class CenterService {
    private url = environment.urlApi + "center";
    private listUser: Profile[]
    private ListUserSub = new Subject<Profile[]>();
    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: MatSnackBar
    ) { }
    public getUsers() {
        return this.ListUserSub.asObservable();
    }
    public getAllUser() {
        const userId = localStorage.getItem("userId")
        this.http.get<{ users: any }>(this.url)
            .subscribe(
                (res) => {
                    console.log('user', res.users)
                    this.listUser = res.users//[...res.users].filter(t => userId != t.creator);
                    this.ListUserSub.next([...this.listUser])
                })
    }
    public addFriend(profile: Profile) {
        this.http.post(this.url + "/want",
            {
                wantId: profile.creator,
                creatorId: localStorage.getItem("userId")
            }).subscribe(
                res => {
                 
                },
                err => {
                    console.log(err)
                }
            )
    }
}
