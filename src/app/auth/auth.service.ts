import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService{
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService){}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }else{
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = true;
      }
    })
  }

  registerUser(authData: AuthData){
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
    //this.authSuccesfully();
  }

  login(authData: AuthData) {
   this.afAuth.auth
     .signInWithEmailAndPassword(
       authData.email,
       authData.password
      )
     .then((result) => {
       console.log(result);

     })
     .catch((error) => {
       console.log(error);
     });


  }

  logout(){
    this.afAuth.auth.signOut();

  }


  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccesfully(){

  }
}
