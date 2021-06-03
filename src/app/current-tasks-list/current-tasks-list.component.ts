import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskList } from '../classes/task-list';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Task } from '../classes/task';

@Component({
  selector: 'app-current-tasks-list',
  templateUrl: './current-tasks-list.component.html',
  styleUrls: ['./current-tasks-list.component.scss']
})
export class CurrentTasksListComponent extends TaskList implements OnInit {
  taskList$ = null;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  columnHeaders: string[] = ['mark', 'descr', 'details', 'tags', 'reminderDate', 'dueDate', 'actions'];

  constructor(public service: TaskService, protected dialog: MatDialog, protected changeDetectorRefs: ChangeDetectorRef) { 
    super(service, dialog, changeDetectorRefs);
  }

  ngOnInit() {
    this.taskList$ = new Observable<MatTableDataSource<Task>>();
    this.service.getCurrentTasksListModel().subscribe(modelMap => {
      this.heading = JSON.parse(JSON.stringify(modelMap)).heading;
      this.service.setModel(modelMap);
      this.taskList$ = this.service.taskListObservable;
    });
    
    this.service.taskListObservable.subscribe((data: MatTableDataSource<Task>) => { 
      data.paginator = this.paginator;
      for(let k = 0; k < data.data.length; k++) {
        this.setTaskTags(data.data[k]);
      }
     });
  }

  markTaskAsDone(taskId: number) {
    this.service.markTaskAsDone(taskId);
  }
}