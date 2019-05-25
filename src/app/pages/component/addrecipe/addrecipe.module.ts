import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbdAddRecipeBasic} from './addrecipe.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';


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
			ReactiveFormsModule,
      NgbModule.forRoot(),
			RouterModule.forChild(routes),
			MatAutocompleteModule,
			MatButtonModule,
			MatButtonToggleModule,
			MatCardModule,
			MatCheckboxModule,
			MatChipsModule,
			MatDatepickerModule,
			MatDialogModule,
			MatExpansionModule,
			MatGridListModule,
			MatIconModule,
			MatInputModule,
			MatListModule,
			MatMenuModule,
			MatNativeDateModule,
			MatPaginatorModule,
			MatProgressBarModule,
			MatProgressSpinnerModule,
			MatRadioModule,
			MatRippleModule,
			MatSelectModule,
			MatSidenavModule,
			MatSliderModule,
			MatSlideToggleModule,
			MatSnackBarModule,
			MatSortModule,
			MatTableModule,
			MatTabsModule,
			MatToolbarModule,
			MatTooltipModule,
			MatStepperModule,
    ],
	declarations: [NgbdAddRecipeBasic]
})
export class AddrecipeModule { }
