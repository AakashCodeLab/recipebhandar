import {Component, OnInit} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray  } from '@angular/forms';
import {RecipedataService} from '../../../services/recipedata.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
  selector: 'ngbd-accordion-basic',
  templateUrl: 'addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss']
})
export class NgbdAddRecipeBasic implements OnInit {

  pageTitle: string;
  buttonName: string;
  form: FormGroup;
  recipeDetails;
  recipeId;
  constructor( private recipeservice: RecipedataService, private snackbar: MatSnackBar, public router: Router,
               public  route: ActivatedRoute, private formBuilder: FormBuilder, private spinner: NgxSpinnerService ) { }

  ngOnInit() {
   
    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id');
      if (this.recipeId) {
        this.pageTitle = 'Edit Recipe';
        this.buttonName = 'Edit';
        this.getRecipeDeatailsById(this.recipeId);
      }else {
        this.pageTitle = 'Add Recipe';
        this.buttonName = 'Add';
        this.recipeDetails = {
          author: '',
          name: '',
          recipeDetail: '',
          ingredients: [ {
            ingredient: ''
          }] ,
          instructions: '',
          preptime: 0,
          cooktime: 0,
          url: '',
        };
      }
    });
    this.form = this.formBuilder.group({
      author: ['', [Validators.required]],
      name: ['', [Validators.required]],
      recipeDetail: ['', [Validators.required]],
      instructions: ['', [Validators.required]],
      preptime: ['', [Validators.required]],
      cooktime: ['', [Validators.required]],
      url: ['', [Validators.required]],
      ingredients: this.formBuilder.array([
        // load first row at start
        this.ingredients()
      ])
    });
  }
  getRecipeDeatailsById(recipeId) {
    this.spinner.show();
    this.recipeservice.getRecipeDeatailsById(recipeId).subscribe(recipe => {
      console.log(recipe);
      this.editRecipe(recipe);
      this.recipeDetails = recipe;
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
      const snack = this.snackbar.open('Sorry ,for server error', '', {
        duration: 500,
        panelClass: ['red-snackbar']
      });
      console.log(err);
    });
  }

  editRecipe(recipe) {
    this.form.patchValue({
      author: recipe.author,
      name: recipe.name,
      recipeDetail: recipe.recipeDetail,
      instructions: recipe.instructions,
      preptime: recipe.preptime,
      cooktime: recipe.cooktime,
      url: recipe.url,
    });
    this.form.setControl('ingredients', this.setExistingiIngredients(recipe.ingredients));
  }

  setExistingiIngredients(ingredients): FormArray {
    const formArray = new FormArray([]);
    ingredients.forEach(ingredient => {
      formArray.push(this.formBuilder.group({
        ingredient: ingredient.ingredient
      }));
    });
    return formArray;
  }
  get author(){
    return this.form.get('author');
  }

  ingredients() {
    return this.formBuilder.group({
      ingredient: ['', Validators.required],
    });
  }

   removeIngredent(i: number) {
    const control = <FormArray>this.form.controls['ingredients'];
    control.removeAt(i);
    control.markAsDirty();
    control.markAsTouched();
  }
   addIngredent() {
    const control = <FormArray>this.form.controls['ingredients'];
    control.push(this.ingredients());
  }

  onSubmit() {
    console.log(this.form.value);
    this.mapFormValuesToRecipeModel();
    if (this.recipeId){
      this.recipeservice.updateRecipe(this.recipeDetails, this.recipeId).subscribe(res => {
        const snack = this.snackbar.open('Recipe Updated Successfully', '', {
          duration: 500,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/home']);
      },(err) => {
        const snack = this.snackbar.open('Sorry ,for server error', '', {
          duration: 500,
          panelClass: ['red-snackbar']
        });
        console.log(err);
      });

    }else {
      this.recipeservice.addRecipe(this.form.value).subscribe(res => {
        const snack = this.snackbar.open('Recipe Added Successfully', '', {
          duration: 500,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/home']);
      }, (err) => {
        const snack = this.snackbar.open('Sorry ,for server error', '', {
          duration: 500,
          panelClass: ['red-snackbar']
        });
        console.log(err);
      });
    }
  }
  mapFormValuesToRecipeModel() {
    this.recipeDetails.author = this.form.value.author;
    this.recipeDetails.name = this.form.value.name;
    this.recipeDetails.recipeDetail = this.form.value.recipeDetail;
    this.recipeDetails.ingredients = this.form.value.ingredients;
    this.recipeDetails.instructions = this.form.value.instructions;
    this.recipeDetails.preptime = this.form.value.preptime;
    this.recipeDetails.cooktime = this.form.value.cooktime;
    this.recipeDetails.url = this.form.value.url;
  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }
}

