import { Component } from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private swUpdate: SwUpdate, private swPush: SwPush, private snackbar: MatSnackBar,
              ) {

    this.swUpdate.available.subscribe(evt => {
      this.swUpdate.checkForUpdate().then(() => {

        const snack = this.snackbar.open('Update Available', 'Reload', {
          panelClass: ['blue-snackbar']
        });
        snack
          .onAction()
          .subscribe(() => {
            window.location.reload();
          });

      });
    });


  }
}
