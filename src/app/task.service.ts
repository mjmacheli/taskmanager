import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActiveTask } from './classes/active-task';
import * as _ from 'lodash';
import { SearchParameter } from './classes/search-parameter';
import { MatTableDataSource } from '@angular/material';
import { Task } from './classes/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly url = 'http://localhost:8118/tasks';
  private modelMap: any = "";
  private taskList = new MatTableDataSource<Task>();
  private modelMapSource = new BehaviorSubject<any>(this.modelMap);
  private taskListSource = new BehaviorSubject<MatTableDataSource<Task>>(this.taskList);
  modelMapObservable = this.modelMapSource.asObservable();
  taskListObservable = this.taskListSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', Validators.required),
    details: new FormControl(''),
    reminderDate: new FormControl(new Date(), Validators.required),
    dueDate: new FormControl('')
  });
  
  initFormGroup() {
    this.form.setValue({
      id: '',
      description: '',
      details: '',
      reminderDate: new Date(),
      dueDate: ''
    });
  }

  populateDetailsForm(task: Task) {
    let tags = this.getTaskTags(task.id);
    this.form.setValue({
      id: task.id,
      description: task.description,
      details: (task.details === undefined) ? null : task.details,
      reminderDate: task.reminderDate,
      dueDate: (task.dueDate === undefined) ? null : task.dueDate
    });
  }

  setModel(modelMap) {
    let model = JSON.parse(JSON.stringify(modelMap));
    this.taskList.data = model.tasks;
    this.taskListSource.next(this.taskList);
    this.modelMapSource.next(modelMap);
  }

  getCurrentTasksListModel() {
    return this.httpClient.get(`${this.url}`);
  }

  getFutureTasksListModel() {
    return this.httpClient.get(`${this.url}/future`);
  }

  getArchivedTasksListModel() {
    return this.httpClient.get(`${this.url}/archived`);
  }

  addTask(task: ActiveTask, tags: string[]) {
    return this.httpClient.post(`${this.url}/add`, { task, tags }).subscribe(modelMap => this.setModel(modelMap));
  }

  editTask(task: ActiveTask) {
    return this.httpClient.put<ActiveTask>(`${this.url}/edit`, task).subscribe(modelMap => this.setModel(modelMap));
  }

  deleteTask(taskId: Number) {
    return this.httpClient.delete(`${this.url}/${taskId}/delete`).subscribe(modelMap => this.setModel(modelMap));
  }

  search(searchString: string, searchParameters: SearchParameter) {
    return this.httpClient.post(`${this.url}/search`, searchParameters);
  }

  getTaskNotes(taskId: Number) {
    return this.httpClient.get(`${this.url}/${taskId}/note/all`);
  }

  getTaskTags(taskId: Number) {
    return this.httpClient.get(`${this.url}/${taskId}/tag/get/all`);
  }

  rescheduleTaskByDays(taskId: Number, daysToReschedule: number) {
    return this.httpClient.get(`${this.url}/${taskId}/reschedule/days/${daysToReschedule}`).subscribe(modelMap => this.setModel(modelMap));
  }

  rescheduleTaskByWeeks(taskId: Number, weeksToReschedule: number) {
    return this.httpClient.get(`${this.url}/${taskId}/reschedule/weeks/${weeksToReschedule}`).subscribe(modelMap => this.setModel(modelMap));
  }

  rescheduleTaskForToday(taskId: Number) {
    return this.httpClient.get(`${this.url}/${taskId}/reschedule/today`).subscribe(modelMap => this.setModel(modelMap));
  }

  markTaskAsDone(taskId: Number) {
    return this.httpClient.get(`${this.url}/${taskId}/mark/done`).subscribe(modelMap => this.setModel(modelMap));
  }

  markTaskAsNotDone(taskId: Number) {
    return this.httpClient.get(`${this.url}/${taskId}/mark/not_done`).subscribe(modelMap => this.setModel(modelMap));
  }

  addNote(taskId: Number, noteContent: string) {
    return this.httpClient.post(`${this.url}/${taskId}/add/note`, noteContent);
  }

  deleteNote(taskId: Number, noteId: Number) {
    return this.httpClient.delete(`${this.url}/${taskId}/note/${noteId}/delete`);
  }

  addTag(taskId: Number, tagName: String) {
    return this.httpClient.put(`${this.url}/${taskId}/tag/add`, tagName).subscribe(modelMap => this.setModel(modelMap));
  }

  removeTag(taskId: Number, tagName: string) {
    return this.httpClient.delete(`${this.url}/${taskId}/tag/remove/${tagName}`).subscribe(modelMap => this.setModel(modelMap));
  }
}