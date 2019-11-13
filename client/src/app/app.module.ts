import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { postCreate } from './posts/post-create/post-create.component';
import { HeaderComponent } from './controllers/header/header.component'
import { postService } from './posts/post.service'
//import {} from 'ngx-bootstrap'
// routing
import { AppRoutingMoudel } from './app.routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component'
import { userService } from './service/user.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './controllers/error/error.component';
import { AngularMatrialModule } from './angular-matrial-module';
import { ProfilesComponent } from './controllers/profiles/profiles.component';
import { profileService } from './service/profile.service'
import { HomeCenterComponent } from './controllers/home/home-center/home-center.component';
import { FriendComponent } from './controllers/home/friend/friend.component';
import { HomeComponent } from './controllers/home/home.component';
import { centerService } from './service/center.service';

@NgModule({
  declarations: [
    AppComponent,
    postCreate,
    HomeComponent,
    HeaderComponent,
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    , postService, userService, profileService, centerService
  ],
  bootstrap: [AppComponent]
  ,
  entryComponents: [ErrorComponent]
})
//entryComponents use for to tell anular i give you
//a component that you cant see at but create it
export class AppModule implements OnInit {

  constructor(private userServerice: userService) { }
  ngOnInit() {
    //thise case for run auth befor app
    this.userServerice.autoAuthUser();
  }
}
