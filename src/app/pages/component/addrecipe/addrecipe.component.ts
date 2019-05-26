import { Component} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import {RecipedataService} from '../../../services/recipedata.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
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
    constructor( private recipeservice: RecipedataService, private snackbar: MatSnackBar,public router: Router ) { }
  
    ngOnInit() {
    }

    get author(){
      return this.form.get('author')
    }
    onSubmit(){
    
      console.log(this.form.value);
      this.recipeservice.addRecipe(this.form.value).subscribe(res =>{
        const snack = this.snackbar.open('Recipe Added Successfully','', {
          duration: 500,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/home']);
      },(err) => {
        const snack = this.snackbar.open('Sorry ,for server error','', {
          duration: 500,
          panelClass: ['red-snackbar']
        });
        console.log(err)
      });
    }
  

}

