import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureTasksListComponent } from './future-tasks-list.component';

describe('FutureTasksListComponent', () => {
  let component: FutureTasksListComponent;
  let fixture: ComponentFixture<FutureTasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureTasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
