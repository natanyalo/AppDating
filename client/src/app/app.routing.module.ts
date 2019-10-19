import { NgModule, Component } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { ListPostComponent } from './posts/list-post/list-post.component';
import { postCreate } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { authGaurd } from './auth/auth.guard';
import {ProfilesComponent} from './profiles/profiles.component' 
import { HomeComponent } from './home/home.component';


const route:Routes=[
    {path:'', component:LoginComponent},
    //protected
    {path:'home', component:HomeComponent, canActivate:[authGaurd]},
    {path:'edit/:postId', component:postCreate, canActivate:[authGaurd]},
    {path:'profile', component:ProfilesComponent, canActivate:[authGaurd]},
    {path:'profile/:userId', component:ProfilesComponent, canActivate:[authGaurd]},
    {path:'login',component:LoginComponent},
    {path:'signUp',component:SignUpComponent}

]
//like app.moudel
@NgModule({
  imports:[
      RouterModule.forRoot(route),
      
  ],
  exports:[RouterModule],//export the ngModule
  providers:[authGaurd]
  
})
export class AppRoutingMoudel{} 