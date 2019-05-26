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
  uri = 'http://localhost:8080/user';
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
  };

}


