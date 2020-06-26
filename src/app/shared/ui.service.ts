import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


export class UIservice {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar){}

  showSnackbar(message, action, duration){
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
