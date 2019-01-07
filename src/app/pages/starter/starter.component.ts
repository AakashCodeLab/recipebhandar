import {Component, AfterViewInit, OnInit} from '@angular/core';
import {RecipedataService} from '../../services/recipedata.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements  OnInit , AfterViewInit {
  finaldata;
    constructor(public router: Router, private data: RecipedataService) {
    }
  ngOnInit() {
    const data = this.data.recipedata();
    console.log('home', data.recipes);
    this.finaldata = data.recipes;
    localStorage.setItem('prefixed-data', JSON.stringify( this.finaldata));
    if (this.router.url === '/') {
      this.router.navigate(['/home']);
    }
  }
  ngAfterViewInit() {}
}
