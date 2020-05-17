import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Todo } from 'src/app/models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from 'src/app/models/document';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todosCollection: AngularFirestoreCollection<Todo>;
  documents: Observable<Document[]>;
  newTodo: string = '';

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.todosCollection = this.firestore.collection<Todo>('todo-list/test/todo');

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
    this.firestore.collection('todo-list/test/todo').add({
      title: this.newTodo,
      date: new Date(),
      completed: false
    });
    this.newTodo = "";
  }

  changeTodoToComplete(doc: Document): void {
    doc.todo.completed = !doc.todo.completed;
    this.firestore.doc<Todo>(`todo-list/test/todo/${doc.id}`).update(doc.todo);
  }

  deleteTodo(doc: Document): void {
    this.firestore.doc<Todo>(`todo-list/test/todo/${doc.id}`).delete();
  }

}
