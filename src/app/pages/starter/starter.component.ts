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
  recipeData: Recipe[];
  copyRecpeData: Recipe[];
    constructor(public router: Router, private recipeservice: RecipedataService , private spinner: NgxSpinnerService, private snackbar: MatSnackBar) {
    }
  ngOnInit() {
    this.spinner.show();
    this.getData();
    this.searchRecipe();
  }

  getData() {
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
    this.spinner.show();
    this.recipeservice
      .getEmployeeDetail()
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
  view(data, i) {
  }
  edit( recipeId) {
      console.log(recipeId);
    this.router.navigate(['/edit', recipeId]);
  }
  ngAfterViewInit() {}
}
