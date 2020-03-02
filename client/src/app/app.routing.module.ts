import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { authGaurd } from './auth/auth.guard';
import { HomeComponent } from './controllers/home/home.component';
import {ChetsComponent} from './controllers/home/chets/chets.component'
const route: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGaurd] },
  {
    path: 'profile', loadChildren: () => import(`./controllers/profiles/profile.module`)
    .then(m => m.ProfileModule), canActivate: [authGaurd],
  },
  {path:'chet/:profileId', component:ChetsComponent, canActivate:[authGaurd]},
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent }

]
//like app.moudel
@NgModule({
  imports: [
    RouterModule.forRoot(route),
  ],
  exports: [RouterModule],//export the ngModule
  providers: [authGaurd]

})
export class AppRoutingMoudel { } 