import {Component, AfterViewInit, OnInit} from '@angular/core';
import {RecipedataService} from '../../services/recipedata.service';
import {Router} from '@angular/router';
import Recipe from '../../Recipe';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatSnackBar} from '@angular/material';
@Component({
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements  OnInit , AfterViewInit {
  showSearchOnHeader = true;
  viewRecipePage = false;
  recipeData: Recipe[];
  reacipeDetails: Recipe;
  copyRecpeData: Recipe[];
  instructionArray = [];
test = 0;
    constructor(public router: Router, private recipeservice: RecipedataService ,
                private spinner: NgxSpinnerService, private snackbar: MatSnackBar) {
    }
  ngOnInit() {
   setInterval(()=>{
test = test+1;
  });
    this.spinner.show();
    this.getData();
    this.searchRecipe();
  }

  getData() {
    this.showSearchOnHeader = true;
    this.spinner.show();
    this.recipeservice
      .getRecipes()
      .subscribe((data: Recipe[]) => {
        this.recipeData = data;
        this.copyRecpeData = this.recipeData;
        this.spinner.hide();
        if (this.router.url === '/') {
          this.router.navigate(['/home']);
        }
      });
  }

  searchRecipe() {
    this.showSearchOnHeader = true;
    this.spinner.show();
    this.recipeservice
      .getRecipeOnSearch()
      .subscribe((data: Recipe[]) => {
        console.log(data);
        if (data !== null && data.length > 0) {
          this.recipeData = data;
          this.spinner.hide();
        }else if (data !== null && data.length === 0) {


          setTimeout(() => {
            this.recipeData = this.copyRecpeData;
            const snack = this.snackbar.open('Not Found', '', {
              duration: 1000,
              panelClass: ['red-snackbar']
            });
          }, 1500);

        }
        if (this.router.url === '/') {
          this.router.navigate(['/home']);
        }
      }, (err) => {
        const snack = this.snackbar.open('Sorry ,for server error', '', {
          duration: 500,
          panelClass: ['red-snackbar']
        });
        console.log(err);
      });
  }


  deleteRecipe(id) {
    this.recipeservice.deleteRecipe(id).subscribe(res => {
      console.log('Deleted');
      this.getData();
    });
  }

  viewRecipe(recipe) {
    this.showSearchOnHeader = false;
      console.log(recipe);
    this.viewRecipePage = true;
    this.reacipeDetails = recipe;
    this.reacipeDetails.preptime = this.convertMinsToHrsMins(this.reacipeDetails.preptime);
    this.reacipeDetails.cooktime = this.convertMinsToHrsMins(this.reacipeDetails.cooktime);
    this.instructionArray = this.reacipeDetails.instructions.split('.');
    const length = this.instructionArray.length;
    this.instructionArray = this.instructionArray.slice(0, length - 1);
  }

  GoToListRecipe(){
    this.viewRecipePage = false;
  }

  edit( recipeId) {
      console.log(recipeId);
    this.router.navigate(['/edit', recipeId]);
  }

   convertMinsToHrsMins(mins) {
    let h: any = Math.floor(mins / 60);
    let m: any = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    if (h === '00') {
      return `${m}min`;
    }else if (m === '00') {
      return `${h}hrs`;
    } else {
      return `${h}hrs:${m}min`;

    }
  }
  ngAfterViewInit() {}
}
