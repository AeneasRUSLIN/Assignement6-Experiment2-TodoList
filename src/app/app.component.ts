import { Component } from '@angular/core';
import {Task} from "./model/task";
import {CrudService} from "./service/crud.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoList';
  show = true;

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValueDesc : string = '';
  addTaskValueSum : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.addTaskValueDesc = '';
    this.addTaskValueSum = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValueDesc; //changed
    this.taskObj.task_sum = this.addTaskValueSum;
    this.crudService.addTask(this.taskObj).subscribe( res=> {
      this.ngOnInit();
    })
  }

  deleteTask(task : Task) {
    this.crudService.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    })
  }

}
