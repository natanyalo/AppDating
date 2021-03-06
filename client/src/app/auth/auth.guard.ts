import {
    CanActivate, Router,
    ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

Injectable()
export class authGaurd implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this.userService.getAuth();
        if (!isAuth)
            this.router.navigate(['/login'])
        return isAuth;
    }

}