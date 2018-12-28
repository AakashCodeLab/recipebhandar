import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  submitted = false;
  errorvalue;
    constructor(public router: Router, private formBuilder: FormBuilder) {}

    ngOnInit() {

      this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
      );
    }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
    ngAfterViewInit() {
        $(function() {
            $(".preloader").fadeOut();
        });
        $(function() {
            (<any>$('[data-toggle="tooltip"]')).tooltip();
        });
        $('#to-recover').on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
    }

    onLoggedin() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }
      const registeruser = JSON.parse(localStorage.getItem('isLoggedin'));
      console.log(registeruser);

      if (registeruser) {
        // const  self = this;
        const verified = registeruser.some( (obj) => {
          if ( (obj.userName === this.loginForm.value.userName) === false ) {
            if ( (obj.password ===  this.loginForm.value.password) === false) {
              this.errorvalue = 3; // both wrong
              return false;
            }else {
              this.errorvalue = 1; // username wrong
              return false;
            }
          }else
          if ((obj.password ===  this.loginForm.value.password) === true) {
            this.errorvalue = 0;   // nothing wrong
            return true;
          } else {
            this.errorvalue = 2;  // password wrong
            return true;
          }
        })

        if ( !this.errorvalue) {
          console.log(this.errorvalue);
          this.router.navigate(['/home']);
        } else if (this.errorvalue === 1) {
          console.log('username wrong');
        }else if (this.errorvalue === 2) {
          console.log('password wrong');
        } else if (this.errorvalue === 3) {
          console.log('both wrong');
        }
      }else {
        this.errorvalue = 3;
      }
    }
  clearFilter() {
    this.errorvalue = 0;  // clear value when input value change
  }
}
