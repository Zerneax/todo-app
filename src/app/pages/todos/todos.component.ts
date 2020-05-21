import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Todo } from 'src/app/models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from 'src/app/models/document';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todosCollection: AngularFirestoreCollection<Todo>;
  documents: Observable<Document[]>;
  newTodo: string = '';
  currentUser: User;

  constructor(private firestore: AngularFirestore,
    private loginService: LoginService) {}

  ngOnInit(): void {
    this.currentUser = this.loginService.getCurrentUser();
    this.todosCollection = this.firestore.collection<Todo>(`${this.currentUser.id}`);

    // .snapshotChanges() returns a DocumentChangeAction[]
    this.documents = this.todosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: Todo = a.payload.doc.data() as Todo;
        const id: string = a.payload.doc.id;
        return {id: id, todo: data};
      }))
    );
  }

  convertTimestampToDate(timestamp: any): Date{
    return new Date(Number(timestamp.seconds) * 1000);
  }

  addNewTodo(): void {
    this.firestore.collection(`${this.currentUser.id}`).add({
      title: this.newTodo,
      date: new Date(),
      completed: false
    });
    this.newTodo = "";
  }

  changeTodoToComplete(doc: Document): void {
    doc.todo.completed = !doc.todo.completed;
    this.firestore.doc<Todo>(`${this.currentUser.id}/${doc.id}`).update(doc.todo);
  }

  deleteTodo(doc: Document): void {
    this.firestore.doc<Todo>(`${this.currentUser.id}/${doc.id}`).delete();
  }

  logout() {
    this.loginService.logout();
  }
}
