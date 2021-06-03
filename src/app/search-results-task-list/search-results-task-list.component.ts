import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { TaskService } from '../task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { ActivatedRoute } from '@angular/router';
import { ArchivedTask } from '../classes/archived-task';
import { TaskList } from '../classes/task-list';
import { SearchParameter } from '../classes/search-parameter';
import { Task } from '../classes/task';
import * as moment from 'moment';

@Component({
  selector: 'app-search-results-task-list',
  templateUrl: './search-results-task-list.component.html',
  styleUrls: ['./search-results-task-list.component.scss']
})
export class SearchResultsTaskListComponent extends TaskList implements OnInit {
  searchString: string;
  columnHeaders: string[] = ['mark', 'descr', 'details', 'tags', 'reminderDate', 'dueDate', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, public service: TaskService, protected dialog: MatDialog, protected changeDetectorRefs: ChangeDetectorRef) { 
    super(service, dialog, changeDetectorRefs);
  }

  ngOnInit() {
    this.searchString = this.route.snapshot.queryParams.searchString;
    const searchCurrentTasks = (this.route.snapshot.queryParams.searchCurrentTasks == 'true');
    const searchFutureTasks = (this.route.snapshot.queryParams.searchFutureTasks == 'true');
    const searchCompletedTasks = (this.route.snapshot.queryParams.searchCompletedTasks == 'true');
    const checkNote = (this.route.snapshot.queryParams.checkNote == 'true');
    const checkTags = (this.route.snapshot.queryParams.checkTags == 'true');
    const searchByReminderDateLimit = (this.route.snapshot.queryParams.searchByReminderDateLimit == 'true');

    let searchParameter: SearchParameter;
    
    if(searchByReminderDateLimit == false) {
      searchParameter = new SearchParameter(this.searchString, searchCurrentTasks, searchFutureTasks, searchCompletedTasks, checkNote, checkTags, searchByReminderDateLimit) 
    } else {
      searchParameter = new SearchParameter(this.searchString, false, false, false, false, false, searchByReminderDateLimit);
    }

    this.service.search(this.searchString, searchParameter).subscribe(modelMap => {
      this.heading = JSON.parse(JSON.stringify(modelMap)).heading;
      this.service.setModel(modelMap);
      this.taskList$ = this.service.taskListObservable; 
    });
    
    this.service.taskListObservable.subscribe((data: MatTableDataSource<Task>) => { data.paginator = this.paginator });
  }

  markTaskAsDone(taskId: number) {
    this.service.markTaskAsDone(taskId);
  }

  markTaskAsNotDone(taskId: number) {
    this.service.markTaskAsNotDone(taskId);
  }
}