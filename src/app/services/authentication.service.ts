import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import {delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  fakeResponse = {res: true};

  constructor(  private httpClient: HttpClient) {
    localStorage.setItem('cmLocal', JSON.stringify(this.fakeResponse));

  }

  /**
   * LOGIN FUNCTION
   */

  login = Observable.of(this.fakeResponse).pipe(
    delay( 3000 )
  );
}
