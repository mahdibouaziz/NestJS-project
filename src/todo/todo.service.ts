import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[];

  constructor() {
    this.todos = [
      new Todo(0, 'todo0', 'en attente'),
      new Todo(1, 'todo1', 'en cours'),
      new Todo(2, 'todo2', 'finalisé'),
    ];
  }

  getTodos() {
    return this.todos;
  }

  getTodoById(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      return todo;
    }
    throw new NotFoundException(`todo with id=${id} does not exist`);
  }

  addTodo(newTodo: TodoDto) {
    const id = this.todos.length;
    this.todos.push({ id, ...newTodo });
    return { id, ...newTodo };
  }

  deleteTodoById(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return `todo with id=${id} Deleted ${index}`;
    }
    throw new NotFoundException(`the id=${id} does not exist`);
  }

  updateTodo(id: number, todo: Partial<TodoDto>) {
    const index = this.todos.findIndex((todo) => todo.id === +id);

    if (index !== -1) {
      this.todos[index] = {
        ...this.todos[index],
        ...todo,
      };
      return this.todos[index];
    }
    throw new NotFoundException(`todo with id=${id} does not exists`);
  }
}
