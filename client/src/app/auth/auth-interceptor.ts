import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { userService } from '../service/user.service';


Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService:userService){}

    intercept(req:HttpRequest<any>,next:HttpHandler){
      const authToken=this.authService.getToken();
      const authRequest=req.clone({
          headers:req.headers.set("Authorization","Bearer "+authToken)
      })

      return next.handle(authRequest)
    }
}