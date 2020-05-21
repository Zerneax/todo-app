import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private currentUser: User = undefined;

  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router) {}

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.firebaseAuth.signOut()
      .then((response) => {
        this.currentUser = undefined;
        this.router.navigate(['']);
      })
      .catch((error) => console.log(error));
  }
}
