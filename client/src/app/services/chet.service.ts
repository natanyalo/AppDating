import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Chet } from '../models/chet.model';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ChetService {
  public _chets = this.socket.fromEvent<Chet>('chetMessages');
  public _notificationMessages = this.socket.fromEvent<Profile>('notificationMessage');
  constructor(private socket: Socket) { }

  public getDocument(userIdOne: string,profileIdSecond:string) {
    this.socket.emit('getDoc',{userIdOne,profileIdSecond});
  }
  public newDocument(chet:Chet) {
    this.socket.emit('addDoc',{chet,userId:localStorage.getItem("userId")});
  }
  public editDocument(chet: Chet) {
    this.socket.emit('editDoc', chet);
  }

}