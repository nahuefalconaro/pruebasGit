import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Task } from './interface/task.interface';

@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      id: 1,
      title: 'tarea 1',
      description: 'description 1',
      fechaCreacion: new Date(),
      done: false,
    },
    {
      id: 2,
      title: 'tarea 2',
      description: 'description 2',
      fechaCreacion: new Date(),
      done: false,
    },
    {
      id: 3,
      title: 'tarea 3',
      description: 'description 3',
      fechaCreacion: new Date(),
      done: false,
    },
    {
      id: 4,
      title: 'tarea 4',
      description: 'description 4',
      fechaCreacion: new Date(),
      done: false,
    },
  ];

  getTasks(): Observable<Task[]> {
    return of([...this.tasks]);
  }
  deleteTask(id: number): Observable<Task[]> {
    const idDelete = this.tasks.findIndex((el: Task) => el.id == id);
    this.tasks.splice(idDelete, 1);
    return of(this.tasks);
  }
  // addTask() {}
  editTask(task: Task): Observable<Task> {
    console.log(task, 'edit');
    return of(task);
  }
}
