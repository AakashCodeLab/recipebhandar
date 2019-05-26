import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MustMatch} from '../_helpers/must-match.validator';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar} from '@angular/material';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
    constructor(public router: Router, private formBuilder: FormBuilder, public authentication: AuthenticationService, private snackbar: MatSnackBar) { }

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
 
    const loginobj = {
      userName: '',
      password: '',
      email: ''
    };

    loginobj.userName = this.registerForm.value.userName;
    loginobj.password = this.registerForm.value.password;
    loginobj.email = this.registerForm.value.email;
    this.authentication.signUp(loginobj).subscribe(res =>{
      const snack = this.snackbar.open('Welcome to RecipeBhandar','', {
        duration: 1000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(['/home']);
    },(err) => {
      const snack = this.snackbar.open('Something went wrong','', {
        duration: 500,
        panelClass: ['red-snackbar']
      });
      console.log(err)
    });
    localStorage.setItem('currentuser',  JSON.stringify(loginobj));
    this.router.navigate(['/login']);
  }
}
