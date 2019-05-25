import { Component} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import {RecipedataService} from '../../../services/recipedata.service';

@Component({
	selector: 'ngbd-accordion-basic',
	templateUrl: 'addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss']
})
export class NgbdAddRecipeBasic {

  form = new FormGroup({
    author: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    recipeDetail: new FormControl('', Validators.required),
    instructions: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
   });
    constructor( private recipeservice: RecipedataService,  ) { }
  
    get author(){
      return this.form.get('author')
    }
    ngOnInit() {
    }
  
    onSubmit(){
    
      console.log(this.form.value);
      this.recipeservice.addRecipe(this.form.value);
    }
  

}

