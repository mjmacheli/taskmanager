import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { ActiveTask } from '../classes/active-task';
import { TaskNote } from '../classes/task-note';
import { Tag } from '../classes/tag';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ArchivedTask } from '../classes/archived-task';
import { head } from 'lodash';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('inputAutocomplete', {static: false}) tagMatAutocomplete: MatAutocomplete;
  heading: string = "";
  task: ActiveTask = new ActiveTask();
  tagControl = new FormControl();

  notesVisible = true;
  noteAppButtonActive: boolean = true;
  tagAppButtonActive: boolean = true;
  
  noteInputVisible: boolean = false;
  tagAdditionPaneVisisble = false;
  noteEditable: boolean = false;
  tagsSelectable = true;
  tagsRemovable = true;
  allTags: Tag[];
  selectedTags: string[] = new Array();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<Tag[]>;
  
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

  constructor(public service: TaskService, private dialogRef: MatDialogRef<TaskDetailsComponent>) {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag) ? this.filterTagOptions(tag) : this.allTags.slice())
    );
  }

  ngOnInit() {
    this.service.modelMapObservable.subscribe(modelMap => {
      let model = JSON.parse(JSON.stringify(modelMap));
      this.heading = model.heading;
      this.allTags = model.tags;
      this.setTaskValues();
      this.setTaskNotes();
      this.setTaskTags();
    });
  }

  toggleTagPane(hideDisplay: boolean) {
    if(hideDisplay == true) {    
      this.tagAdditionPaneVisisble = false;
      this.tagAppButtonActive = true; 
      this.notesVisible = true;
    } else {
      this.tagAdditionPaneVisisble = true;
      this.tagAppButtonActive = false; 
      this.notesVisible = false;
    }
  }

  toggleNotePane(hideDisplay: boolean) {
    if(hideDisplay == true) {
      this.noteInputVisible = false;
      this.noteAppButtonActive = true;
      this.notesVisible = true;
    } else {
      this.noteInputVisible = true;
      this.noteAppButtonActive = false;
      this.notesVisible = false;
    }
  }

  editTask() {
    this.setTaskValues();
    console.log(this.task.toString());
    this.service.editTask(this.task);
    this.onClose();
  }

  cancelEdit() {
    this.service.populateDetailsForm(this.task);
  }

  onClose() {
    this.service.form.reset();
    this.service.initFormGroup();
    this.dialogRef.close();
  }

  addNote(noteContent: string) {
    this.service.addNote(this.task.id, noteContent).subscribe((data: ActiveTask) => this.task = data);
    this.noteInputVisible = false;
    this.noteAppButtonActive = true;
  }

  deleteNote(taskId: Number, noteId: Number) {
    this.service.deleteNote(taskId, noteId).subscribe((data: ActiveTask) => this.task = data);
  }

  tagSelected(event: MatAutocompleteSelectedEvent): void {
    let tagName = event.option.viewValue;
    this.selectedTags.push(tagName);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
    this.service.addTag(this.task.id, tagName);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if((value || '').trim()) {
      this.selectedTags.push(value);
      this.service.addTag(this.task.id, value);
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
      this.service.removeTag(this.task.id, tag);
    }
  }

  private setTaskValues() {
    this.task.id = this.service.form.value['id'];
    this.task.description = this.service.form.value['description'];
    this.task.details = this.service.form.value['details'];
    this.task.reminderDate = this.service.form.value['reminderDate'];
    this.task.dueDate = this.service.form.value['dueDate'];
  }

  private setTaskNotes() {
    if((this.task.notes != null) && (this.task.notes.length == 0)) {
      this.service.getTaskNotes(this.task.id).subscribe((data: TaskNote[]) => { 
        let notes = JSON.parse(JSON.stringify(data));

        for(let k = 0; k < notes.length; k++) {
          let taskNote = new TaskNote();
          taskNote.id = JSON.parse(notes[k]).id;
          taskNote.note = JSON.parse(notes[k]).note;
          taskNote.createdDateTime = JSON.parse(notes[k]).createdDateTime
          this.task.notes.push(taskNote);
        }
      });
    }
  }

  private setTaskTags() {
    if(this.selectedTags.length == 0) {
      this.service.getTaskTags(this.task.id).subscribe((data: Tag[]) => { 
        let tags = JSON.parse(JSON.stringify(data));
        
        for(let k = 0; k < tags.length; k++) {
            this.selectedTags.push(tags[k]);
        }
      });
    }
  }

  private filterTagOptions(value: string): Tag[] {
    return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(value) === 0);
  }
}