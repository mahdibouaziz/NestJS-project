import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

//@UseInterceptors(DurationnInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@Query() allQueries) {
    console.log(allQueries);
    return this.todoService.getTodos();
  }
  //same thing but with the request and response object from express
  @Get('v2')
  getTodosV2(@Req() request: Request, @Res() response: Response) {
    response.json(this.todoService.getTodos());
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  addTodo(@Body() newTodo: Todo) {
    const fullTodo = this.todoService.addTodo(newTodo);
    return {
      message: 'the todo is added',
      todo: fullTodo,
    };
  }

  @Delete('/delete/:id')
  deleteTodoById(@Param('id', ParseIntPipe) id: number) {
    this.todoService.deleteTodoById(id);
    return {
      message: `todo with id=${id} deleted`,
      todos: this.todoService.getTodos(),
    };
  }

  @Put('/update/:id')
  updateTodos(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: Partial<TodoDto>,
  ) {
    this.todoService.updateTodo(id, todo);
    return {
      message: `todo with id=${id} updated`,
      todos: this.todoService.getTodoById(id),
    };
  }
}
