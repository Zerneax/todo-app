import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private firebaseAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  createAccount() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(
      (response) => {
        console.log(response);
      }
    ).catch(
      (error) => {
        alert(error.code);
        console.log(error);
      }
    )
  }

}
