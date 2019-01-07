import { Component} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-accordion-basic',
	templateUrl: 'addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss']
})
export class NgbdAddRecipeBasic {
   beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  };
}
