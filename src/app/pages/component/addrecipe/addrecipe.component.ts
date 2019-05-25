import { Component} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'ngbd-accordion-basic',
	templateUrl: 'addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss']
})
export class NgbdAddRecipeBasic {

  constructor( private formBuilder: FormBuilder) {}
  

}

