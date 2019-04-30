import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentuser')) {
        /*  const obj1 = JSON.parse(localStorage.getItem('currentuser'));
          const  registeruser = JSON.parse(localStorage.getItem('isLoggedin'));
          console.log(registeruser)
          const  self = this;
          const verified = registeruser.some(function (obj) {
            return obj.userName === obj1.userName &&  obj.password ===  obj1.password ;
          })*/

            return true;

     }

        this.router.navigate(['/login']);
        return false;
    }
}
