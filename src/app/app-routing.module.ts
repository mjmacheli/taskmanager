import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentTasksListComponent } from './current-tasks-list/current-tasks-list.component';
import { ArchivedTasksListComponent } from './archived-tasks-list/archived-tasks-list.component';
import { FutureTasksListComponent } from './future-tasks-list/future-tasks-list.component';
import { SearchResultsTaskListComponent } from './search-results-task-list/search-results-task-list.component';

const routes: Routes = [
  {
    path: '', 
    component: CurrentTasksListComponent
  },
  {
    path: 'future', 
    component: FutureTasksListComponent
  },
  {
    path: 'completed', 
    component: ArchivedTasksListComponent
  },
  {
    path: 'search', 
    component: SearchResultsTaskListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
