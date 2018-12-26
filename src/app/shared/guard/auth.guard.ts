import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
          const obj1 = JSON.parse(localStorage.getItem('currentuser'));
          const  registeruser = JSON.parse(localStorage.getItem('isLoggedin'));
          console.log(registeruser)
          const  self = this;
          const verified = registeruser.some(function (obj) {
            return obj.userName === obj1.userName &&  obj.password ===  obj1.password ;
          })

          if (verified) {
            return true;
          }
         /* if (obj1.userName === 'aakash' && obj1.password === '123456') {
            return true;
          }*/
     }

        this.router.navigate(['/login']);
        return false;
    }
}
