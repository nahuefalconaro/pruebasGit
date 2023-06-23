import { CreateTaskDto } from './DTO/create-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './interface/task.interface';

@Controller('tasks')
export class TasksController {
  tasks: Task[] = [];
  constructor(private taskService: TasksService) {}

  @Get('/all')
  getTasks(): Task[] {
    this.taskService
      .getTasks()
      .subscribe((resp: Task[]) => (this.tasks = resp));
    return this.tasks;
  }

  @Post('/new/:id')
  createTask(
    @Body() task: CreateTaskDto,
    @Param('id') id: string,
    @Headers('x-token') header: string,
    @Query('numeroUsuario') numeroUsuario: string,
  ): string {
    console.log(task, 'task');
    console.log(id, 'id');
    console.log(header, 'header');
    console.log(numeroUsuario, 'nroUser');

    return 'creando task' + task + id;
  }

  @Put()
  updateTask(@Body() task: Task): string {
    this.taskService
      .editTask(task)
      .subscribe((resp) => console.log(resp + 'resps'));
    return 'creando task';
  }

  @Delete('/delete')
  deleteTask(@Query('idDeleteEliminar') id: number): string {
    this.taskService
      .deleteTask(id)
      .subscribe((resp) => console.log(resp + 'resps'));
    return 'se elimino la task';
  }
}
