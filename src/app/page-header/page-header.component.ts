import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskFormComponent } from '../task-form/task-form.component';
import { SearchParameter } from '../classes/search-parameter';
import { interval, Subscription} from 'rxjs';
import { ActiveTask } from '../data-access/entities/task/ActiveTask';
import { DatabaseService } from '../data-access/database.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  heading: string;
  listInfo: string;
  searchString: string;
  searchParameters: SearchParameter;
  backEndStarted = false;
  dataLoadSubscription: Subscription; 



  activeTasks: ActiveTask[] = [];

  constructor(private service: TaskService, private dialog: MatDialog, private databaseService: DatabaseService) {
    this.getActiveTasks();
   }


  getActiveTasks(){
    this.databaseService
        .connection
    .then(() => ActiveTask.find())
    .then(activeTasks => {
      this.backEndStarted = true;
      this.activeTasks = activeTasks;
      // console.log('back ', activeTasks)
      this.setSearchParameters();
    })
  }

  ngOnInit() {
    
      // this.dataLoadSubscription = interval(5000).subscribe((x =>{
      //   try{
      //     this.service.getCurrentTasksListModel().subscribe(
      //       (next)=>{
      //         this.backEndStarted = true;
      //         this.dataLoadSubscriptionUnsubscribe();
      //       },
      //     );
      //   }catch(error){}
      // }));
     
    // this.service.modelMapObservable.subscribe(modelMap => {
    //   let model = JSON.parse(JSON.stringify(modelMap));
    //   this.heading = model.heading;
    //   this.listInfo = model.listInfo;
    //   this.setSearchParameters();
    // });
  }

  openAddTaskPopup() {
    const dialogConfig = new MatDialogConfig();
    this.databaseService.initFormGroup();
    this.databaseService.form.enable();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(TaskFormComponent, dialogConfig);
  }

  clearSearchBox() {
    this.searchString = "";
  }

  reminderDateLimitSearch() {
    if(this.searchParameters.searchByReminderDateLimit == true) {
      this.searchString = "";
    }
  }

  private setSearchParameters() {
    if((this.heading != "Completed Tasks") && (this.heading != "Search Results")) {
      this.searchParameters = new SearchParameter(this.searchString, true, true, false, false, false, false);
    } else {
      this.searchParameters = new SearchParameter(this.searchString, true, true, true, false, false, false);
    }
  }

  private dataLoadSubscriptionUnsubscribe(){
    this.dataLoadSubscription.unsubscribe();
  }
}