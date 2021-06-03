import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TaskService } from '../task.service';
import { TaskList } from './task-list';

describe('TaskList', () => {
  let service: TaskService;
  let dialog: MatDialog;
  let changeDetectorRefs: ChangeDetectorRef;

  it('Should create an instance', () => {
    expect(new TaskList(service, dialog, changeDetectorRefs)).toBeTruthy();
  });
});
