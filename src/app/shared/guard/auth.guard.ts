import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('isLoggedin') || localStorage.getItem('isSignup')) {
          const obj1 = JSON.parse(localStorage.getItem('isLoggedin'));
          if (obj1.userName === 'aakash' && obj1.password === '123456') {
            return true;
          }
     }

        this.router.navigate(['/login']);
        return false;
    }
}
