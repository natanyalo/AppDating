import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService:userService) { }

  ngOnInit() {
  }


  onSignUp(form:NgForm ){
    console.log(form.value)
    this.userService.signUp(form.value)
  form.reset();
  }
}
