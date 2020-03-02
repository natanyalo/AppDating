import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model'
import { Subject, pipe, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { MatSnackBar } from '@angular/material';
import { Friend} from '../models/friend';
@Injectable({
  providedIn: 'root',
})
export class FriendService {
    private FriendsSub = new Subject< []>();
    private url:string=environment.urlApi + "friend";
    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: MatSnackBar
      ) {}
      public getFriends(){
          return this.http.get<{friends:Friend[]}>(this.url);
      }
}

