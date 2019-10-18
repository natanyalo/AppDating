import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userService } from '../user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading=false
  
  constructor(private userService:userService) { }

  ngOnInit() {
  }


  onLogin(form:NgForm ){
    console.log(form.value)
    this.userService.Login(form.value.email, form.value.password)
    form.reset();
  }

}
