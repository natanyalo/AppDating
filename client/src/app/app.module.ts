import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './controllers/header/header.component'
//import {} from 'ngx-bootstrap'
// routing
import { AppRoutingMoudel } from './app.routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component'
import { UserService } from './services/user.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './controllers/error/error.component';
import { AngularMatrialModule } from './angular-matrial-module';
import { HomeCenterComponent } from './controllers/home/home-center/home-center.component';
import { FriendComponent } from './controllers/home/friend/friend.component';
import { HomeComponent } from './controllers/home/home.component';
import { CenterService } from './services/center.service';
import { FriendService } from './services/friend.service';
import { ChetsComponent } from './controllers/home/chets/chets.component';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    ErrorComponent,
    HomeCenterComponent,
    FriendComponent,
    ChetsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingMoudel,
    FormsModule,
    AngularMatrialModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    , UserService, CenterService,FriendService
  ],
  bootstrap: [AppComponent]
  ,
  entryComponents: [ErrorComponent]
})
//entryComponents use for to tell anular i give you
//a component that you cant see at but create it
export class AppModule implements OnInit {

  constructor(private userServerice: UserService) { }
  ngOnInit() {
    //thise case for run auth befor app
    this.userServerice.autoAuthUser();
  }
}
