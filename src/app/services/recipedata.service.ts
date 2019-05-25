import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RecipedataService {

  uri = 'http://localhost:8080/recipe';
  versionuri = 'getversion';

  constructor(private http: HttpClient,private snackbar: MatSnackBar) { }
  getRecipes() {
    return this .http.get(`${this.uri}`);
  }
  deleteRecipe(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
  getVersion() {

    const url = this.versionuri;
    return this.http.get(url, { responseType: 'text' as 'json' });
  }

  addRecipe(obj) {
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res =>{
        const snack = this.snackbar.open('Added Successfully','', {
          duration: 500,
          panelClass: ['blue-snackbar']
        });
        console.log('Done');
      },(err) => {console.log(err)});
  }
}
