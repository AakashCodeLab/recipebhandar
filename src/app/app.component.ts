import { Component } from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {MatSnackBar} from '@angular/material';
import {ConnectionService} from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status = 'ONLINE';
  isConnected = true;
  constructor(private swUpdate: SwUpdate, private swPush: SwPush, private snackbar: MatSnackBar, private connectionService: ConnectionService
              ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    })
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
