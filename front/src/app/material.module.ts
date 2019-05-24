import {NgModule} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule, MatSlideToggleModule, MatSnackBarModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    MatMenuModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule
  ],
})

export class CustomMaterialModule {
}
