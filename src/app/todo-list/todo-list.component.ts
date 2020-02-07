import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { ITodo } from '../todo.model';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS } from '../actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @select() todos: ITodo[];

  // model: ITodo;
  createForm: FormGroup;
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.createForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl('', Validators.required),
      responsible: new FormControl('', Validators.required),
      priority: new FormControl('low', Validators.required),
      isCompleted: new FormControl(false, Validators.required)
    });
  }

  _createTodo() {
    if (this.createForm.valid) {
      const model: ITodo = {
        id: null,
        description: this.createForm.value.description,
        responsible: this.createForm.value.responsible,
        priority: this.createForm.value.priority,
        isCompleted: this.createForm.value.isCompleted
      };
      this.ngRedux.dispatch({ type: ADD_TODO, todo: model });
      this.createForm.reset({
        priority: 'low',
        isCompleted: false
      });
    }
  }

  toggleTodo(todo: ITodo) {
    this.ngRedux.dispatch({ type: TOGGLE_TODO, id: todo.id });
  }

  removeTodo(todo: ITodo) {
    this.ngRedux.dispatch({type: REMOVE_TODO, id: todo.id });
  }

}
