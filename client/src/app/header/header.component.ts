import { Component, OnInit,OnDestroy } from '@angular/core';
import { userService } from '../auth/user.service';
import{Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{


   private isUserAuth=false;
   private AuthListenerSubs:Subscription
  
  constructor( private userService:userService) { }


  ngOnInit() {
    this.isUserAuth=this.userService.getAuthPost()
     this.AuthListenerSubs=this.userService.getAuthListener()
     .subscribe(isAuthenticaed=> this.isUserAuth=isAuthenticaed)
  }

  onLogOut(){
     this.userService.logOut();
  }
  ngOnDestroy() {
   this.AuthListenerSubs.unsubscribe();
  }

}
