import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import Recipe from '../Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipedataService {
  private recipeSearchSubject = new BehaviorSubject(null);
  uri = 'recipe';

  constructor(private http: HttpClient, private snackbar: MatSnackBar, public router: Router) { }


  sendSearchRecipe(recipename) {
    console.log(recipename);
    if (recipename === '') {
      recipename = 'all';
    }
    const data = this
      .http
      .get(`${this.uri}/search/${recipename}`).subscribe((recipe: Recipe[]) => {
        console.log(recipe);
        this.recipeSearchSubject.next(recipe);

      });
  }

  getRecipeOnSearch() {
    return this.recipeSearchSubject.asObservable();
  }


  getRecipes() {
    return this .http.get(`${this.uri}`);
  }
  deleteRecipe(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

  getRecipeDeatailsById(recipeId) {
    return this
      .http
      .get(`${this.uri}/edit/${recipeId}`);
  }


  updateRecipe(obj, recipeId) {
    return this.http.put(`${this.uri}/update/${recipeId}`, obj);

  }
  
  addRecipe(obj) {
    return this.http.post(`${this.uri}/add`, obj);

  }
  // searchRecipe(recipename) {
  //   return this
  //     .http
  //     .get(`${this.uri}/search/${recipename}`);
  // }
}
