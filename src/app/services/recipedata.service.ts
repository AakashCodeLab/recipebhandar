import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipedataService {

  uri = 'http://localhost:8080/recipe';

  constructor(private http: HttpClient,private snackbar: MatSnackBar,public router: Router) { }
  getRecipes() {
    return this .http.get(`${this.uri}`);
  }
  
  deleteRecipe(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
 

  addRecipe(obj) {
    return this.http.post(`${this.uri}/add`, obj)
    
  }
}
