import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  private todos: Todo[];

  constructor() {
    this.todos = [
      new Todo(0, 'todo0', 'en attente'),
      new Todo(1, 'todo1', 'en cours'),
      new Todo(2, 'todo2', 'finalisé'),
    ];
  }

  @Get()
  getTodos(@Query() allQueries) {
    console.log(allQueries);
    return this.todos;
  }
  //same thing but with the request and response object from express
  @Get('v2')
  getTodosV2(@Req() request: Request, @Res() response: Response) {
    response.json(this.todos);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string) {
    const todo = this.todos.find((todo) => todo.id === +id);
    if (todo) {
      return todo;
    }
    throw new NotFoundException(`todo with id=${id} does not exist`);
  }

  @Post()
  addTodo(@Body() newTodo: Todo) {
    console.log('Post one todo');
    console.log(newTodo);
    this.todos.push(newTodo);
    return 'the todo is added';
  }

  @Delete('/delete/:id')
  deleteTodoById(@Param('id') id: string) {
    console.log(id);
    const index = this.todos.findIndex((todo) => todo.id === +id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return `todo with id=${id} Deleted ${index}`;
    }
    throw new NotFoundException(`todo with id=${id} not found`);
  }

  @Put('/update/:id')
  updateTodos(@Param('id') id: string, @Body() todo: Partial<Todo>) {
    const index = this.todos.findIndex((todo) => todo.id === +id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...todo };
      return this.todos[index];
    }
    throw new NotFoundException(`todo with id=${id} does not exists`);
  }
}
