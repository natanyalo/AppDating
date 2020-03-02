import {
  MatInputModule, MatCardModule, MatToolbarModule,
  MatButtonModule, MatExpansionModule, MatProgressSpinnerModule,
  MatPaginatorModule, MatDialogModule, MatSliderModule, MatSnackBarModule,
  MatIconModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatInputModule, MatCardModule, MatToolbarModule,
    MatButtonModule, MatExpansionModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatIconModule,ScrollingModule,
    MatPaginatorModule, MatSliderModule, MatDialogModule
  ],

  exports: [MatInputModule, MatCardModule, MatToolbarModule,
    MatButtonModule, MatExpansionModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatIconModule,ScrollingModule,
    MatPaginatorModule, MatSliderModule, MatDialogModule]
})
export class AngularMatrialModule {

}