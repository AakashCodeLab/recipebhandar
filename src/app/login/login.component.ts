import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar} from '@angular/material';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  submitted = false;
  errorvalue;
    constructor(public router: Router, private formBuilder: FormBuilder, public authentication: AuthenticationService,  private snackbar: MatSnackBar) {}

    ngOnInit() {
      if (localStorage.getItem('currentuser')) {
          this.router.navigate(['/home']);
      }

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
            $('.preloader').fadeOut();
        });
        $(function() {
            (<any>$('[data-toggle="tooltip"]')).tooltip();
        });
        $('#to-recover').on('click', function() {
            $('#loginform').slideUp();
            $('#recoverform').fadeIn();
        });
    }

    onLoggedin() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }

      let registeruser = [];
      this.authentication.login(this.loginForm.value.userName, this.loginForm.value.password)
        .subscribe(
          data => {
            registeruser = data;
            console.log(44, registeruser);
            this.errorvalue = data.errorvalue;
            if (this.errorvalue === 0) {
              this.router.navigate(['/home']);
              localStorage.setItem('currentuser',  JSON.stringify(this.loginForm.value));
            }
          },
          error => {
            const snack = this.snackbar.open('Something went wrong','', {
              duration: 500,
              panelClass: ['red-snackbar']
            });
          console.log('error', error);
          });

    }
  clearFilter() {
    this.errorvalue = 0;  // clear value when input value change
  }
}
