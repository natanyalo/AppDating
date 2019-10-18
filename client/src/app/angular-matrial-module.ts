import { MatInputModule, MatCardModule,MatToolbarModule,
    MatButtonModule, MatExpansionModule, MatProgressSpinnerModule ,
    MatPaginatorModule,MatDialogModule,MatSliderModule
   } from '@angular/material';
   
import { NgModule } from '@angular/core';

@NgModule({
  imports:[ MatInputModule, MatCardModule,MatToolbarModule,
    MatButtonModule, MatExpansionModule, MatProgressSpinnerModule ,
    MatPaginatorModule,MatSliderModule,MatDialogModule],

  exports:[ MatInputModule, MatCardModule,MatToolbarModule,
    MatButtonModule, MatExpansionModule, MatProgressSpinnerModule ,
    MatPaginatorModule,MatSliderModule,MatDialogModule]
})
export class AngularMatrialModule{

}