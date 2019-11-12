import { Injectable } from '@angular/core';
import { user } from './user.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { profileService } from '../profiles/profile.service'
Injectable()
export class userService {
    private userId: string
    private token: string
    private authPost = false
    port = environment.urlApi + "user/";
    public timerToken
    private AuthListener = new Subject<boolean>()

    constructor(private http: HttpClient,
        private router: Router,
        private profileService: profileService) { }

    getUserId() {
        return this.userId;
    }
    getToken() {
        return this.token;
    }
    getAuthListener() {
        return this.AuthListener.asObservable();
    }
    getAuthPost() {
        return this.authPost
    }

    signUp(user: user) {
        console.log(user)
        this.http.post<{ token: string, timer: number, userId: string }>(this.port + "signup", user).subscribe(res => {
            if (res.token) {

                this.setAuthTimer(res.timer)
                this.userId = res.userId;
                console.log("this.userId server", this.userId)
                this.token = res.token;
                this.authPost = true;
                this.AuthListener.next(true)
                const now = new Date()
                const expirationDate = new Date(now.getTime() + res.timer * 1000)
                this.saveAuthDate(expirationDate, this.token, this.userId)
                this.router.navigate(['/'])
            }
        },
            erro => {
                console.log("errorrrrr")
            }
        )

    }

    Login(email: string, password: string) {
        this.http.post<{ token: string, timer: number, userId: string }>(this.port + "login", { email, password }).subscribe(res => {
            if (res.token) {

                this.setAuthTimer(res.timer)
                this.userId = res.userId;
                this.token = res.token;
                this.authPost = true;
                this.AuthListener.next(true)
                const now = new Date()
                const expirationDate = new Date(now.getTime() + res.timer * 1000)
                this.saveAuthDate(expirationDate, this.token, this.userId)

                this.profileService.getProfileApi();

                this.router.navigate(['/home'])
            }
        },
            erro => {
                console.log("errorrrrr")
            })
    }
    logOut() {
        this.userId = null
        this.authPost = false;
        this.token = null
        this.removeAuthDate();
        this.AuthListener.next(false)
        this.router.navigate(['/'])
        clearInterval(this.timerToken)

    }

    autoAuthUser() {
        const inforamtionAuth = this.getAuthDate()
        if (!inforamtionAuth)
            return;
        const now = new Date()
        const expiretIn = inforamtionAuth.expirationDate.getTime() - now.getTime()
        if (expiretIn > 0)
            this.token = inforamtionAuth.token
        this.authPost = true
        this.setAuthTimer(expiretIn / 1000)
        this.AuthListener.next(true)
    }
    setAuthTimer(duration: number) {
        this.timerToken = setTimeout(() => {
            this.logOut()
        }, duration * 1000)
    }

    getAuthDate() {
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
    saveAuthDate(expirationDate: Date, token: string,
        userId: string) {
        localStorage.setItem("expirationToken", expirationDate.toISOString())
        localStorage.setItem("token", token)
        localStorage.setItem("userId", userId)
    }

    removeAuthDate() {
        localStorage.removeItem("token")
        localStorage.removeItem('expirationToken')
        localStorage.removeItem("userId")
    }
}