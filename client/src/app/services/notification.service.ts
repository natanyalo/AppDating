import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { MatSnackBar } from '@angular/material';
import { Notification } from '../models/notification';
import { Profile } from '../models/profile.model';
@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private url: string = environment.urlApi + "notification/";
    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: MatSnackBar
    ) { }
    public getNotificationsMessage() {
        return this.http.get<{ profiles: Profile[] }>(this.url + 'message');
    }
    public getNotificationsMatch() {
        return this.http.get<{ profiles: Profile[] }>(this.url + 'match');
    }
    public hideNotificationsMatch(id:string) {
         return this.http.put(this.url + 'match',{ userIdFrom:id});
    }
    public hideNotificationsMessage(id:string) {
        return this.http.put(this.url + 'message',{ userIdFrom:id});
   }
}
