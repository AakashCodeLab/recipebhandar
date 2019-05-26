import {Component, AfterViewInit, OnInit} from '@angular/core';
import {RecipedataService} from '../../services/recipedata.service';
import {Router} from '@angular/router';
import Recipe from '../../Recipe';

@Component({
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements  OnInit , AfterViewInit {
  recipeData:Recipe[];
    constructor(public router: Router, private recipeservice: RecipedataService) {
    }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.recipeservice
      .getRecipes()
      .subscribe((data: Recipe[]) => {
        this.recipeData = data;
        if (this.router.url === '/') {
          this.router.navigate(['/home']);
        }
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
  edit(data, i) {
  }
  ngAfterViewInit() {}
}
