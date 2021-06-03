import { TaskService } from '../task.service';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { Task } from './task';
import * as moment from 'moment';
import { Tag } from './tag';
import { ArchivedTask } from './archived-task';

export class TaskList {
    readonly today: Date = new Date();
    heading: string;
    listInfo: string;
    taskList$ = null;
    taskList: MatTableDataSource<Task>;
    
    constructor(
        protected service: TaskService,
        protected dialog: MatDialog, 
        protected changeDetectorRefs: ChangeDetectorRef
    ) { }

    openTaskDetailsPopup(task) {
        this.service.populateDetailsForm(task);
        const dialogConfig = new MatDialogConfig();
    
        if(this.isActiveTask(task) == true) {
          this.service.form.enable();
          dialogConfig.height = "100%"
        } else {
          this.service.form.disable();
        }
        
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        this.dialog.open(TaskDetailsComponent, dialogConfig);
    }
    
    isActiveTask(task) {
        let temp: ArchivedTask = task;

        if(temp.statusChangeDate == null) {
            return true;
        } else {
            return false;
        }
    }

    setTaskTags(task: Task) {
        this.service.getTaskTags(task.id).subscribe((data: Tag[]) => { 
          task.tags = new Array<Tag>();
          task.tags = data;
        });
      }

    rescheduleTaskByDays(taskId: number, numDaysToPostpone: number) {
        this.service.rescheduleTaskByDays(taskId, numDaysToPostpone);
    }

    rescheduleTaskByWeeks(taskId: number, numWeeksToPostpone: number) {
        this.service.rescheduleTaskByWeeks(taskId, numWeeksToPostpone);
    }

    rescheduleTaskForToday(taskId: number) {
        this.service.rescheduleTaskForToday(taskId);
    }

    isTodaysTask(task: Task) {
        let todayMoment = this.dateMoment(this.today);
        let reminderDateMoment = this.dateMoment(task.reminderDate);
        return reminderDateMoment == todayMoment;
    }

    isWeekFromDue(task: Task) {
        let dueDate = this.dateMoment(task.dueDate);

        if(dueDate == null) {
            return false;
        } else {
            let weekFromDueDate = moment(dueDate).subtract(7, 'days').toDate();
            return (this.today == weekFromDueDate || this.today > weekFromDueDate) && 
                (moment(this.today, 'YYYY-MM-DD') == moment(dueDate, 'YYYY-MM-DD') || moment(this.today, 'YYYY-MM-DD') < moment(dueDate, 'YYYY-MM-DD'));
        }
    }

    isOverdue(task: Task) {
        let todayMoment = this.dateMoment(this.today);
        let dueDateMoment = this.dateMoment(task.dueDate);
        return (task.dueDate != null) && (dueDateMoment < todayMoment);
    }

    taskListIsEmpty() {
        let isEmpty = false;
        this.taskList$.subscribe((data: MatTableDataSource<Task>) => isEmpty = (data.data.length == 0) ? true : false );
        return isEmpty;
    }

    detectChanges() {
        this.changeDetectorRefs.detectChanges();
    }

    
    private dateMoment(date: Date) {
        return moment(date).format('YYYY-MM-DD');
    }
}