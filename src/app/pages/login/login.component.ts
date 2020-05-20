import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private firebaseAuth: AngularFireAuth,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.isLoading = !this.isLoading;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
      (response) => {
        this.isLoading = !this.isLoading;
        this.loginService.setCurrentUser({email: response.user.email, id: response.user.uid});
        this.router.navigate(['todos']);
      }
    ).catch(error => {
      this.isLoading = !this.isLoading;
      console.log("KO", error);
    });
  }

}
