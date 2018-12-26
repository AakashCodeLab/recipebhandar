import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RecipedataService} from '../services/recipedata.service';

@Component({
    selector: 'app-layout',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PageComponent implements OnInit {
  finaldata;
    constructor(public router: Router, private data: RecipedataService) { }

    ngOnInit() {
      const data = this.data.recipedata();
      console.log('home', data.recipes);
      this.finaldata = data.recipes;
      localStorage.setItem('prefixed-data', JSON.stringify( this.finaldata));
        if (this.router.url === '/') {
            this.router.navigate(['/starter']);
        }
    }

}
