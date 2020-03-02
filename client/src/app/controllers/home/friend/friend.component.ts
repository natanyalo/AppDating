import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend';
import { Subscription } from 'rxjs';
import { FriendService } from 'src/app/services/friend.service';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  private _friends: Friend[];
  private _subFriend: Subscription;
  private _courentUser:string;
  constructor(
    private _friendService: FriendService,
  ) { 
    this._friends=[]
  }
  ngOnInit() {
    this._subFriend = this._friendService.getFriends()
      .subscribe(
        (res: any) => {
          this._courentUser='/chet/'+res.friends.find(x=>x.id);
          this._friends = res.friends;
          this._friends.map(f=>f.id='/chet/'+f.id)
        },
        () => {
        })
  }
  public changeUser(id:string){
    this._courentUser=id
  }
  ngOnDestroy() {
    this._subFriend.unsubscribe();
  }

}
