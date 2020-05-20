import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.user.subscribe((user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("todo");
      }
    })
  }


}
