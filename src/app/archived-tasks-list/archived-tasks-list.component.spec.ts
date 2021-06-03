import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTasksListComponent } from './archived-tasks-list.component';

describe('ArchivedTasksListComponent', () => {
  let component: ArchivedTasksListComponent;
  let fixture: ComponentFixture<ArchivedTasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedTasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
