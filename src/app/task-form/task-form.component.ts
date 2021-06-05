import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { TaskService } from '../task.service';
import { ActiveTask } from '../classes/active-task';
import { Tag } from '../classes/tag';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { DatabaseService } from '../data-access/database.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl();
  allTags: Tag[];
  selectedTags: string[] = new Array();
  filteredTags: Observable<Tag[]>;
  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('inputAutocomplete', {static: false}) tagMatAutocomplete: MatAutocomplete;
  
  dateSelections = [
    { id: 1, value: '1 Day' },
    { id: 2, value: '2 Days' },
    { id: 3, value: '3 Days' },
    { id: 4, value: '4 Days' },
    { id: 8, value: '8 Days' },
    { id: 9, value: '9 Days' },
    { id: 10, value: '10 Days' },
    { id: 7, value: '1 Week' },
    { id: 14, value: '2 Weeks' },
    { id: 28, value: '4 Weeks' },
    { id: 42, value: '6 Weeks' },
    { id: 56, value: '8 Weeks' },
    { id: 84, value: '12 Weeks' }
  ];

  constructor(public service: TaskService, private dialogRef: MatDialogRef<TaskFormComponent>, 
    
    public databaseService: DatabaseService) {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag) ? this.filterTagOptions(tag) : this.allTags.slice())
    );
  }

  ngOnInit() {
    this.service.modelMapObservable.subscribe(modelMap => {
      let model = JSON.parse(JSON.stringify(modelMap));
      this.allTags = model.tags;
    });
  }

  tagSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if((value || '').trim()) {
      this.selectedTags.push(value);
    }

    // Reset input value
    if(input) {
      input.value  = '';
    }
  }

  removeTag(tag: string): void {
    const tagIndex = this.selectedTags.indexOf(tag);

    if(tagIndex >= 0) {
      this.selectedTags.splice(tagIndex, 1);
    }
  }

  onSubmit() {
    if(this.service.form.valid) {
      var task = new ActiveTask();
      task.description = this.service.form.value.description;
      task.details = this.service.form.value.details;
      task.reminderDate = new Date(this.service.form.value.reminderDate);
      task.dueDate = new Date(this.service.form.value.dueDate);
      this.service.addTask(task, this.selectedTags);
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initFormGroup();
    this.dialogRef.close();
  }

  private filterTagOptions(value: string): Tag[] {
    return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(value) === 0);
  }
}