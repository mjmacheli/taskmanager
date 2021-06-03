import {NgModule} from '@angular/core';
import { 
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatProgressSpinnerModule
  } from '@angular/material';

 const MaterialComponents = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatGridListModule,
  MatListModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatProgressSpinnerModule
 ];

@NgModule({
  imports: [ 
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule {}