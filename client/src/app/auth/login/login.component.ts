import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userService } from '../../service/user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false

  constructor(private userService: userService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.userService.Login(form.value.email, form.value.password)
    form.reset();
  }

}
