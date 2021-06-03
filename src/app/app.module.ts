import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { TaskService } from './task.service';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CurrentTasksListComponent } from './current-tasks-list/current-tasks-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FutureTasksListComponent } from './future-tasks-list/future-tasks-list.component';
import { ArchivedTasksListComponent } from './archived-tasks-list/archived-tasks-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { PageHeaderComponent } from './page-header/page-header.component';


import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from './classes/moment-utc-date-adapter';
import { SearchResultsTaskListComponent } from './search-results-task-list/search-results-task-list.component';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [
        AppComponent,

        CurrentTasksListComponent,
        TaskFormComponent,
        FutureTasksListComponent,
        ArchivedTasksListComponent,
        TaskDetailsComponent,
        PageHeaderComponent,
        SearchResultsTaskListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatButtonModule,


        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MaterialModule
    ],
    providers: [TaskService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentUtcDateAdapter },],
    bootstrap: [AppComponent]
})
export class AppModule {
}
