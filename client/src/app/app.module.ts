import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

   import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'


import { AppComponent } from './app.component';
import { postCreate } from './posts/post-create/post-create.component';
import {HeaderComponent} from './header/header.component'
import {ListPostComponent} from './posts/list-post/list-post.component'
import {postService} from './posts/post.service'
//import {} from 'ngx-bootstrap'
// routing
import {AppRoutingMoudel} from './app.routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component'
import { userService } from './auth/user.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMatrialModule } from './angular-matrial-module';
import { ProfilesComponent } from './profiles/profiles.component';
import { profileService } from './profiles/profile.service';
import { HomeCenterComponent } from './home/home-center/home-center.component';
import { FriendComponent } from './home/friend/friend.component';
import { HomeComponent } from './home/home.component';
import { centerService } from './home/home-center/center.service';

@NgModule({
  declarations: [
    AppComponent,
    postCreate,
    HomeComponent,
    HeaderComponent,
    ListPostComponent,
    LoginComponent,
    SignUpComponent,
    ErrorComponent,
    ProfilesComponent,
    HomeCenterComponent,
    FriendComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingMoudel,
    FormsModule,
    AngularMatrialModule
  ],
  
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
    ,{provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
    ,postService ,userService,profileService,centerService
  ],
  bootstrap: [AppComponent]
  ,
  entryComponents:[ErrorComponent]
})
//entryComponents use for tell anular i give you
//a component that you cant see at but create it
export class AppModule implements OnInit { 

  constructor(private userServerice:userService){}
  ngOnInit(){
    //thise case for run auth befor app
    this.userServerice.autoAuthUser();
  }
}
