import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from '../services/user.service';


Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    })
    return next.handle(authRequest)
  }
}