import { Injectable } from '@angular/core';
import { user } from '../models/user.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { profileService } from './profile.service'
Injectable()
export class userService {
    private userId: string;
    private token: string;
    private authUser: boolean;
    private port = environment.urlApi + "user/";
    private timerToken: any;
    private AuthListener = new Subject<boolean>()
    constructor(
        private http: HttpClient,
        private router: Router,
        private profileService: profileService
    ) {}
    public getUserId() {
        return this.userId;
    }
    public getToken() {
        return this.token;
    }
    public getAuthListener() {
        return this.AuthListener.asObservable();
    }
    public getAuth() {
        return this.authUser
    }
    public signUp(user: user) {
        this.http.post<{ token: string, timer: number, userId: string }>(this.port + "signup", user)
            .subscribe(res => {
                if (res.token) {
                    this.setAuthTimer(res.timer)
                    this.userId = res.userId;
                    this.token = res.token;
                    this.authUser = true;
                    this.AuthListener.next(true)
                    const now = new Date()
                    const expirationDate = new Date(now.getTime() + res.timer * 1000)
                    this.saveAuthDate(expirationDate, this.token, this.userId)
                    this.router.navigate(['/'])
                }
            },
                () => {
                    console.log("errorrrrr")
                })
    }
    public Login(email: string, password: string) {
        this.http.post<{ token: string, timer: number, userId: string }>(this.port + "login", { email, password })
            .subscribe(res => {
                if (res.token) {
                    this.setAuthTimer(res.timer)
                    this.userId = res.userId;
                    this.token = res.token;
                    this.authUser = true;
                    this.AuthListener.next(true)
                    const now = new Date()
                    const expirationDate = new Date(now.getTime() + res.timer * 1000)
                    this.saveAuthDate(expirationDate, this.token, this.userId)
                    this.profileService.getProfileApi();
                    this.router.navigate(['/home'])
                }
            },
                () => {
                    console.log("errorrrrr")
                })
    }
    public logOut() {
        this.userId = null
        this.authUser = false;
        this.token = null
        this.removeAuthDate();
        this.AuthListener.next(false)
        this.router.navigate(['/'])
        clearInterval(this.timerToken)
    }
    public autoAuthUser() {
        const inforamtionAuth = this.getAuthDate()
        if (!inforamtionAuth)
            return;
        const now = new Date()
        const expiretIn = inforamtionAuth.expirationDate.getTime() - now.getTime()
        if (expiretIn > 0)
            this.token = inforamtionAuth.token
        this.authUser = true
        this.setAuthTimer(expiretIn / 1000)
        this.AuthListener.next(true)
    }
    public setAuthTimer(duration: number) {
        this.timerToken = setTimeout(() => {
            this.logOut()
        }, duration * 1000)
    }
    public getAuthDate() {
        const expirationDate = localStorage.getItem("expirationToken")
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")
        if (!token || !expirationDate)
            return;
        return {
            token,
            expirationDate: new Date(expirationDate),
            userId
        }
    }
    public saveAuthDate(expirationDate: Date, token: string,
        userId: string) {
        localStorage.setItem("expirationToken", expirationDate.toISOString())
        localStorage.setItem("token", token)
        localStorage.setItem("userId", userId)
    }
    public removeAuthDate() {
        localStorage.removeItem("token")
        localStorage.removeItem('expirationToken')
        localStorage.removeItem("userId")
    }
}