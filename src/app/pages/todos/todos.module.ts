import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TodosModule { }
