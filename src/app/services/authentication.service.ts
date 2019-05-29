import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  fakeResponse = {res: true};
  uri = 'user';
  constructor(  private httpClient: HttpClient) {
  }

   /**
   * SIGNUP FUNCTION
   */
  signUp(obj) {
    return this.httpClient.post(`${this.uri}/signup`, obj)
  }

  /**
   * LOGIN FUNCTION
   */
  login(userName: string, password: string): Observable<any> {
    const body = { userName: userName, password: password };

    return this.httpClient.post<any>(`${this.uri}/login`, body)
      .map(response => {
        return response;
      });
  }


 //  /*
 //  * Forgot Password
 //  * */
 //  forgotPassword(email): Observable<any> {
 //    let url = this.uri + '/api/user/password/forgot/';
 //
 //    let body = {
 //      "email": email
 //    };
 //    return this.httpClient.post(url, body)
 //      .map(response => {
 //        let resdata = response;
 //
 //        return resdata;
 //      });
 //  }
 //
 //  /*
 //  * Reset Password
 //  * */
 //  resetPassword(body, ID): Observable<any> {
 //    let url: string = this.uri + '/api/user/password/reset/' + ID + '/';
 //    return this.httpClient.post(url, body)
 //      .map(res => {
 //        return res;
 //      })
 //  }
 //
 //
 //  /*
 //  * Read Reset Password
 //  * */
 //  readResetPassword(ID): Observable<any> {
 //    let url: string = this.uri + '/api/user/password/reset/' + ID + '/';
 //    return this.httpClient.get(url)
 //      .map(res => {
 //        return res;
 //      })
 //  }
 //
 //
 //  /*
 // * Reset Password
 // * */
 //  changePassword(iobj): Observable<any> {
 //    let url = this.uri + '/api/user/userpassword/reset/ ';
 //
 //    // let obj = JSON.parse(localStorage.getItem('cmLocal'));
 //    // let Token = obj.token.key;
 //    //
 //    // let headers: any = new Headers();
 //    // headers.append('Content-Type', 'application/json');
 //    // headers.append('Authorization', `Token ${Token}`);
 //
 //    // let options = new RequestOptions({ headers: headers });
 //
 //    return this.httpClient.post(url, iobj)
 //      .map(response => {
 //        let resdata = response;
 //        return resdata;
 //      });
 //  }


}


