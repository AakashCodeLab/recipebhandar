import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MustMatch} from '../_helpers/must-match.validator';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
    constructor(public router: Router, private formBuilder: FormBuilder, public authentication: AuthenticationService) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        termsAndConditions: [false, Validators.required]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
   // const users = [];
  //  const currentuser = [];
    const loginobj = {
      userName: '',
      password: '',
      email: ''
    };

    loginobj.userName = this.registerForm.value.userName;
    loginobj.password = this.registerForm.value.password;
    loginobj.email = this.registerForm.value.email;
    this.authentication.signUp(loginobj);
/*    if (JSON.parse(localStorage.getItem('isLoggedin'))) {
      users = JSON.parse(localStorage.getItem('isLoggedin'));
      if (users.length > 0) {
        users.push(loginobj);
      }else {
        users.push(loginobj);
      }}else {
      users.push(loginobj);
    }*/
    // localStorage.setItem('isLoggedin',  JSON.stringify(users));
    localStorage.setItem('currentuser',  JSON.stringify(loginobj));
    this.router.navigate(['/login']);
  }
}
