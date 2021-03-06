import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './pages/todos/todos.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';
import { TodosGuard } from './services/guard/todos.guard';


const routes: Routes = [
  {
    path: 'todos', component: TodosComponent, canActivate: [TodosGuard]
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: '', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
