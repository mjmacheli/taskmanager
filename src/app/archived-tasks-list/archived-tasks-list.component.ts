import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../task.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { TaskList } from '../classes/task-list';
import { Observable } from 'rxjs';
import { Task } from '../classes/task';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-archived-tasks-list',
  templateUrl: './archived-tasks-list.component.html',
  styleUrls: ['./archived-tasks-list.component.scss']
})
export class ArchivedTasksListComponent extends TaskList implements OnInit {
  taskList$ = null;
  columnHeaders: string[] = ['mark', 'descr', 'details', 'tags', 'statusChangeDate', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(public service: TaskService, protected dialog: MatDialog, protected changeDetectorRefs: ChangeDetectorRef) { 
    super(service, dialog, changeDetectorRefs);
  }

  ngOnInit() {
    this.taskList$ = new Observable<MatTableDataSource<Task>>();
    this.service.getArchivedTasksListModel().subscribe(modelMap => {
      this.heading = JSON.parse(JSON.stringify(modelMap)).heading;
      this.service.setModel(modelMap);
      this.taskList$ = this.service.taskListObservable;
    });

    this.service.taskListObservable.pipe(take(1)).subscribe((data: MatTableDataSource<Task>) => { 
      data.paginator = this.paginator;
      for(let k = 0; k < data.data.length; k++) {
        this.setTaskTags(data.data[k]);
      }
    });
  }

  markTaskAsNotDone(taskId: Number) {
    this.service.markTaskAsNotDone(taskId)
    this.changeDetectorRefs.detectChanges();
  }

  deleteTask(taskId: Number) {
    let taskDescription: String = "";
    this.service.taskListObservable.subscribe((data: MatTableDataSource<Task>) => { 
      taskDescription = data.data.filter(task => task.id == taskId)[0].description;
    });
    
    if(confirm("Confirm deletion of task:\n" + taskDescription)) {
      this.service.deleteTask(taskId);
      this.changeDetectorRefs.detectChanges();
    }
  }
}