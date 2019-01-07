import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbdAddRecipeBasic} from './addrecipe.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [{
	path: '',
	data: {
      title: 'Add Recipe',
      urls: [{title: 'Dashboard', url: '/'},{title: 'ngComponent'},{title: 'Add Recipe'}]
    },
	component: NgbdAddRecipeBasic
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule,
      NgbModule.forRoot(),
    	RouterModule.forChild(routes)
    ],
	declarations: [NgbdAddRecipeBasic]
})
export class AddrecipeModule { }
