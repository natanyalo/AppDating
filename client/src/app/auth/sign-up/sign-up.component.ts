import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService: userService) { }

  ngOnInit() {
  }

  public onSignUp(form: NgForm) {
    this.userService.signUp(form.value)
    form.reset();
  }
}
