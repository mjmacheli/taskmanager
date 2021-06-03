import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsTaskListComponent } from './search-results-task-list.component';

describe('SearchResultsTaskListComponent', () => {
  let component: SearchResultsTaskListComponent;
  let fixture: ComponentFixture<SearchResultsTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
