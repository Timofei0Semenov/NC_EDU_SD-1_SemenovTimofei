import {NgModule} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule, MatSlideToggleModule,
  MatTableModule,
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
    MatAutocompleteModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    MatMenuModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
})

export class CustomMaterialModule {
}
