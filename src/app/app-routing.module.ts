import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './pages/todos/todos.component';
import { SigninComponent } from './pages/signin/signin.component';


const routes: Routes = [
  {
    path: '', component: TodosComponent
  },
  {
    path: 'signin', component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
